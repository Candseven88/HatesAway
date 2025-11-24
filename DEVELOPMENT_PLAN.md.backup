# HatesAway - Development Plan

## Project Timeline: 3 Weeks (18 Days)

### Overview
A detailed breakdown of tasks for building HatesAway from scratch to deployment.

---

## Phase 1: Foundation & MVP (Week 1 - Days 1-6)

### Day 1: Project Setup ⚙️
**Goal**: Initialize project with all necessary tools

- [x] Create Next.js 14 project with TypeScript
- [x] Install dependencies:
  - TailwindCSS + shadcn/ui
  - react-sketch-canvas
  - framer-motion
  - lucide-react
  - uuid
- [x] Configure TypeScript
- [x] Setup TailwindCSS
- [x] Initialize shadcn/ui components
- [x] Create basic folder structure
- [x] Setup Git repository
- [x] Create README and documentation

**Commands**:
```bash
npx create-next-app@latest hatesaway --typescript --tailwind --app
cd hatesaway
npm install react-sketch-canvas framer-motion lucide-react uuid
npx shadcn-ui@latest init
```

**Deliverables**:
- Working Next.js app
- All dependencies installed
- Basic folder structure

---

### Day 2: Drawing Canvas - Basic Implementation 🎨
**Goal**: Create functional drawing canvas

**Tasks**:
1. Create `DrawingCanvas` component
   - Integrate react-sketch-canvas
   - Set canvas size (800x600)
   - Basic drawing capability

2. Create `ToolBar` component
   - Brush tool button
   - Eraser tool button
   - Clear canvas button
   - Undo/Redo buttons

3. Create basic home page layout
   - Header with title
   - Canvas in center
   - Toolbar above canvas

**Files to Create**:
- `/src/components/DrawingCanvas.tsx`
- `/src/components/ToolBar.tsx`
- `/src/app/page.tsx` (update)

**Acceptance Criteria**:
- Can draw on canvas with mouse
- Can switch between brush and eraser
- Can clear canvas
- Can undo/redo actions

---

### Day 3: Drawing Tools - Advanced Features 🖌️
**Goal**: Add comprehensive drawing tools

**Tasks**:
1. Create `ColorPicker` component
   - Preset color palette
   - Custom color picker
   - Current color display

2. Create `BrushSettings` component
   - Brush size slider (1-50px)
   - Opacity slider (0-100%)
   - Preview circle

3. Enhance `ToolBar`
   - Integrate color picker
   - Integrate brush settings
   - Add visual feedback for active tool

4. Add keyboard shortcuts
   - Ctrl+Z: Undo
   - Ctrl+Y: Redo
   - Ctrl+C: Clear
   - E: Eraser

**Files to Create**:
- `/src/components/ColorPicker.tsx`
- `/src/components/BrushSettings.tsx`
- `/src/lib/shortcuts.ts`

**Acceptance Criteria**:
- Can select colors from palette
- Can adjust brush size and opacity
- Keyboard shortcuts work
- Tool changes reflected visually

---

### Day 4: Export & Trash Animation - Part 1 🗑️
**Goal**: Implement drawing export and basic animation

**Tasks**:
1. Add export functionality
   - Export canvas to PNG
   - Convert to base64 data URL
   - Add "Throw Away" button

2. Create `TrashBin` component
   - Static trash bin SVG/image
   - Position at bottom center
   - Responsive design

3. Start `TrashAnimation` component
   - Basic structure
   - Image element to animate
   - Framer Motion setup

**Files to Create**:
- `/src/components/TrashBin.tsx`
- `/src/components/TrashAnimation.tsx`
- `/src/lib/canvas-utils.ts`

**Acceptance Criteria**:
- Can export drawing as PNG
- Trash bin visible on page
- "Throw Away" button functional

---

### Day 5: Trash Animation - Part 2 ✨
**Goal**: Complete trash animation with sound

**Tasks**:
1. Implement full animation sequence
   - Phase 1: Drawing shrinks and moves toward bin
   - Phase 2: Rotation effect (720 degrees)
   - Phase 3: Trash bin shakes
   - Phase 4: Drawing fades out

2. Add sound effect
   - Find/create trash sound
   - Trigger on animation complete
   - Add mute toggle

3. Add success message
   - Encouraging feedback
   - Fade in after animation
   - Option to draw again or view gallery

**Files to Update**:
- `/src/components/TrashAnimation.tsx`
- `/public/sounds/trash.mp3`

