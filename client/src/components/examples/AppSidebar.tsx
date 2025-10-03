import { AppSidebar } from "../AppSidebar";
import { ThemeProvider } from "../ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar onNewProject={() => console.log("New project clicked")} />
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold">Main Content Area</h1>
            <p className="text-muted-foreground mt-2">
              This is where the main content would be displayed.
            </p>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
