import { MeasurementPanel } from "../MeasurementPanel";
import { ThemeProvider } from "../ThemeProvider";

export default function MeasurementPanelExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-md">
        <MeasurementPanel
          onSave={(data) => console.log("Measurement data:", data)}
        />
      </div>
    </ThemeProvider>
  );
}
