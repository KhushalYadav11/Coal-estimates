import { useState } from "react";
import { CreateProjectDialog } from "../CreateProjectDialog";
import { ThemeProvider } from "../ThemeProvider";
import { Button } from "@/components/ui/button";

export default function CreateProjectDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <CreateProjectDialog
          open={open}
          onOpenChange={setOpen}
          onSubmit={(data) => console.log("Form submitted:", data)}
        />
      </div>
    </ThemeProvider>
  );
}
