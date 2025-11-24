'use client';

import { Trash2 } from 'lucide-react';

export function TrashBinRow() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-30">
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end gap-8 pb-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Trash2
            key={i}
            className="h-12 w-12 text-destructive/40 animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground/60">
          Throw your frustrations into the bins
        </p>
      </div>
    </div>
  );
}
