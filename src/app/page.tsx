'use client';

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { FallingTrash } from '@/components/FallingTrash';
import { FloatingButtons } from '@/components/FloatingButtons';
import { DrawingModal } from '@/components/DrawingModal';
import { TrashAnimation } from '@/components/TrashAnimation';
import { DrawingDetailModal } from '@/components/DrawingDetailModal';
import { getDrawingsLocal, toggleLikeLocal, isLikedLocal } from '@/lib/storage';
import { getUserId } from '@/lib/user';
import { Drawing } from '@/types';

export default function Home() {
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [animatingImage, setAnimatingImage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [drawingsCount, setDrawingsCount] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = getUserId();
    setUserId(id);
    updateDrawingsCount();
  }, []);

  const updateDrawingsCount = () => {
    const drawings = getDrawingsLocal();
    setDrawingsCount(drawings.length);
  };

  const handleStartAnimation = (imageData: string) => {
    setAnimatingImage(imageData);
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setAnimatingImage(null);
    // Refresh falling drawings to include the new one
    setRefreshKey(prev => prev + 1);
    updateDrawingsCount();
  };

  const handleDrawingClick = (drawing: Drawing | null) => {
    if (drawing) {
      setSelectedDrawing(drawing);
      setIsDetailOpen(true);
    }
  };

  const handleLike = (drawingId: string) => {
    toggleLikeLocal(drawingId, userId);
    // Update selected drawing's like status
    const drawings = getDrawingsLocal();
    const updated = drawings.find(d => d.id === drawingId);
    if (updated) {
      setSelectedDrawing({ ...updated, isLiked: isLikedLocal(drawingId, userId) });
    }
    setRefreshKey(prev => prev + 1); // Refresh falling drawings
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Top Counter */}
      <div className="fixed top-20 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="bg-background/80 backdrop-blur-sm rounded-full px-6 py-2 border shadow-lg">
          <p className="text-sm font-medium text-muted-foreground">
            {drawingsCount} {drawingsCount === 1 ? 'drawing' : 'drawings'} falling
          </p>
        </div>
      </div>

      {/* Background Animation */}
      <FallingTrash key={refreshKey} onDrawingClick={handleDrawingClick} />

      {/* Main Content - Centered but minimal */}
      <div className="relative z-10 text-center space-y-3 px-4">
        <div className="inline-block">
          <Trash2 className="h-16 w-16 md:h-20 md:w-20 text-destructive/80 mx-auto mb-3" />
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          HatesAway
        </h1>
        
        <p className="text-sm md:text-base text-muted-foreground/80 max-w-md mx-auto">
          Draw your frustrations and watch them disappear
        </p>

        <p className="text-xs md:text-sm text-muted-foreground/60 max-w-xs mx-auto pt-2">
          Click the brush icon to start drawing
        </p>
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

      {/* Trash Animation - Rendered at page level for visibility */}
      {isAnimating && animatingImage && (
        <TrashAnimation
          imageData={animatingImage}
          onComplete={handleAnimationComplete}
        />
      )}

      {/* Drawing Detail Modal */}
      <DrawingDetailModal
        drawing={selectedDrawing}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onLike={handleLike}
        isLiked={selectedDrawing ? isLikedLocal(selectedDrawing.id, userId) : false}
      />
    </div>
  );
}
