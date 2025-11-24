'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DrawingCanvas } from './DrawingCanvas';
import { ToolBar } from './ToolBar';
import { ColorPicker } from './ColorPicker';
import { BrushSettings } from './BrushSettings';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { CanvasRef, ToolbarState } from '@/types';
import { saveDrawingLocal } from '@/lib/storage';
import { getUserId } from '@/lib/user';
import { v4 as uuidv4 } from 'uuid';

interface DrawingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartAnimation?: (imageData: string) => void;
  onAnimationComplete?: () => void;
  isAnimating?: boolean;
}

export function DrawingModal({ 
  open, 
  onOpenChange,
  onStartAnimation,
  onAnimationComplete,
  isAnimating: externalIsAnimating = false,
}: DrawingModalProps) {
  const canvasRef = useRef<CanvasRef>(null);
  
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    tool: 'brush',
    color: '#000000',
    brushSize: 5,
    opacity: 100,
  });

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            canvasRef.current?.undo();
            break;
          case 'y':
            e.preventDefault();
            canvasRef.current?.redo();
            break;
          case 'c':
            e.preventDefault();
            handleClear();
            break;
        }
      } else if (e.key.toLowerCase() === 'e') {
        setToolbarState((prev) => ({
          ...prev,
          tool: prev.tool === 'eraser' ? 'brush' : 'eraser',
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  // Update eraser mode when tool changes
  useEffect(() => {
    if (open) {
      canvasRef.current?.eraseMode(toolbarState.tool === 'eraser');
    }
  }, [toolbarState.tool, open]);

  const handleToolChange = (tool: 'brush' | 'eraser') => {
    setToolbarState((prev) => ({ ...prev, tool }));
  };

  const handleColorChange = (color: string) => {
    setToolbarState((prev) => ({ ...prev, color }));
  };

  const handleBrushSizeChange = (size: number) => {
    setToolbarState((prev) => ({ ...prev, brushSize: size }));
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleRedo = () => {
    canvasRef.current?.redo();
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      canvasRef.current?.clearCanvas();
    }
  };

  const handleThrowAway = async () => {
    if (externalIsAnimating) return;

    try {
      const imageData = await canvasRef.current?.exportImage();
      if (imageData) {
        // Save to localStorage
        const userId = getUserId();
        const drawing = {
          id: uuidv4(),
          imageUrl: imageData,
          userId,
          likes: 0,
          createdAt: Date.now(),
        };
        saveDrawingLocal(drawing);
        
        // Trigger animation in parent component
        onStartAnimation?.(imageData);
        canvasRef.current?.clearCanvas();
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error exporting drawing:', error);
      alert('Failed to export drawing. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={externalIsAnimating ? () => {} : onOpenChange}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] p-0 gap-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Draw Your Frustration</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 p-4 border-b bg-muted/30">
            <ToolBar
              toolbarState={toolbarState}
              onToolChange={handleToolChange}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onClear={handleClear}
            />
            
            <ColorPicker
              color={toolbarState.color}
              onChange={handleColorChange}
            />
            
            <BrushSettings
              brushSize={toolbarState.brushSize}
              onBrushSizeChange={handleBrushSizeChange}
            />

            <div className="ml-auto">
              <Button
                variant="destructive"
                size="lg"
                onClick={handleThrowAway}
                disabled={externalIsAnimating}
                className="gap-2"
              >
                <Trash2 className="h-5 w-5" />
                {externalIsAnimating ? 'Throwing...' : 'Throw Away'}
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-4 overflow-hidden flex items-center justify-center bg-muted/10">
            <div className="w-full h-full max-w-5xl mx-auto">
              <DrawingCanvas
                ref={canvasRef}
                strokeColor={toolbarState.color}
                strokeWidth={toolbarState.brushSize}
                eraserWidth={toolbarState.brushSize * 2}
                isErasing={toolbarState.tool === 'eraser'}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Footer - Keyboard Shortcuts */}
          <div className="p-3 border-t bg-muted/30 text-xs text-center text-muted-foreground">
            <kbd className="px-2 py-1 bg-background rounded">Ctrl+Z</kbd> Undo •{' '}
            <kbd className="px-2 py-1 bg-background rounded">Ctrl+Y</kbd> Redo •{' '}
            <kbd className="px-2 py-1 bg-background rounded">E</kbd> Eraser •{' '}
            <kbd className="px-2 py-1 bg-background rounded">ESC</kbd> Close
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
