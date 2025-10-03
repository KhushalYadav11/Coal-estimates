import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

export type QualityRating = "excellent" | "good" | "fair" | "poor";

interface QualityBadgeProps {
  rating: QualityRating;
  showIcon?: boolean;
}

const qualityConfig = {
  excellent: {
    label: "Excellent",
    className: "bg-chart-2/20 text-chart-2 border-chart-2/30",
    icon: CheckCircle,
  },
  good: {
    label: "Good",
    className: "bg-chart-1/20 text-chart-1 border-chart-1/30",
    icon: Info,
  },
  fair: {
    label: "Fair",
    className: "bg-chart-3/20 text-chart-3 border-chart-3/30",
    icon: AlertTriangle,
  },
  poor: {
    label: "Poor",
    className: "bg-destructive/20 text-destructive border-destructive/30",
    icon: XCircle,
  },
};

export function QualityBadge({ rating, showIcon = true }: QualityBadgeProps) {
  const config = qualityConfig[rating];
  const Icon = config.icon;

  return (
    <Badge
      className={`${config.className} border`}
      data-testid={`badge-quality-${rating}`}
    >
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.label}
    </Badge>
  );
}
