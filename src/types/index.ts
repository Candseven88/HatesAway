// Core type definitions for HatesAway

export interface Drawing {
  id: string;
  imageUrl: string;
  userId: string;
  likes: number;
  createdAt: number;
  isLiked?: boolean; // Client-side only
}

export interface Comment {
  id: string;
  drawingId: string;
  userId: string;
  content: string;
  createdAt: number;
}

export interface Like {
  drawingId: string;
  userId: string;
  createdAt: number;
}

export interface DrawingInsert {
  id: string;
  imageUrl: string;
  userId: string;
  createdAt: number;
}

export interface CommentInsert {
  id: string;
  drawingId: string;
  userId: string;
  content: string;
  createdAt: number;
}

export interface DrawingsResponse {
  drawings: Drawing[];
  hasMore: boolean;
  page: number;
  total: number;
}

export interface LikeResponse {
  success: boolean;
  likes: number;
  isLiked: boolean;
}

export interface CommentResponse {
  comment: Comment;
}

export interface CommentsResponse {
  comments: Comment[];
}

export type SortBy = 'latest' | 'popular';

export interface CanvasRef {
  exportImage: (format?: string) => Promise<string>;
  clearCanvas: () => void;
  undo: () => void;
  redo: () => void;
  eraseMode: (enable: boolean) => void;
  resetCanvas: () => void;
}

export interface ToolbarState {
  tool: 'brush' | 'eraser';
  color: string;
  brushSize: number;
  opacity: number;
}

export interface AnimationState {
  isAnimating: boolean;
  isComplete: boolean;
  imageData: string | null;
}
