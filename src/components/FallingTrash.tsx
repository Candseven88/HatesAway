'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDrawingsLocal } from '@/lib/storage';
import { Drawing } from '@/types';

interface FallingDrawing {
  id: number;
  x: number;
  delay: number;
  duration: number;
  imageUrl: string;
  rotation: number;
  size: number;
  drawingId?: string; // Link to actual drawing for details
}

interface FallingTrashProps {
  onDrawingClick?: (drawing: Drawing | null) => void;
}

export function FallingTrash({ onDrawingClick }: FallingTrashProps) {
  const [fallingDrawings, setFallingDrawings] = useState<FallingDrawing[]>([]);
  const [allDrawings, setAllDrawings] = useState<Drawing[]>([]);

  useEffect(() => {
    // Load real user drawings from localStorage
    const drawings = getDrawingsLocal();
    setAllDrawings(drawings);
    
    // Create placeholder images if no drawings exist
    const imageSources = drawings.length > 0 
      ? drawings.map(d => d.imageUrl)
      : [
          // Placeholder: simple colored squares as fallback
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ff6b6b" width="100" height="100"/%3E%3C/svg%3E',
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%234ecdc4" width="100" height="100"/%3E%3C/svg%3E',
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ffe66d" width="100" height="100"/%3E%3C/svg%3E',
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23a8e6cf" width="100" height="100"/%3E%3C/svg%3E',
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ff8b94" width="100" height="100"/%3E%3C/svg%3E',
        ];

    // Generate 20 falling items with random positions and timing
    const items: FallingDrawing[] = Array.from({ length: 20 }, (_, i) => {
      const randomIndex = Math.floor(Math.random() * (drawings.length > 0 ? drawings.length : imageSources.length));
      return {
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        imageUrl: drawings.length > 0 ? drawings[randomIndex].imageUrl : imageSources[randomIndex],
        drawingId: drawings.length > 0 ? drawings[randomIndex].id : undefined,
        rotation: Math.random() * 360,
        size: 80 + Math.random() * 80, // 80-160px
      };
    });
    
    setFallingDrawings(items);
    
    // Reload when storage changes
    const handleStorageChange = () => {
      const updatedDrawings = getDrawingsLocal();
      setAllDrawings(updatedDrawings);
      if (updatedDrawings.length > 0) {
        setFallingDrawings(prev => 
          prev.map(item => {
            const randomIndex = Math.floor(Math.random() * updatedDrawings.length);
            return {
              ...item,
              imageUrl: updatedDrawings[randomIndex].imageUrl,
              drawingId: updatedDrawings[randomIndex].id,
            };
          })
        );
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClick = (drawingId?: string) => {
    if (!onDrawingClick || !drawingId) return;
    const drawing = allDrawings.find(d => d.id === drawingId);
    onDrawingClick(drawing || null);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {fallingDrawings.map((item) => (
        <motion.div
          key={item.id}
          className="absolute cursor-pointer"
          style={{
            left: `${item.x}%`,
            top: '-15%',
            pointerEvents: item.drawingId ? 'auto' : 'none',
          }}
          animate={{
            y: ['0vh', '115vh'],
            rotate: [item.rotation, item.rotation + 180],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          onClick={() => handleClick(item.drawingId)}
          whileHover={item.drawingId ? { scale: 1.1, opacity: 1 } : {}}
        >
          <img
            src={item.imageUrl}
            alt="Falling drawing"
            className="rounded-lg shadow-xl"
            style={{
              width: `${item.size}px`,
              height: `${item.size}px`,
              objectFit: 'cover',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
