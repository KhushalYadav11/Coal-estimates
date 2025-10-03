import { useState } from "react";
import { ThreeDViewer } from "../ThreeDViewer";
import { ThemeProvider } from "../ThemeProvider";

export default function ThreeDViewerExample() {
  const [measurementMode, setMeasurementMode] = useState(false);

  return (
    <ThemeProvider>
      <div className="h-screen w-full">
        <ThreeDViewer
          modelLoaded={true}
          measurementMode={measurementMode}
          onMeasurementToggle={() => {
            setMeasurementMode(!measurementMode);
            console.log("Measurement mode toggled:", !measurementMode);
          }}
        />
      </div>
    </ThemeProvider>
  );
}
