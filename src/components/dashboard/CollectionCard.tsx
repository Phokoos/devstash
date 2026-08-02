import Link from "next/link";
import { Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getItemType, typeIcons } from "@/lib/item-types";
import { type Collection, items } from "@/lib/mock-data";

interface CollectionCardProps {
  collection: Collection;
}

/** Type ids present in a collection, most frequent first. */
function typeIdsByFrequency(collectionId: string): string[] {
  const counts = new Map<string, number>();

  for (const item of items) {
    if (!item.collectionIds.includes(collectionId)) continue;
    counts.set(item.itemTypeId, (counts.get(item.itemTypeId) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([typeId]) => typeId);
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const typeIds = typeIdsByFrequency(collection.id);
  const dominantType = typeIds.length > 0 ? getItemType(typeIds[0]) : undefined;

  return (
    <Card
      size="sm"
      className="relative border-l-4 transition-colors hover:bg-muted/40"
      style={{ borderLeftColor: dominantType?.color ?? "var(--border)" }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          <Link
            href={`/collections/${collection.id}`}
            className="truncate after:absolute after:inset-0"
          >
            {collection.name}
          </Link>
          {collection.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {collection.itemCount} items
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {collection.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {collection.description}
          </p>
        )}
        <div className="flex items-center gap-2">
          {typeIds.map((typeId) => {
            const type = getItemType(typeId);
            if (!type) return null;
            const Icon = typeIcons[type.icon];
            return (
              <Icon
                key={typeId}
                aria-label={type.name}
                className="size-4"
                style={{ color: type.color }}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
