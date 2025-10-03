import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QualityBadge } from "@/components/QualityBadge";
import {
  TrendingUp,
  Scale,
  FileCheck,
  Clock,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function Analytics() {
  //todo: remove mock functionality - replace with real chart data
  const hourlyActivity = [8, 12, 15, 18, 22, 19, 16, 14];
  const maxActivity = Math.max(...hourlyActivity);

  const coalDistribution = [
    { type: "Bituminous", count: 28, color: "bg-chart-1" },
    { type: "Anthracite", count: 12, color: "bg-chart-2" },
    { type: "Sub-bituminous", count: 8, color: "bg-chart-3" },
  ];

  const qualityMetrics = [
    { rating: "excellent" as const, count: 24, percentage: 50 },
    { rating: "good" as const, count: 20, percentage: 42 },
    { rating: "fair" as const, count: 3, percentage: 6 },
    { rating: "poor" as const, count: 1, percentage: 2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Measurement trends and quality insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Measurements"
          value="48"
          subtitle="Today"
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Volume"
          value="3,138 m³"
          subtitle="All projects"
          icon={Scale}
        />
        <MetricCard
          title="Quality Rate"
          value="92%"
          subtitle="Excellent/Good"
          icon={FileCheck}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Avg Time"
          value="2.5 min"
          subtitle="Per measurement"
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Hourly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hourlyActivity.map((count, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-sm font-mono text-muted-foreground w-16">
                    {9 + index}:00
                  </div>
                  <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(count / maxActivity) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm font-semibold w-8 text-right">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Coal Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coalDistribution.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.type}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.count} measurements
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${(item.count / 48) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quality Assessment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualityMetrics.map((metric) => (
              <div
                key={metric.rating}
                className="rounded-lg border p-4 space-y-2"
              >
                <QualityBadge rating={metric.rating} />
                <div className="text-3xl font-bold">{metric.count}</div>
                <div className="text-sm text-muted-foreground">
                  {metric.percentage}% of total
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
