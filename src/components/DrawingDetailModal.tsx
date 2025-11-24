'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';
import { Drawing } from '@/types';
import { getUserDisplayName } from '@/lib/user';

interface DrawingDetailModalProps {
  drawing: Drawing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLike?: (drawingId: string) => void;
  isLiked?: boolean;
}

export function DrawingDetailModal({
  drawing,
  open,
  onOpenChange,
  onLike,
  isLiked = false,
}: DrawingDetailModalProps) {
  if (!drawing) return null;

  const formattedDate = new Date(drawing.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <div className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Drawing Image */}
          <div className="w-full aspect-video bg-muted flex items-center justify-center p-4">
            <img
              src={drawing.imageUrl}
              alt="Drawing"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Drawing Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    By {getUserDisplayName(drawing.userId)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
              </div>

              {/* Like Button */}
              <Button
                variant={isLiked ? 'default' : 'outline'}
                size="lg"
                onClick={() => onLike?.(drawing.id)}
                className="gap-2"
              >
                <Heart
                  className="h-5 w-5"
                  fill={isLiked ? 'currentColor' : 'none'}
                />
                <span className="font-semibold">{drawing.likes}</span>
              </Button>
            </div>

            {/* Description */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground text-center italic">
                "A frustration thrown away"
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
