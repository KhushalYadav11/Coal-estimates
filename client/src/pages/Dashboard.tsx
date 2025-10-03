import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, Scale, FileCheck, Target, Plus } from "lucide-react";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  //todo: remove mock functionality - replace with real data
  const recentProjects = [
    {
      id: "1",
      name: "South Stockpile Assessment",
      status: "completed" as const,
      measurements: 48,
      lastUpdated: "2 hours ago",
      volume: 1245.8,
      weight: 1619.54,
    },
    {
      id: "2",
      name: "North Yard Inventory",
      status: "processing" as const,
      measurements: 32,
      lastUpdated: "1 day ago",
      volume: 892.3,
      weight: 1160,
    },
    {
      id: "3",
      name: "East Terminal Survey",
      status: "draft" as const,
      measurements: 5,
      lastUpdated: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Coal volume and weight estimation overview
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} data-testid="button-new-project">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's Measurements"
          value="48"
          subtitle="of 60 daily target"
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Volume"
          value="1,245.8 m³"
          subtitle="Active projects"
          icon={Scale}
        />
        <MetricCard
          title="Estimated Weight"
          value="1,619.5 MT"
          subtitle="Total inventory"
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

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onClick={() => setLocation(`/measurement/${project.id}`)}
            />
          ))}
        </div>
      </div>

      <CreateProjectDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={(data) => {
          console.log("New project created:", data);
          setLocation("/projects");
        }}
      />
    </div>
  );
}
