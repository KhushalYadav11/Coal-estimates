import { useState } from "react";
import { ReportConfigDialog } from "../ReportConfigDialog";
import { ThemeProvider } from "../ThemeProvider";
import { Button } from "@/components/ui/button";

export default function ReportConfigDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>Open Report Dialog</Button>
        <ReportConfigDialog
          open={open}
          onOpenChange={setOpen}
          onGenerate={(config) => console.log("Report config:", config)}
        />
      </div>
    </ThemeProvider>
  );
}
