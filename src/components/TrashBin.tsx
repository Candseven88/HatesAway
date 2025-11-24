'use client';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface TrashBinProps {
  isShaking?: boolean;
  isOpen?: boolean;
}

export function TrashBin({ isShaking = false, isOpen = false }: TrashBinProps) {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      animate={
        isShaking
          ? {
              x: [-50, -45, -55, -45, -55, -50],
              rotate: [0, -5, 5, -5, 5, 0],
            }
          : {
              x: -50,
              rotate: 0,
            }
      }
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: isOpen ? 1.2 : 1,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {/* Trash Bin Lid - Opens when active */}
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-2 bg-destructive rounded-t-lg"
          animate={{
            rotateX: isOpen ? 180 : 0,
            y: isOpen ? -10 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            transformOrigin: 'bottom center',
          }}
        />

        {/* Trash Bin Body */}
        <div className="relative">
          <Trash2 className="h-20 w-20 text-destructive drop-shadow-lg" />
          
          {/* Glow effect when open */}
          {isOpen && (
            <motion.div
              className="absolute inset-0 bg-destructive/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
