import { ProjectCard } from "../ProjectCard";
import { ThemeProvider } from "../ThemeProvider";

export default function ProjectCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          id="1"
          name="South Stockpile Assessment"
          status="completed"
          measurements={48}
          lastUpdated="2 hours ago"
          volume={1245.8}
          weight={1619.54}
          onClick={() => console.log("Project clicked")}
        />
        <ProjectCard
          id="2"
          name="North Yard Inventory"
          status="processing"
          measurements={32}
          lastUpdated="1 day ago"
          volume={892.3}
          weight={1160}
          onClick={() => console.log("Project clicked")}
        />
        <ProjectCard
          id="3"
          name="East Terminal Survey"
          status="draft"
          measurements={5}
          lastUpdated="3 days ago"
          onClick={() => console.log("Project clicked")}
        />
      </div>
    </ThemeProvider>
  );
}
