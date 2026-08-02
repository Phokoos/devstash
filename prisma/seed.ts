// Seeds the immutable system item types. Run with `npm run db:seed`
// (Prisma 7 no longer seeds automatically after `migrate dev`).
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

const SYSTEM_ITEM_TYPES = [
  { id: "type_snippet", name: "Snippets", icon: "Code", color: "#3b82f6" },
  { id: "type_prompt", name: "Prompts", icon: "Sparkles", color: "#8b5cf6" },
  { id: "type_command", name: "Commands", icon: "Terminal", color: "#f97316" },
  { id: "type_note", name: "Notes", icon: "StickyNote", color: "#fde047" },
  { id: "type_file", name: "Files", icon: "File", color: "#6b7280" },
  { id: "type_image", name: "Images", icon: "Image", color: "#ec4899" },
  { id: "type_link", name: "Links", icon: "Link", color: "#10b981" },
];

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  // Upsert by id: the @@unique([userId, name]) constraint can't dedupe system
  // types because Postgres treats every NULL userId as distinct.
  for (const type of SYSTEM_ITEM_TYPES) {
    await prisma.itemType.upsert({
      where: { id: type.id },
      update: { name: type.name, icon: type.icon, color: type.color },
      create: { ...type, isSystem: true },
    });
  }

  console.log(`Seeded ${SYSTEM_ITEM_TYPES.length} system item types.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
