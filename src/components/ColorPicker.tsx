'use client';

import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRESET_COLORS } from '@/lib/canvas-utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div
            className="w-6 h-6 rounded border-2 border-border"
            style={{ backgroundColor: color }}
          />
          <span className="hidden sm:inline">Color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Card className="border-0 shadow-none">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm">Choose Color</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-3">
            {/* Custom Color Picker */}
            <HexColorPicker color={color} onChange={onChange} />
            
            {/* Current Color Display */}
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span className="text-xs font-medium">Current:</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded border-2 border-border"
                  style={{ backgroundColor: color }}
                />
                <code className="text-xs">{color.toUpperCase()}</code>
              </div>
            </div>

            {/* Preset Colors */}
            <div>
              <p className="text-xs font-medium mb-2">Presets:</p>
              <div className="grid grid-cols-8 gap-1.5">
                {PRESET_COLORS.map((presetColor) => (
                  <button
                    key={presetColor}
                    className={`w-7 h-7 rounded border-2 transition-all hover:scale-110 ${
                      color.toLowerCase() === presetColor.toLowerCase()
                        ? 'border-primary ring-2 ring-primary ring-offset-1'
                        : 'border-border'
                    }`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => onChange(presetColor)}
                    title={presetColor}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
