'use client';

import { ImageIcon, Heart } from 'lucide-react';
import { FloatingButtons } from '@/components/FloatingButtons';
import { useState, useEffect } from 'react';
import { DrawingModal } from '@/components/DrawingModal';
import { TrashAnimation } from '@/components/TrashAnimation';
import { getDrawingsLocal, toggleLikeLocal, isLikedLocal } from '@/lib/storage';
import { getUserId, getUserDisplayName } from '@/lib/user';
import { Drawing } from '@/types';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [userId, setUserId] = useState('');
  const [animatingImage, setAnimatingImage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const id = getUserId();
    setUserId(id);
    loadDrawings(id);
  }, []);

  const loadDrawings = (currentUserId: string) => {
    const localDrawings = getDrawingsLocal();
    const drawingsWithLikes = localDrawings.map(d => ({
      ...d,
      isLiked: isLikedLocal(d.id, currentUserId),
    }));
    setDrawings(drawingsWithLikes);
  };

  const handleLike = (drawingId: string) => {
    const isLiked = toggleLikeLocal(drawingId, userId);
    setDrawings(prev =>
      prev.map(d =>
        d.id === drawingId
          ? { ...d, likes: d.likes + (isLiked ? 1 : -1), isLiked }
          : d
      )
    );
  };

  const handleStartAnimation = (imageData: string) => {
    setAnimatingImage(imageData);
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setAnimatingImage(null);
    loadDrawings(userId); // Reload drawings to show the new one
  };

  return (
    <div className="w-full py-12 px-4 min-h-[calc(100vh-4rem)]">
      <div className="text-center space-y-4 mb-12 w-full">
        <div className="flex justify-center">
          <ImageIcon className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold w-full">Gallery</h1>
        <div className="flex justify-center w-full">
          <p className="text-lg text-muted-foreground max-w-2xl">
            {drawings.length > 0
              ? `${drawings.length} frustration${drawings.length !== 1 ? 's' : ''} thrown away`
              : 'No drawings yet. Be the first to throw something away!'}
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto">
        {drawings.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {drawings.map((drawing) => (
              <div
                key={drawing.id}
                className="group relative aspect-square w-full max-w-xs bg-muted rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all"
              >
                <img
                  src={drawing.imageUrl}
                  alt="Drawing"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                    <p className="text-xs text-white/80">
                      {getUserDisplayName(drawing.userId)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(drawing.id)}
                      className={`gap-1 h-8 ${
                        drawing.isLiked ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      <Heart
                        className="h-4 w-4"
                        fill={drawing.isLiked ? 'currentColor' : 'none'}
                      />
                      <span>{drawing.likes}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ImageIcon className="h-20 w-20 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-6">
              No drawings yet. Start by drawing your first frustration!
            </p>
            <Button onClick={() => setIsDrawingOpen(true)}>
              Create Your First Drawing
            </Button>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <FloatingButtons onDrawClick={() => setIsDrawingOpen(true)} />

      {/* Drawing Modal */}
      <DrawingModal 
        open={isDrawingOpen} 
        onOpenChange={setIsDrawingOpen}
        onStartAnimation={handleStartAnimation}
        onAnimationComplete={handleAnimationComplete}
        isAnimating={isAnimating}
      />

      {/* Trash Animation */}
      {isAnimating && animatingImage && (
        <TrashAnimation
          imageData={animatingImage}
          onComplete={handleAnimationComplete}
        />
      )}
    </div>
  );
}
