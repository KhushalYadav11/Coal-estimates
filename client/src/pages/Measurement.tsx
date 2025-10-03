import { useState } from "react";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { MeasurementPanel } from "@/components/MeasurementPanel";
import { CoalTypeSelector } from "@/components/CoalTypeSelector";
import { VolumeMethodCard } from "@/components/VolumeMethodCard";
import { QualityBadge } from "@/components/QualityBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Download } from "lucide-react";
import { useRoute } from "wouter";

export default function Measurement() {
  const [, params] = useRoute("/measurement/:id");
  const [measurementMode, setMeasurementMode] = useState(false);
  const [coalType, setCoalType] = useState("bituminous");
  const [volumeMethod, setVolumeMethod] = useState("truncated-pyramid");
  
  //todo: remove mock functionality - calculate real values
  const calculatedVolume = 1245.83;
  const calculatedWeight = 1619.54;

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            South Stockpile Assessment
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" data-testid="badge-project-id">
              Project #{params?.id}
            </Badge>
            <QualityBadge rating="excellent" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-save-draft">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button data-testid="button-export">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-7 h-[600px] lg:h-auto">
          <ThreeDViewer
            modelLoaded={true}
            measurementMode={measurementMode}
            onMeasurementToggle={() => setMeasurementMode(!measurementMode)}
          />
        </div>

        <div className="lg:col-span-3 space-y-6 overflow-y-auto">
          <MeasurementPanel
            onSave={(data) => console.log("Measurement saved:", data)}
          />

          <CoalTypeSelector
            value={coalType}
            onChange={(value) => {
              setCoalType(value);
              console.log("Coal type changed:", value);
            }}
          />

          <VolumeMethodCard
            value={volumeMethod}
            onChange={(value) => {
              setVolumeMethod(value);
              console.log("Volume method changed:", value);
            }}
            calculatedVolume={calculatedVolume}
          />

          <Card>
            <CardHeader>
              <CardTitle>Estimated Weight</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-3xl font-mono font-bold text-primary"
                data-testid="text-estimated-weight"
              >
                {calculatedWeight.toFixed(2)} MT
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Metric Tons (Volume × Density)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
