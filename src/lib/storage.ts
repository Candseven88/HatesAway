import { Drawing, Comment } from '@/types';

const DRAWINGS_KEY = 'hatesaway_drawings';
const COMMENTS_KEY = 'hatesaway_comments';
const LIKES_KEY = 'hatesaway_likes';

/**
 * Local storage utilities for development and testing
 * Will be replaced by Cloudflare D1 in production
 */

export function saveDrawingLocal(drawing: Drawing): void {
  if (typeof window === 'undefined') return;
  
  const drawings = getDrawingsLocal();
  drawings.unshift(drawing);
  localStorage.setItem(DRAWINGS_KEY, JSON.stringify(drawings));
}

export function getDrawingsLocal(): Drawing[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(DRAWINGS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getDrawingLocal(id: string): Drawing | null {
  const drawings = getDrawingsLocal();
  return drawings.find(d => d.id === id) || null;
}

export function deleteDrawingLocal(id: string): void {
  if (typeof window === 'undefined') return;
  
  const drawings = getDrawingsLocal().filter(d => d.id !== id);
  localStorage.setItem(DRAWINGS_KEY, JSON.stringify(drawings));
}

export function saveCommentLocal(comment: Comment): void {
  if (typeof window === 'undefined') return;
  
  const comments = getCommentsLocal();
  comments.push(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

export function getCommentsLocal(drawingId?: string): Comment[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(COMMENTS_KEY);
  const comments: Comment[] = data ? JSON.parse(data) : [];
  
  if (drawingId) {
    return comments.filter(c => c.drawingId === drawingId);
  }
  
  return comments;
}

export function toggleLikeLocal(drawingId: string, userId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const likes = getLikesLocal();
  const key = `${drawingId}:${userId}`;
  const isLiked = likes.includes(key);
  
  if (isLiked) {
    // Unlike
    const newLikes = likes.filter(k => k !== key);
    localStorage.setItem(LIKES_KEY, JSON.stringify(newLikes));
    
    // Update drawing likes count
    const drawings = getDrawingsLocal();
    const drawing = drawings.find(d => d.id === drawingId);
    if (drawing) {
      drawing.likes = Math.max(0, drawing.likes - 1);
      localStorage.setItem(DRAWINGS_KEY, JSON.stringify(drawings));
    }
    
    return false;
  } else {
    // Like
    likes.push(key);
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    
    // Update drawing likes count
    const drawings = getDrawingsLocal();
    const drawing = drawings.find(d => d.id === drawingId);
    if (drawing) {
      drawing.likes = (drawing.likes || 0) + 1;
      localStorage.setItem(DRAWINGS_KEY, JSON.stringify(drawings));
    }
    
    return true;
  }
}

export function isLikedLocal(drawingId: string, userId: string): boolean {
  const likes = getLikesLocal();
  const key = `${drawingId}:${userId}`;
  return likes.includes(key);
}

function getLikesLocal(): string[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(LIKES_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearAllLocal(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(DRAWINGS_KEY);
  localStorage.removeItem(COMMENTS_KEY);
  localStorage.removeItem(LIKES_KEY);
}
