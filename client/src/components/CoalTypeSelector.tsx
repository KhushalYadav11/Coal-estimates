import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mountain } from "lucide-react";

export const COAL_TYPES = [
  { id: "anthracite", name: "Anthracite", density: 1.5 },
  { id: "bituminous", name: "Bituminous Coal", density: 1.3 },
  { id: "sub-bituminous", name: "Sub-bituminous Coal", density: 1.2 },
  { id: "lignite", name: "Lignite", density: 1.1 },
  { id: "coking", name: "Coking Coal", density: 1.35 },
  { id: "thermal", name: "Thermal Coal", density: 1.25 },
];

interface CoalTypeSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function CoalTypeSelector({ value, onChange }: CoalTypeSelectorProps) {
  const selectedCoal = COAL_TYPES.find((c) => c.id === value);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mountain className="h-5 w-5" />
          Coal Type
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="coal-type">Select Type</Label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger id="coal-type" data-testid="select-coal-type">
              <SelectValue placeholder="Choose coal type" />
            </SelectTrigger>
            <SelectContent>
              {COAL_TYPES.map((coal) => (
                <SelectItem key={coal.id} value={coal.id}>
                  {coal.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCoal && (
          <div className="rounded-md bg-muted p-3 space-y-1">
            <div className="text-sm text-muted-foreground">Density</div>
            <div
              className="text-2xl font-mono font-semibold"
              data-testid="text-coal-density"
            >
              {selectedCoal.density} g/cm³
            </div>
            <div className="text-xs text-muted-foreground pt-1">
              Used for weight calculation: Weight = Volume × Density
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
