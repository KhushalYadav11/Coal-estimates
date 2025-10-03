import { MetricCard } from "../MetricCard";
import { ThemeProvider } from "../ThemeProvider";
import { TrendingUp, Scale, FileCheck, Target } from "lucide-react";

export default function MetricCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Measurements"
          value="48"
          subtitle="of 60 daily target"
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Volume"
          value="1,245.8 m³"
          subtitle="Today's assessment"
          icon={Scale}
        />
        <MetricCard
          title="Estimated Weight"
          value="1,619.5 MT"
          subtitle="Bituminous coal"
          icon={Scale}
        />
        <MetricCard
          title="Quality Rate"
          value="92%"
          subtitle="Excellent/Good"
          icon={FileCheck}
          trend={{ value: 5, isPositive: true }}
        />
      </div>
    </ThemeProvider>
  );
}
