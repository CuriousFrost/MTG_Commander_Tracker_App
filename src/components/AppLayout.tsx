import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import { Toaster } from "sonner";
import { AchievementUnlockNotifications } from "@/components/progression/AchievementUnlockNotifications";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useIsSmallDevice, useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// BeforeInstallPromptEvent is not in the standard TS lib
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AppLayoutInner />
      <AchievementUnlockNotifications />
      <Toaster richColors position="bottom-center" />
    </SidebarProvider>
  );
}

function AppLayoutInner() {
  const location = useLocation();
  const isSmallDevice = useIsSmallDevice();
  const isMobile = useIsMobile();
  const isLifeCounter = location.pathname === "/life-counter";
  const isFullscreen = isLifeCounter && isSmallDevice;

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const isStandalone =
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    function handler(e: Event) {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setInstallPrompt(null);
  }

  const showInstallButton = !isStandalone && isMobile && installPrompt !== null;

  if (isFullscreen) {
    return (
      <main className="h-svh w-full overflow-hidden">
        <Outlet />
      </main>
    );
  }

  return (
    // The life counter is a fixed-height board rather than a scrolling page, so
    // it gets an exact-viewport shell and no page padding to lay seats out in.
    <SidebarInset className={cn("min-w-0", isLifeCounter && "h-svh overflow-hidden")}>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <span className="text-sm font-medium text-muted-foreground">Seasons Past</span>
        {showInstallButton && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-xs"
            onClick={handleInstall}
          >
            <Download className="h-3.5 w-3.5" />
            Add to Home Screen
          </Button>
        )}
      </header>
      <main
        className={cn(
          "flex-1 min-w-0",
          isLifeCounter ? "min-h-0 overflow-hidden p-1" : "px-3 py-4 sm:p-6",
        )}
      >
        <Outlet />
      </main>
    </SidebarInset>
  );
}