**Acceptance Criteria**:
- Smooth animation sequence
- Sound plays on completion
- Success message shows
- Can start new drawing

---

### Day 6: Local Storage & Testing 💾
**Goal**: Add local persistence and test MVP

**Tasks**:
1. Implement user ID system
   - Generate UUID on first visit
   - Store in localStorage
   - Create utility functions

2. Save drawings locally
   - Store in localStorage
   - Create simple gallery view
   - Test with multiple drawings

3. Comprehensive testing
   - Test all drawing tools
   - Test animation flow
   - Test on different screen sizes
   - Fix bugs found

4. Code cleanup & documentation
   - Add TypeScript types
   - Add comments
   - Update README

**Files to Create**:
- `/src/lib/user.ts`
- `/src/lib/storage.ts`
- `/src/types/index.ts`

**Deliverables**:
- Working MVP with local storage
- User ID system functional
- All features tested

---

## Phase 2: Backend & Gallery (Week 2 - Days 7-12)

### Day 7: Cloudflare Setup ☁️
**Goal**: Initialize Cloudflare infrastructure

**Tasks**:
1. Install Cloudflare CLI
   - Install Wrangler
   - Login to Cloudflare
   - Link to account

2. Create D1 database
   - Create database instance
   - Write migration SQL
   - Run initial migration

3. Create R2 bucket
   - Create bucket for images
   - Configure CORS
   - Setup public access

4. Configure project
   - Create `wrangler.toml`
   - Add environment bindings
   - Test local development

**Files to Create**:
- `/wrangler.toml`
- `/migrations/001_init.sql`
- `/.dev.vars` (local env)

**Commands**:
```bash
npm install -g wrangler
wrangler login
wrangler d1 create hatesaway-db
wrangler r2 bucket create hatesaway-images
```

**Acceptance Criteria**:
- D1 database created
- R2 bucket created
- Local development environment working

---

### Day 8: Database & Storage Integration 🗄️
**Goal**: Connect application to Cloudflare services

**Tasks**:
1. Create database client
   - Setup Drizzle ORM or raw SQL
   - Create query functions
   - Add type safety

2. Create R2 client
   - Setup AWS SDK for R2
   - Create upload function
   - Handle errors

3. Create API utilities
   - Response helpers
   - Error handlers
   - Type definitions

**Files to Create**:
- `/src/lib/db.ts`
- `/src/lib/r2.ts`
- `/src/lib/api-utils.ts`

**Acceptance Criteria**:
- Can connect to D1
- Can upload to R2
- Type-safe database queries

---

### Day 9: API Routes - Drawings 📡
**Goal**: Implement drawing upload and retrieval

**Tasks**:
1. Create POST /api/drawings
   - Accept base64 image data
   - Upload to R2
   - Save metadata to D1
   - Return drawing object

2. Create GET /api/drawings
   - Fetch paginated drawings
   - Support sorting (latest/popular)
   - Include likes count
   - Return with hasMore flag

3. Create GET /api/drawings/[id]
   - Fetch single drawing
   - Include comments
   - Return 404 if not found

4. Test API routes
   - Use Postman or curl
   - Test edge cases
   - Validate responses

**Files to Create**:
- `/src/app/api/drawings/route.ts`
- `/src/app/api/drawings/[id]/route.ts`

**Acceptance Criteria**:
- Can upload drawing
- Can fetch drawings list
- Can fetch single drawing
- Pagination works

---

### Day 10: Gallery Page - Part 1 🖼️
**Goal**: Create gallery layout and basic functionality

**Tasks**:
1. Create Gallery page
   - Setup `/gallery` route
   - Create page layout
   - Add navigation

2. Create `GalleryGrid` component
   - Responsive grid layout
   - Support for different screen sizes
   - Loading skeleton

3. Create `DrawingCard` component
   - Display drawing image
   - Show likes count
   - Show creation date
   - Like button
   - Click to enlarge

4. Fetch and display drawings
   - Load initial page
   - Display in grid
   - Handle loading state
   - Handle errors

**Files to Create**:
- `/src/app/gallery/page.tsx`
- `/src/components/GalleryGrid.tsx`
- `/src/components/DrawingCard.tsx`

**Acceptance Criteria**:
- Gallery page accessible
- Drawings displayed in grid
- Responsive on mobile
- Loading states work

---

