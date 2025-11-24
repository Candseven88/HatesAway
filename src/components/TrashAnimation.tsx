'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrashBin } from './TrashBin';

interface TrashAnimationProps {
  imageData: string | null;
  onComplete: () => void;
}

type AnimationPhase = 'idle' | 'throwing' | 'shaking' | 'disposed' | 'complete';

export function TrashAnimation({ imageData, onComplete }: TrashAnimationProps) {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!imageData) {
      setPhase('idle');
      return;
    }

    // Start animation sequence
    const runAnimation = async () => {
      // Phase 1: Throwing (drawing moves to trash)
      setPhase('throwing');
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Phase 2: Shaking (trash bin shakes)
      setPhase('shaking');
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Phase 3: Disposed (drawing disappears)
      setPhase('disposed');
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Phase 4: Show success message
      setPhase('complete');
      setShowSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Complete
      onComplete();
    };

    runAnimation();
  }, [imageData, onComplete]);

  // Calculate target position (trash bin location)
  const getTargetPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight - 100,
    };
  };

  const target = getTargetPosition();

  return (
    <>
      {/* Trash Bin */}
      <TrashBin
        isShaking={phase === 'shaking'}
        isOpen={phase === 'throwing' || phase === 'shaking'}
      />

      {/* Animated Drawing */}
      <AnimatePresence>
        {imageData && phase !== 'disposed' && phase !== 'complete' && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative"
              initial={{
                scale: 1,
                rotate: 0,
                x: 0,
                y: 0,
              }}
              animate={
                phase === 'throwing'
                  ? {
                      scale: 0.15,
                      rotate: 720,
                      x: target.x - window.innerWidth / 2,
                      y: target.y - window.innerHeight / 2,
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                ease: [0.32, 0, 0.67, 0],
              }}
            >
              <img
                src={imageData}
                alt="Drawing"
                className="w-[600px] h-[450px] object-contain rounded-lg shadow-2xl border-4 border-white"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card border-2 border-primary rounded-2xl p-8 shadow-2xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <div className="text-6xl mb-4">🎉</div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Thrown Away!</h3>
              <p className="text-muted-foreground">
                Your frustration is gone. Feel better?
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
