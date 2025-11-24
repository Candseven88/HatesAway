# HatesAway - Technical Specifications

## Architecture Overview

### System Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Browser   │ ◄─────► │  Cloudflare      │ ◄─────► │ Cloudflare  │
│             │         │  Pages           │         │ D1 Database │
│  Next.js    │         │  (Edge Runtime)  │         └─────────────┘
│  Frontend   │         │                  │
└─────────────┘         └──────────────────┘
                                 │
                                 ▼
                        ┌─────────────┐
                        │ Cloudflare  │
                        │ R2 Storage  │
                        └─────────────┘
```

## Technology Deep Dive

### 1. Drawing Canvas Implementation

#### Option A: react-sketch-canvas (Recommended)
```typescript
// Pros:
- Easy to use, React-friendly
- Built-in undo/redo
- Brush customization
- Export to image

// Cons:
- Limited advanced features
- Larger bundle size

// Usage:
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Canvas = () => {
  const canvasRef = useRef(null);
  
  return (
    <ReactSketchCanvas
      ref={canvasRef}
      strokeWidth={brushSize}
      strokeColor={color}
      canvasColor="white"
      exportWithBackgroundImage
    />
  );
};
```

#### Option B: fabric.js
```typescript
// Pros:
- Powerful features (shapes, text, images)
- Great performance
- Active community

// Cons:
- More complex setup
- Steeper learning curve

// Usage:
import { Canvas } from 'fabric';

const canvas = new Canvas('canvas', {
  width: 800,
  height: 600,
  isDrawingMode: true
});
```

**Decision**: Use react-sketch-canvas for MVP, migrate to fabric.js if needed.

### 2. Animation Implementation

#### Trash Throw Animation with Framer Motion

```typescript
// TrashAnimation.tsx
import { motion, useAnimation } from 'framer-motion';

const TrashAnimation = ({ imageData, onComplete }) => {
  const controls = useAnimation();
  
  const throwSequence = async () => {
    // 1. Drawing shrinks and moves
    await controls.start({
      scale: 0.3,
      x: 400,
      y: 600,
      rotate: 720,
      transition: { duration: 1.2, ease: "easeInOut" }
    });
    
    // 2. Trash bin shake
    await controls.start({
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    });
    
    // 3. Fade out drawing
    await controls.start({
      opacity: 0,
      transition: { duration: 0.3 }
    });
    
    onComplete();
  };
  
  return (
    <motion.div animate={controls}>
      <img src={imageData} alt="Drawing" />
    </motion.div>
  );
};
```

### 3. Cloudflare D1 Integration

#### Database Setup

```bash
# Create database
wrangler d1 create hatesaway-db

# Run migrations
wrangler d1 execute hatesaway-db --file=./migrations/001_init.sql
```

#### Migration File (migrations/001_init.sql)

```sql
-- Drawings table
CREATE TABLE drawings (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL,
  user_id TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_drawings_created_at ON drawings(created_at DESC);
CREATE INDEX idx_drawings_likes ON drawings(likes DESC);

-- Comments table
CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  drawing_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (drawing_id) REFERENCES drawings(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_drawing_id ON comments(drawing_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- Likes table (for uniqueness)
CREATE TABLE likes (
  drawing_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (drawing_id, user_id)
);

CREATE INDEX idx_likes_drawing_id ON likes(drawing_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
```

#### Database Client (lib/db.ts)

```typescript
import { drizzle } from 'drizzle-orm/d1';

export const getDB = (env: any) => {
  return drizzle(env.DB);
};

// Query examples
export async function createDrawing(db: any, data: DrawingInsert) {
  const result = await db.insert(drawings).values(data).returning();
  return result[0];
}

export async function getDrawings(db: any, page = 1, limit = 20, sortBy = 'latest') {
  const offset = (page - 1) * limit;
  const orderBy = sortBy === 'popular' ? desc(drawings.likes) : desc(drawings.createdAt);
  
  return await db
    .select()
    .from(drawings)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset);
}
```

### 4. Cloudflare R2 Storage

#### R2 Client Setup (lib/r2.ts)

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export function getR2Client(env: any) {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });
}

export async function uploadImage(
  client: S3Client,
  bucketName: string,
  key: string,
  imageBuffer: Buffer
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: imageBuffer,
    ContentType: 'image/png',
  });
  
  await client.send(command);
  
  return `https://pub-${bucketName}.r2.dev/${key}`;
}
```

#### Image Upload Flow

```typescript
// API Route: /api/drawings/route.ts
export async function POST(request: Request) {
  const { imageData, userId } = await request.json();
  
  // 1. Convert base64 to buffer
  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  
  // 2. Generate unique filename
  const id = crypto.randomUUID();
  const filename = `${id}.png`;
  
  // 3. Upload to R2
  const r2Client = getR2Client(process.env);
  const imageUrl = await uploadImage(r2Client, 'hatesaway-images', filename, buffer);
  
  // 4. Save metadata to D1
  const db = getDB(process.env);
  const drawing = await createDrawing(db, {
    id,
    imageUrl,
    userId,
    createdAt: Date.now(),
  });
  
  return Response.json({ success: true, drawing });
}
```

### 5. User Identification System

#### User ID Management (lib/user.ts)

```typescript
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'hatesaway_user_id';

export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_KEY, userId);
    
    // Also set cookie for backup
    document.cookie = `${USER_ID_KEY}=${userId}; max-age=31536000; path=/`;
  }
  
  return userId;
}