### Day 11: Gallery Page - Part 2 (Infinite Scroll) ♾️
**Goal**: Add infinite scroll and interactions

**Tasks**:
1. Implement infinite scroll
   - Detect scroll to bottom
   - Load next page
   - Append to existing drawings
   - Show loading indicator

2. Add sorting options
   - Toggle between Latest/Popular
   - Update URL params
   - Refetch with new sort

3. Add modal view
   - Click card to enlarge
   - Show full-size image
   - Show comments section
   - Add close button

**Files to Create**:
- `/src/components/DrawingModal.tsx`
- `/src/components/InfiniteScroll.tsx`

**Acceptance Criteria**:
- Infinite scroll works smoothly
- Can sort by latest/popular
- Modal view functional
- Performance good with many items

---

### Day 12: Like System ❤️
**Goal**: Implement complete like functionality

**Tasks**:
1. Create API routes
   - POST /api/likes (add like)
   - DELETE /api/likes (remove like)
   - Check if user already liked

2. Create `LikeButton` component
   - Heart icon
   - Show likes count
   - Visual feedback on click
   - Optimistic updates

3. Handle like state
   - Store in database
   - Prevent duplicate likes
   - Update count in real-time
   - Sync across components

4. Test thoroughly
   - Test optimistic updates
   - Test error rollback
   - Test persistence

**Files to Create**:
- `/src/app/api/likes/route.ts`
- `/src/components/LikeButton.tsx`

**Acceptance Criteria**:
- Can like/unlike drawings
- Likes count updates
- No duplicate likes
- Works offline (optimistic)

---

## Phase 3: Social & Polish (Week 3 - Days 13-18)

### Day 13: Comment System 💬
**Goal**: Implement comments functionality

**Tasks**:
1. Create API routes
   - POST /api/comments (add comment)
   - GET /api/comments?drawingId=xxx (get comments)

