import { useState } from "react";
import { CoalTypeSelector } from "../CoalTypeSelector";
import { ThemeProvider } from "../ThemeProvider";

export default function CoalTypeSelectorExample() {
  const [coalType, setCoalType] = useState("bituminous");

  return (
    <ThemeProvider>
      <div className="p-8 max-w-md">
        <CoalTypeSelector
          value={coalType}
          onChange={(value) => {
            setCoalType(value);
            console.log("Coal type selected:", value);
          }}
        />
      </div>
    </ThemeProvider>
  );
}