export function getUserDisplayName(userId: string): string {
  // Convert UUID to readable number
  const hash = userId.split('-')[0];
  const num = parseInt(hash.substring(0, 8), 16) % 99999;
  return `Anonymous #${num.toString().padStart(5, '0')}`;
}
```

### 6. Like System Implementation

#### Optimistic Updates

```typescript
// components/LikeButton.tsx
import { useState } from 'react';
import { Heart } from 'lucide-react';

export function LikeButton({ drawingId, initialLikes, initialLiked }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLike = async () => {
    // Optimistic update
    setIsLiked(!isLiked);
    setLikes(likes + (isLiked ? -1 : 1));
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/likes', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drawingId,
          userId: getUserId(),
        }),
      });
      
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      // Rollback on error
      setIsLiked(!isLiked);
      setLikes(likes - (isLiked ? -1 : 1));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button onClick={handleLike} disabled={isLoading}>
      <Heart fill={isLiked ? 'red' : 'none'} />
      <span>{likes}</span>
    </button>
  );
}
```

### 7. Comment System

#### Comment Component (components/CommentSection.tsx)

```typescript
export function CommentSection({ drawingId }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  
  const loadComments = async () => {
    const response = await fetch(`/api/comments?drawingId=${drawingId}`);
    const data = await response.json();
    setComments(data.comments);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        drawingId,
        userId: getUserId(),
        content: newComment,
      }),
    });
    
    const data = await response.json();
    setComments([data.comment, ...comments]);
    setNewComment('');
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          maxLength={500}
        />
        <button type="submit">Post</button>
      </form>
      
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
```

## Performance Optimizations

### 1. Canvas Performance
- Use `requestAnimationFrame` for smooth drawing
- Implement throttling for pointer events
- Clear canvas efficiently with `clearRect`

### 2. Image Optimization
- Compress images before upload (max 800x600)
- Use WebP format when supported
- Implement lazy loading in gallery

### 3. API Optimization
- Implement pagination for gallery
- Cache frequently accessed data
- Use Cloudflare cache headers

### 4. Bundle Optimization
- Code splitting for gallery page
- Dynamic imports for heavy components
- Tree shaking unused code

## Security Considerations

### 1. Input Validation
```typescript
// Validate image size
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

if (buffer.length > MAX_IMAGE_SIZE) {
  return Response.json({ error: 'Image too large' }, { status: 400 });
}

// Validate comment length
const MAX_COMMENT_LENGTH = 500;

if (content.length > MAX_COMMENT_LENGTH) {
  return Response.json({ error: 'Comment too long' }, { status: 400 });
}
```

### 2. Rate Limiting
```typescript
// Simple rate limiting with Cloudflare KV
const rateLimitKey = `rate_limit:${userId}:${action}`;
const count = await env.KV.get(rateLimitKey);

if (count && parseInt(count) > 10) {
  return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
}

await env.KV.put(rateLimitKey, (parseInt(count || '0') + 1).toString(), {
  expirationTtl: 60, // 1 minute
});
```

### 3. Content Sanitization
```typescript
import DOMPurify from 'isomorphic-dompurify';

// Sanitize comments
const sanitizedContent = DOMPurify.sanitize(content, {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
});
```

## Monitoring & Analytics

### Key Metrics to Track
1. **Performance**
   - Canvas FPS
   - API response times
   - Image upload duration
   - Page load time

2. **User Behavior**
   - Drawings created per day
   - Completion rate
   - Gallery views
   - Like/comment engagement

3. **Errors**
   - Upload failures
   - API errors
   - Client-side errors

### Implementation with Cloudflare Analytics
```typescript
// Track custom events
const trackEvent = (name: string, data: any) => {
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', JSON.stringify({
      event: name,
      data,
      timestamp: Date.now(),
    }));
  }
};

// Usage
trackEvent('drawing_completed', { duration: 120 });
trackEvent('drawing_thrown', { animationTime: 1.5 });
```

## Deployment Configuration

### wrangler.toml
```toml
name = "hatesaway"
compatibility_date = "2024-01-01"

[env.production]
name = "hatesaway-production"

[[d1_databases]]
binding = "DB"
database_name = "hatesaway-db"
database_id = "your-database-id"

[[r2_buckets]]
binding = "IMAGES"
bucket_name = "hatesaway-images"

[build]
command = "npm run build"

[site]
bucket = "./out"
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Cloudflare Pages
  images: {
    unoptimized: true,
    domains: ['pub-hatesaway-images.r2.dev'],
  },
};

module.exports = nextConfig;
```

## Testing Strategy

### Unit Tests
- Canvas utility functions
- User ID generation
- Image processing

### Integration Tests
- API endpoints
- Database operations
- R2 uploads

### E2E Tests
- Drawing flow
- Throw animation
- Gallery interaction

### Example Test
```typescript
// __tests__/api/drawings.test.ts
describe('POST /api/drawings', () => {
  it('should create a new drawing', async () => {
    const response = await fetch('/api/drawings', {
      method: 'POST',
      body: JSON.stringify({
        imageData: 'data:image/png;base64,...',
        userId: 'test-user-id',
      }),
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.drawing.id).toBeDefined();
    expect(data.drawing.imageUrl).toContain('.png');
  });
});
```

## Future Technical Enhancements

1. **WebSocket for Real-time Gallery Updates**
2. **AI Image Recognition** (detect inappropriate content)
3. **Progressive Web App** (offline support)
4. **WebAssembly** for intensive image processing
5. **CDN Image Transformations** (automatic resizing)
6. **GraphQL API** for more efficient queries

---

**Document Version**: 1.0
**Last Updated**: November 24, 2024