2. Create `CommentSection` component
   - Display comments list
   - Show user names (Anonymous #12345)
   - Show timestamps (relative)

3. Create `CommentForm` component
   - Textarea for input
   - Character limit (500)
   - Submit button
   - Validation

4. Create `CommentItem` component
   - User display name
   - Comment text
   - Timestamp
   - Simple styling

**Files to Create**:
- `/src/app/api/comments/route.ts`
- `/src/components/CommentSection.tsx`
- `/src/components/CommentForm.tsx`
- `/src/components/CommentItem.tsx`

**Acceptance Criteria**:
- Can post comments
- Comments display correctly
- Character limit enforced
- Real-time updates

---

### Day 14: UI/UX Polish - Part 1 ✨
**Goal**: Improve overall design and user experience

**Tasks**:
1. Design system refinement
   - Define color palette
   - Create consistent spacing
   - Typography hierarchy
   - Button styles

2. Home page enhancements
   - Better layout
   - Add hero section
   - Clear call-to-action
   - Instructions for users

3. Navigation improvements
   - Header component
   - Logo/branding
   - Active state indicators
   - Mobile menu

4. Add loading states
   - Skeleton loaders
   - Spinners
   - Progress indicators
   - Smooth transitions

**Files to Create**:
- `/src/components/Header.tsx`
- `/src/components/Hero.tsx`
- `/src/components/LoadingSkeleton.tsx`

**Acceptance Criteria**:
- Consistent visual design
- Clear user guidance
- Professional appearance
- Good first impression

---

### Day 15: UI/UX Polish - Part 2 📱
**Goal**: Mobile optimization and accessibility

**Tasks**:
1. Mobile responsiveness
   - Test on various devices
   - Adjust canvas size
   - Touch-friendly buttons
   - Optimize gallery grid

2. Accessibility improvements
   - Add ARIA labels
   - Keyboard navigation
   - Focus indicators
   - Screen reader support

3. Error handling
   - User-friendly error messages
   - Retry mechanisms
   - Fallback UI
   - Toast notifications

4. Micro-interactions
   - Button hover effects
   - Smooth transitions
   - Subtle animations
   - Haptic feedback (mobile)

**Files to Create**:
- `/src/components/Toast.tsx`
- `/src/components/ErrorBoundary.tsx`

**Acceptance Criteria**:
- Works great on mobile
- Accessible to all users
- Clear error messages
- Delightful interactions

---

### Day 16: Performance Optimization ⚡
**Goal**: Optimize for speed and efficiency

**Tasks**:
1. Code splitting
   - Dynamic imports for gallery
   - Lazy load heavy components
   - Reduce initial bundle size

2. Image optimization
   - Implement lazy loading
   - Add blur placeholders
   - Optimize image sizes
   - Use modern formats

3. API optimization
   - Add caching headers
   - Optimize database queries
   - Reduce payload sizes
   - Implement debouncing

4. Performance testing
   - Lighthouse audit
   - Measure Core Web Vitals
   - Test on slow networks
   - Profile React components

**Tools**:
- Lighthouse
- React DevTools Profiler
- Network throttling

**Acceptance Criteria**:
- Lighthouse score > 90
- Initial load < 2s
- Smooth 60fps animations
- Efficient data fetching

---

### Day 17: SEO & Meta Tags 🔍
**Goal**: Optimize for search engines and social sharing

**Tasks**:
1. Add meta tags
   - Title and description
   - Open Graph tags
   - Twitter Card tags
   - Favicon

2. Create sitemap
   - Generate sitemap.xml
   - Submit to search engines

3. Add structured data
   - Schema.org markup
   - Rich snippets

4. Social sharing
   - Dynamic OG images
   - Share buttons
   - Preview cards

**Files to Create**:
- `/src/app/layout.tsx` (update meta)
- `/public/sitemap.xml`
- `/src/components/ShareButton.tsx`

**Acceptance Criteria**:
- Rich social previews
- Good SEO foundation
- Sitemap generated
- Share buttons work

---

### Day 18: Deployment & Launch 🚀
**Goal**: Deploy to production and launch

**Tasks**:
1. Pre-deployment checklist
   - Environment variables set
   - Database migrated
   - R2 bucket configured
   - Test all features

2. Deploy to Cloudflare Pages
   - Connect GitHub repo
   - Configure build settings
   - Set environment variables
   - Deploy production

3. Post-deployment testing
   - Test all features live
   - Check API endpoints
   - Verify uploads work
   - Test on real devices

4. Launch activities
   - Announce on social media
   - Share with friends
   - Monitor errors
   - Collect feedback

**Commands**:
```bash
npm run build
wrangler pages deploy
```

**Deliverables**:
- Live production site
- All features working
- Monitoring in place
- Launch announcement

---

## Post-Launch (Week 4+)

### Immediate Tasks
- Monitor error logs
- Fix critical bugs
- Respond to user feedback
- Gather analytics data

### Short-term Enhancements (1-2 weeks)
- [ ] Multiple disposal animations (burn, shred)
- [ ] Drawing templates/stickers
- [ ] Gallery filters and search
- [ ] User profiles (optional)
- [ ] Admin dashboard

### Long-term Features (1-3 months)
- [ ] AI content moderation
- [ ] Social sharing integrations
- [ ] Mobile app (React Native)
- [ ] Gamification (badges, streaks)
- [ ] Premium features
- [ ] Multi-language support

---

## Daily Routine

### Start of Day
1. Review previous day's work
2. Test existing features
3. Check GitHub issues
4. Plan daily tasks

### During Development
1. Commit code frequently
2. Write tests as you go
3. Document complex logic
4. Take breaks every hour

### End of Day
1. Commit and push code
2. Update task list
3. Test all changes
4. Note any blockers

---

## Risk Management

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Cloudflare limits hit | High | Monitor usage, implement caching |
| Canvas performance issues | Medium | Optimize drawing algorithms |
| Large image uploads | Medium | Implement compression |
| Browser compatibility | Low | Test on major browsers |

### Project Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | High | Stick to MVP, defer features |
| Time overrun | Medium | Buffer days built in |
| Technical blockers | Medium | Research alternatives early |
| Deployment issues | Low | Test deployment early |

---

## Success Criteria

### Technical
- ✅ All features working as designed
- ✅ No critical bugs
- ✅ Performance targets met
- ✅ Responsive on all devices
- ✅ Accessible (WCAG AA)

### User Experience
- ✅ Easy to understand
- ✅ Fun and engaging
- ✅ Fast and smooth
- ✅ Visually appealing

### Business
- ✅ Successfully deployed
- ✅ Users can create drawings
- ✅ Gallery has content
- ✅ Social features working

---

## Next Steps After Reading This Plan

1. Review and approve the plan
2. Set up development environment (Day 1)
3. Create GitHub repository
4. Start with Phase 1, Day 1 tasks
5. Check in daily on progress

**Ready to start building? Let's throw some hates away! 🗑️**
