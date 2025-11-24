'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Paintbrush, Eraser, Undo, Redo, RotateCcw } from 'lucide-react';
import { ToolbarState } from '@/types';

interface ToolBarProps {
  toolbarState: ToolbarState;
  onToolChange: (tool: 'brush' | 'eraser') => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

export function ToolBar({
  toolbarState,
  onToolChange,
  onUndo,
  onRedo,
  onClear,
}: ToolBarProps) {
  const { tool } = toolbarState;

  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg bg-card flex-wrap">
      {/* Drawing Tools */}
      <div className="flex items-center gap-1">
        <Button
          variant={tool === 'brush' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onToolChange('brush')}
          className="gap-2"
        >
          <Paintbrush className="h-4 w-4" />
          <span className="hidden sm:inline">Brush</span>
        </Button>
        
        <Button
          variant={tool === 'eraser' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onToolChange('eraser')}
          className="gap-2"
        >
          <Eraser className="h-4 w-4" />
          <span className="hidden sm:inline">Eraser</span>
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* History Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Clear Canvas */}
      <Button
        variant="outline"
        size="sm"
        onClick={onClear}
        className="gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        <span className="hidden sm:inline">Clear</span>
      </Button>
    </div>
  );
}
