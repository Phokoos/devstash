import Link from "next/link";
import { Clock, Pin } from "lucide-react";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { collections, type Item, items } from "@/lib/mock-data";

const RECENT_COLLECTIONS_LIMIT = 6;
const RECENT_ITEMS_LIMIT = 10;

function usedAt(item: Item): string {
  return item.lastUsedAt ?? item.createdAt;
}

const recentCollections = collections.slice(0, RECENT_COLLECTIONS_LIMIT);
const pinnedItems = items.filter((item) => item.isPinned);
const recentItems = [...items]
  .sort((a, b) => usedAt(b).localeCompare(usedAt(a)))
  .slice(0, RECENT_ITEMS_LIMIT);

export function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Your developer knowledge hub</p>
        </div>

        <StatsCards />

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-heading text-xl font-semibold">
              Recent Collections
            </h2>
            <Link
              href="/collections"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>

        {pinnedItems.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Pin className="size-4" />
              Pinned
            </h2>
            <div className="flex flex-col gap-3">
              {pinnedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock className="size-4" />
            Recent Items
          </h2>
          <div className="flex flex-col gap-3">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
