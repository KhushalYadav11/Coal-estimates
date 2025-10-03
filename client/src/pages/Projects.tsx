import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { useLocation } from "wouter";

export default function Projects() {
  const [, setLocation] = useLocation();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //todo: remove mock functionality - replace with real data
  const allProjects = [
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
    {
      id: "4",
      name: "West Loading Area",
      status: "completed" as const,
      measurements: 55,
      lastUpdated: "1 week ago",
      volume: 2134.5,
      weight: 2774.85,
    },
    {
      id: "5",
      name: "Central Hub Analysis",
      status: "processing" as const,
      measurements: 28,
      lastUpdated: "2 days ago",
      volume: 756.2,
      weight: 983.06,
    },
    {
      id: "6",
      name: "Backup Storage Evaluation",
      status: "draft" as const,
      measurements: 12,
      lastUpdated: "5 days ago",
    },
  ];

  const filteredProjects = allProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage all coal pile assessment projects
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} data-testid="button-new-project">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
          data-testid="input-search-projects"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onClick={() => setLocation(`/measurement/${project.id}`)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your search.</p>
        </div>
      )}

      <CreateProjectDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={(data) => {
          console.log("New project created:", data);
        }}
      />
    </div>
  );
}
