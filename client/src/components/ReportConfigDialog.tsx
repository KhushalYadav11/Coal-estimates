import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDown } from "lucide-react";

const templates = [
  { id: "standard", name: "Standard Report" },
  { id: "detailed", name: "Detailed Report" },
  { id: "executive", name: "Executive Summary" },
  { id: "compliance", name: "Compliance Report" },
];

const formats = [
  { id: "pdf", name: "PDF" },
  { id: "csv", name: "CSV" },
  { id: "excel", name: "Excel" },
];

const sections = [
  { id: "measurements", label: "Measurement Data" },
  { id: "charts", label: "Charts & Visualizations" },
  { id: "methodology", label: "Calculation Methodology" },
  { id: "quality", label: "Quality Assessment" },
];

interface ReportConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate?: (config: any) => void;
}

export function ReportConfigDialog({
  open,
  onOpenChange,
  onGenerate,
}: ReportConfigDialogProps) {
  const [template, setTemplate] = useState("standard");
  const [format, setFormat] = useState("pdf");
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "measurements",
    "charts",
  ]);

  const handleGenerate = () => {
    const config = { template, format, sections: selectedSections };
    onGenerate?.(config);
    console.log("Report generated:", config);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-report-config">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>
            Configure your coal assessment report settings.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template">Report Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger id="template" data-testid="select-template">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templates.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="format" data-testid="select-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Include Sections</Label>
            <div className="space-y-2">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={(checked) => {
                      setSelectedSections(
                        checked
                          ? [...selectedSections, section.id]
                          : selectedSections.filter((s) => s !== section.id)
                      );
                    }}
                    data-testid={`checkbox-${section.id}`}
                  />
                  <Label
                    htmlFor={section.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {section.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button onClick={handleGenerate} data-testid="button-generate">
            <FileDown className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
