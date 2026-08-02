import Link from "next/link";
import { Folder, Settings, Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { typeIcons } from "@/lib/item-types";
import { collections, currentUser, itemTypes } from "@/lib/mock-data";

const favoriteCollections = collections.filter((c) => c.isFavorite);
const recentCollections = collections.filter((c) => !c.isFavorite);

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      style={{ top: "3.5rem", height: "calc(100svh - 3.5rem)" }}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Types</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemTypes.map((type) => {
                const Icon = typeIcons[type.icon];
                return (
                  <SidebarMenuItem key={type.id}>
                    <SidebarMenuButton
                      tooltip={type.name}
                      render={
                        <Link href={`/items/${type.slug}`}>
                          <Icon style={{ color: type.color }} />
                          <span>{type.name}</span>
                        </Link>
                      }
                    />
                    <SidebarMenuBadge>{type.itemCount}</SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Collections</SidebarGroupLabel>
          <SidebarGroupContent>
            {favoriteCollections.length > 0 && (
              <>
                <p className="px-2 pt-1 pb-1 text-xs text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
                  Favorites
                </p>
                <SidebarMenu>
                  {favoriteCollections.map((collection) => (
                    <SidebarMenuItem key={collection.id}>
                      <SidebarMenuButton
                        tooltip={collection.name}
                        render={
                          <Link href={`/collections/${collection.id}`}>
                            <Star className="fill-yellow-400 text-yellow-400" />
                            <span>{collection.name}</span>
                          </Link>
                        }
                      />
                      <SidebarMenuBadge>{collection.itemCount}</SidebarMenuBadge>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </>
            )}

            <p className="px-2 pt-2 pb-1 text-xs text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
              Recent
            </p>
            <SidebarMenu>
              {recentCollections.map((collection) => (
                <SidebarMenuItem key={collection.id}>
                  <SidebarMenuButton
                    tooltip={collection.name}
                    render={
                      <Link href={`/collections/${collection.id}`}>
                        <Folder />
                        <span>{collection.name}</span>
                      </Link>
                    }
                  />
                  <SidebarMenuBadge>{collection.itemCount}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton size="lg" tooltip={currentUser.name} className="flex-1">
              <Avatar size="sm">
                <AvatarFallback>{initials(currentUser.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden text-left">
                <span className="truncate text-sm font-medium">
                  {currentUser.name}
                </span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  {currentUser.email}
                </span>
              </div>
            </SidebarMenuButton>
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0 group-data-[collapsible=icon]:hidden"
            >
              <Settings />
              <span className="sr-only">Settings</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}