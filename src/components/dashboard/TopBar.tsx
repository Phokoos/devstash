import { FolderPlus, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3 sm:gap-4 sm:px-4">
      <span className="text-lg font-semibold">DevStash</span>
      <SidebarTrigger />
      <div className="relative min-w-0 flex-1 sm:max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search items..." className="pl-8" />
      </div>
      <Button variant="outline">
        <FolderPlus />
        <span className="hidden sm:inline">New Collection</span>
      </Button>
      <Button>
        <Plus />
        <span className="hidden sm:inline">New Item</span>
      </Button>
    </header>
  );
}
