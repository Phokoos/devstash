// Single lookup point for item-type metadata (icon component + colors).
// Mirrors the ItemType rows that will be seeded in the database.

import {
  Code,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
  type LucideIcon,
  Sparkles,
  StickyNote,
  Terminal,
} from "lucide-react";

import { type ItemType, itemTypes } from "@/lib/mock-data";

export const typeIcons: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

export function getItemType(itemTypeId: string): ItemType | undefined {
  return itemTypes.find((type) => type.id === itemTypeId);
}