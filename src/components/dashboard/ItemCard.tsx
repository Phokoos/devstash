import Link from "next/link";
import { Pin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getItemType, typeIcons } from "@/lib/item-types";
import type { Item } from "@/lib/mock-data";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formats an ISO date (YYYY-MM-DD) as "Jan 15" without going through the
 * Date constructor, so server and client render the same string.
 */
function formatDate(isoDate: string): string {
  const [, month, day] = isoDate.split("-");
  return `${MONTHS[Number(month) - 1]} ${Number(day)}`;
}

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const type = getItemType(item.itemTypeId);
  const color = type?.color ?? "var(--border)";
  const Icon = typeIcons[type?.icon ?? "File"];

  return (
    <Card
      size="sm"
      className="relative border-l-4 transition-colors hover:bg-muted/40"
      style={{ borderLeftColor: color }}
    >
      <CardContent className="flex items-start gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${type?.color ?? "#6b7280"}1a`, color }}
        >
          <Icon className="size-4" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Link
              href={`/items/${item.id}`}
              className="truncate font-medium after:absolute after:inset-0"
            >
              {item.title}
            </Link>
            {item.isPinned && (
              <Pin className="size-3.5 shrink-0 text-muted-foreground" />
            )}
            {item.isFavorite && (
              <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
            )}
          </div>

          {item.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {item.description}
            </p>
          )}

          {item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <span className="shrink-0 text-xs text-muted-foreground">
          {formatDate(item.lastUsedAt ?? item.createdAt)}
        </span>
      </CardContent>
    </Card>
  );
}
