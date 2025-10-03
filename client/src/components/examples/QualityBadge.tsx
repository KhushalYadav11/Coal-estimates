import { QualityBadge } from "../QualityBadge";
import { ThemeProvider } from "../ThemeProvider";

export default function QualityBadgeExample() {
  return (
    <ThemeProvider>
      <div className="p-8 flex flex-wrap gap-4">
        <QualityBadge rating="excellent" />
        <QualityBadge rating="good" />
        <QualityBadge rating="fair" />
        <QualityBadge rating="poor" />
      </div>
    </ThemeProvider>
  );
}
