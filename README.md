# HatesAway - Throw Your Hates Away 🗑️

A therapeutic web application where users can draw their frustrations and watch them get thrown into the trash bin with satisfying animations.

## Project Overview

HatesAway is an interactive web app that provides emotional release through creative expression. Users can draw whatever frustrates them, watch it get dramatically thrown into a trash bin, and share their creations in a public gallery.

### Core Features

#### 1. Drawing Canvas 🎨
- **Multi-tool Support**: Brush, eraser, line, shape tools
- **Color Palette**: Full color picker with preset colors
- **Brush Settings**: Adjustable size and opacity
- **Canvas Operations**: Undo, redo, clear canvas
- **Canvas Size**: Responsive canvas with fixed aspect ratio (4:3)
- **Export**: Save as PNG format

#### 2. Trash Animation 🗑️
- **Throw Animation**: Drawing shrinks and rotates toward trash bin
- **Bin Interaction**: Trash bin shakes and opens
- **Sound Effects**: Optional satisfying sound on disposal
- **Success Feedback**: Encouraging message after disposal
- **Auto-save**: Drawing automatically saved to gallery after animation

#### 3. Gallery 🖼️
- **Public Gallery**: All drawings displayed in masonry/grid layout
- **Sorting**: Latest first, optional sort by popularity
- **Like System**: Users can like drawings (no login required)
- **Comment System**: Simple anonymous comments
- **Infinite Scroll**: Lazy loading for performance
- **Modal View**: Click to enlarge and interact

#### 4. Social Features 💬
- **Anonymous Likes**: Click to like, stored in localStorage to prevent spam
- **Anonymous Comments**: Simple text comments with timestamp
- **User Identification**: Random user ID stored in browser
- **No Login Required**: Fully anonymous, no registration

## Technical Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Canvas Library**: react-sketch-canvas
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Backend & Database
- **Platform**: Cloudflare Pages
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (Image storage)
- **API**: Next.js API Routes
- **Edge Runtime**: Cloudflare Workers

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Development Status

🎉 **Current Phase**: Phase 1 - MVP Development (Day 4 Completed)

### Completed ✅

#### Core Features
- [x] Project initialization (Next.js 14 + TypeScript + TailwindCSS)
- [x] Fullscreen immersive homepage with falling animation
- [x] Drawing canvas with react-sketch-canvas
- [x] Full toolbar (Brush, Eraser, Undo, Redo, Clear)
- [x] Color picker with presets and custom colors
- [x] Brush size controls with preview
- [x] Keyboard shortcuts (Ctrl+Z, Ctrl+Y, E, ESC)
- [x] Responsive design for all devices

#### Animation & Interaction
- [x] **Falling user drawings** - Real user artwork cascading down the homepage (borderless)
- [x] **Click-to-view details** - Click any falling drawing to see full details and like it
- [x] **Drawing counter** - Top bar showing "X drawings falling" (like Snowfall)
- [x] **Hover effects** - Drawings scale up on hover with smooth transitions
- [x] **Trash animation** - Complete throw sequence with Framer Motion
- [x] **Animated trash bin** - Shakes and opens during throw
- [x] **Success feedback** - Celebration message after disposal
- [x] **Floating action buttons** - Draw and Gallery in bottom-right
- [x] **Fullscreen drawing modal** - Immersive drawing experience
- [x] **Auto-refresh** - Falling drawings update after new submissions

#### Data & Storage
- [x] User ID system (anonymous, UUID-based)
- [x] LocalStorage integration for drawings
- [x] Gallery page with grid layout
- [x] Like system (stored locally)
- [x] User display names (Anonymous #12345)

### In Progress 🚧
- [ ] Comment system
- [ ] Sound effects for animations

### Upcoming 📋
- [ ] Cloudflare D1 + R2 integration (replace localStorage)
- [ ] API endpoints for drawings, likes, comments
- [ ] Real-time gallery updates
- [ ] Deployment to Cloudflare Pages

## Project Structure

```
96-HatesAway/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/             # React components
│   ├── lib/                    # Utilities
│   └── types/                  # TypeScript types
├── public/                     # Static assets
├── DEVELOPMENT_PLAN.md         # Detailed dev plan
├── TECHNICAL_SPECS.md          # Technical specifications
└── README.md                   # This file
```

## Contributing

This is a personal project. Contributions welcome via pull requests.

## License

MIT License

---

**Project Status**: 🚧 In Development
**Target Launch**: December 2024
