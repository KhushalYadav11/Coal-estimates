import { useState } from "react";
import { VolumeMethodCard } from "../VolumeMethodCard";
import { ThemeProvider } from "../ThemeProvider";

export default function VolumeMethodCardExample() {
  const [method, setMethod] = useState("truncated-pyramid");

  return (
    <ThemeProvider>
      <div className="p-8 max-w-lg">
        <VolumeMethodCard
          value={method}
          onChange={(value) => {
            setMethod(value);
            console.log("Method selected:", value);
          }}
          calculatedVolume={1245.83}
        />
      </div>
    </ThemeProvider>
  );
}
