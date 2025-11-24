'use client';

import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings2 } from 'lucide-react';

interface BrushSettingsProps {
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

export function BrushSettings({ brushSize, onBrushSizeChange }: BrushSettingsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Size: {brushSize}px</span>
          <span className="sm:hidden">{brushSize}px</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <Card className="border-0 shadow-none">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm">Brush Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-4">
            {/* Brush Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Size</label>
                <span className="text-sm text-muted-foreground">{brushSize}px</span>
              </div>
              <Slider
                value={[brushSize]}
                onValueChange={(values) => onBrushSizeChange(values[0])}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              
              {/* Size Preview */}
              <div className="flex items-center justify-center p-4 bg-muted rounded">
                <div
                  className="rounded-full bg-foreground transition-all"
                  style={{
                    width: `${Math.min(brushSize * 2, 80)}px`,
                    height: `${Math.min(brushSize * 2, 80)}px`,
                  }}
                />
              </div>
            </div>

            {/* Quick Size Presets */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Select</label>
              <div className="grid grid-cols-5 gap-2">
                {[2, 5, 10, 20, 40].map((size) => (
                  <Button
                    key={size}
                    variant={brushSize === size ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onBrushSizeChange(size)}
                    className="text-xs"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
