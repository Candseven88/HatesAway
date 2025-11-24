'use client';

import { useState, useRef, useEffect } from 'react';
import { DrawingCanvas } from './DrawingCanvas';
import { ToolBar } from './ToolBar';
import { ColorPicker } from './ColorPicker';
import { BrushSettings } from './BrushSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { CanvasRef, ToolbarState } from '@/types';

export function DrawingSection() {
  const canvasRef = useRef<CanvasRef>(null);
  
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    tool: 'brush',
    color: '#000000',
    brushSize: 5,
    opacity: 100,
  });

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Update canvas size on window resize
  useEffect(() => {
    const updateCanvasSize = () => {
      const maxWidth = Math.min(window.innerWidth - 80, 800);
      const height = (maxWidth * 3) / 4; // 4:3 aspect ratio
      setCanvasSize({ width: maxWidth, height });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, []);

  // Update eraser mode when tool changes
  useEffect(() => {
    canvasRef.current?.eraseMode(toolbarState.tool === 'eraser');
  }, [toolbarState.tool]);

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
    try {
      const imageData = await canvasRef.current?.exportImage();
      if (imageData) {
        // TODO: Implement throw away animation and save
        console.log('Throwing away drawing...', imageData.substring(0, 50));
        alert('Throw away animation will be implemented next! Drawing saved to console.');
      }
    } catch (error) {
      console.error('Error exporting drawing:', error);
      alert('Failed to export drawing. Please try again.');
    }
  };

  return (
    <section id="canvas" className="py-12">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Drawing Canvas</CardTitle>
          <CardDescription>
            Draw what frustrates you. When you're ready, throw it away!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
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
                className="gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Throw Away
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div
            className="mx-auto"
            style={{
              maxWidth: `${canvasSize.width}px`,
            }}
          >
            <DrawingCanvas
              ref={canvasRef}
              strokeColor={toolbarState.color}
              strokeWidth={toolbarState.brushSize}
              eraserWidth={toolbarState.brushSize * 2}
              isErasing={toolbarState.tool === 'eraser'}
              className="aspect-[4/3] w-full"
            />
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="text-sm text-muted-foreground text-center space-y-1">
            <p className="font-medium">Keyboard Shortcuts:</p>
            <p>
              <kbd className="px-2 py-1 bg-muted rounded">Ctrl/Cmd + Z</kbd> Undo •{' '}
              <kbd className="px-2 py-1 bg-muted rounded">Ctrl/Cmd + Y</kbd> Redo •{' '}
              <kbd className="px-2 py-1 bg-muted rounded">E</kbd> Toggle Eraser •{' '}
              <kbd className="px-2 py-1 bg-muted rounded">Ctrl/Cmd + C</kbd> Clear
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
