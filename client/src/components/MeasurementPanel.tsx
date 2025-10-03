import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ruler, Save } from "lucide-react";

interface MeasurementPanelProps {
  onSave?: (data: MeasurementData) => void;
}

export interface MeasurementData {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export function MeasurementPanel({ onSave }: MeasurementPanelProps) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("meters");

  const handleSave = () => {
    const data: MeasurementData = {
      length: parseFloat(length) || 0,
      width: parseFloat(width) || 0,
      height: parseFloat(height) || 0,
      unit,
    };
    onSave?.(data);
    console.log("Measurement saved:", data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="h-5 w-5" />
          Dimensions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="length">Length</Label>
          <div className="flex gap-2">
            <Input
              id="length"
              type="number"
              placeholder="0.00"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="font-mono"
              data-testid="input-length"
            />
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="w-28" data-testid="select-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meters">m</SelectItem>
                <SelectItem value="feet">ft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            type="number"
            placeholder="0.00"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="font-mono"
            data-testid="input-width"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            placeholder="0.00"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="font-mono"
            data-testid="input-height"
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSave}
          data-testid="button-save-measurement"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Measurement
        </Button>
      </CardContent>
    </Card>
  );
}
