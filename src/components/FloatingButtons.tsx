'use client';

import { Button } from '@/components/ui/button';
import { Paintbrush, ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface FloatingButtonsProps {
  onDrawClick?: () => void;
}

export function FloatingButtons({ onDrawClick }: FloatingButtonsProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Draw Button */}
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={onDrawClick}
        title="Draw Your Frustration"
      >
        <Paintbrush className="h-6 w-6" />
      </Button>

      {/* Gallery Button */}
      <Button
        size="lg"
        variant="outline"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-background"
        asChild
        title="View Gallery"
      >
        <Link href="/gallery">
          <ImageIcon className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
}
