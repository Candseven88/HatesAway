'use client';

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { CanvasRef } from '@/types';

interface DrawingCanvasProps {
  strokeColor?: string;
  strokeWidth?: number;
  eraserWidth?: number;
  canvasColor?: string;
  isErasing?: boolean;
  className?: string;
}

export const DrawingCanvas = forwardRef<CanvasRef, DrawingCanvasProps>(
  (
    {
      strokeColor = '#000000',
      strokeWidth = 5,
      eraserWidth = 10,
      canvasColor = '#ffffff',
      isErasing = false,
      className = '',
    },
    ref
  ) => {
    const canvasRef = useRef<ReactSketchCanvasRef>(null);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      exportImage: async (format?: string) => {
        if (!canvasRef.current) {
          throw new Error('Canvas not initialized');
        }
        return await canvasRef.current.exportImage('png');
      },
      clearCanvas: () => {
        canvasRef.current?.clearCanvas();
      },
      undo: () => {
        canvasRef.current?.undo();
      },
      redo: () => {
        canvasRef.current?.redo();
      },
      eraseMode: (enable: boolean) => {
        canvasRef.current?.eraseMode(enable);
      },
      resetCanvas: () => {
        canvasRef.current?.resetCanvas();
      },
    }));

    return (
      <div className={`border-2 border-border rounded-lg overflow-hidden bg-white ${className}`}>
        <ReactSketchCanvas
          ref={canvasRef}
          strokeColor={strokeColor}
          strokeWidth={isErasing ? eraserWidth : strokeWidth}
          eraserWidth={eraserWidth}
          canvasColor={canvasColor}
          style={{
            width: '100%',
            height: '100%',
          }}
          svgStyle={{}}
          exportWithBackgroundImage
          allowOnlyPointerType="all"
        />
      </div>
    );
  }
);

DrawingCanvas.displayName = 'DrawingCanvas';
