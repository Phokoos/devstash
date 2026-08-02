// Prisma 7 moved CLI configuration out of schema.prisma into this file.
// The datasource URL lives here (not in the schema's datasource block), and
// env vars are no longer loaded automatically — hence "dotenv/config".
import "dotenv/config";

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
