'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <Trash2 className="h-6 w-6 text-destructive" />
          <span>HatesAway</span>
        </Link>
      </div>
    </header>
  );
}
