// Seeds the demo user, the immutable system item types and sample content.
// Run with `npm run db:seed` (Prisma 7 no longer seeds automatically after
// `migrate dev`). Every write is an upsert, so the script is idempotent.
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma/client";

const BCRYPT_ROUNDS = 12;

const DEMO_USER = {
  id: "user_demo",
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
};

const SYSTEM_ITEM_TYPES = [
  { id: "type_snippet", name: "Snippets", icon: "Code", color: "#3b82f6" },
  { id: "type_prompt", name: "Prompts", icon: "Sparkles", color: "#8b5cf6" },
  { id: "type_command", name: "Commands", icon: "Terminal", color: "#f97316" },
  { id: "type_note", name: "Notes", icon: "StickyNote", color: "#fde047" },
  { id: "type_file", name: "Files", icon: "File", color: "#6b7280" },
  { id: "type_image", name: "Images", icon: "Image", color: "#ec4899" },
  { id: "type_link", name: "Links", icon: "Link", color: "#10b981" },
];

const COLLECTIONS = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
    defaultTypeId: "type_snippet",
  },
  {
    id: "col_ai",
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    isFavorite: true,
    defaultTypeId: "type_prompt",
  },
  {
    id: "col_devops",
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    isFavorite: false,
    defaultTypeId: "type_snippet",
  },
  {
    id: "col_terminal",
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    isFavorite: true,
    defaultTypeId: "type_command",
  },
  {
    id: "col_design",
    name: "Design Resources",
    description: "UI/UX resources and references",
    isFavorite: false,
    defaultTypeId: "type_link",
  },
];

interface SeedItem {
  id: string;
  title: string;
  description: string;
  itemTypeId: string;
  collectionId: string;
  tags: string[];
  content?: string;
  url?: string;
  language?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
}

const ITEMS: SeedItem[] = [
  // ---------- React Patterns ----------
  {
    id: "item_use_debounce",
    title: "useDebounce Hook",
    description: "Delays a rapidly changing value — handy for search inputs",
    itemTypeId: "type_snippet",
    collectionId: "col_react",
    tags: ["react", "hooks", "typescript"],
    language: "ts",
    isFavorite: true,
    isPinned: true,
    content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}`,
  },
  {
    id: "item_use_local_storage",
    title: "useLocalStorage Hook",
    description: "State that survives a reload, synced to localStorage",
    itemTypeId: "type_snippet",
    collectionId: "col_react",
    tags: ["react", "hooks", "typescript"],
    language: "ts",
    content: `import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  const update = useCallback(
    (next: T) => {
      setValue(next);
      window.localStorage.setItem(key, JSON.stringify(next));
    },
    [key]
  );

  return [value, update] as const;
}`,
  },
  {
    id: "item_typed_context",
    title: "Typed Context Provider",
    description: "Context provider with a hook that throws outside the tree",
    itemTypeId: "type_snippet",
    collectionId: "col_react",
    tags: ["react", "context", "typescript"],
    language: "tsx",
    content: `import { createContext, useContext, type ReactNode } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  value,
  children,
}: {
  value: ThemeContextValue;
  children: ReactNode;
}) {
  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}`,
  },

  // ---------- AI Workflows ----------
  {
    id: "item_prompt_code_review",
    title: "Code Review Prompt",
    description: "Reviews a diff for correctness risks, ordered by severity",
    itemTypeId: "type_prompt",
    collectionId: "col_ai",
    tags: ["ai", "review"],
    isPinned: true,
    content: `Review the diff below as a senior engineer on this codebase.

For each finding, give: the file and line, a one-sentence description of the
defect, and a concrete failure scenario (inputs -> wrong result). Order the
findings by severity and skip style nits unless they hide a bug.

Diff:
"""
{{diff}}
"""`,
  },
  {
    id: "item_prompt_docs",
    title: "Documentation Generator",
    description: "Turns a module into reference docs with usage examples",
    itemTypeId: "type_prompt",
    collectionId: "col_ai",
    tags: ["ai", "docs"],
    isFavorite: true,
    content: `Write reference documentation for the module below.

Include: a one-paragraph summary, a table of exported functions with their
parameters and return types, and one runnable usage example per export.
Match the existing docs' tone: terse, no marketing language.

Module:
"""
{{code}}
"""`,
  },
  {
    id: "item_prompt_refactor",
    title: "Refactoring Assistant",
    description: "Proposes refactors without changing observable behaviour",
    itemTypeId: "type_prompt",
    collectionId: "col_ai",
    tags: ["ai", "refactoring"],
    content: `Suggest refactorings for the code below that preserve its observable
behaviour. For each suggestion give the motivation (duplication, unclear
naming, deep nesting, ...), the diff, and the risk of applying it.

Do not introduce new dependencies and do not change the public API.

Code:
"""
{{code}}
"""`,
  },

  // ---------- DevOps ----------
  {
    id: "item_dockerfile_node",
    title: "Multi-stage Node Dockerfile",
    description: "Slim production image for a Next.js standalone build",
    itemTypeId: "type_snippet",
    collectionId: "col_devops",
    tags: ["docker", "nextjs", "ci"],
    language: "dockerfile",
    content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
  },
  {
    id: "item_cmd_deploy",
    title: "Zero-downtime Compose Deploy",
    description: "Pulls the new image and restarts the stack in place",
    itemTypeId: "type_command",
    collectionId: "col_devops",
    tags: ["docker", "deployment"],
    language: "bash",
    content: `docker compose pull && docker compose up -d --remove-orphans && docker image prune -f`,
  },
  {
    id: "item_link_docker_multistage",
    title: "Docker Multi-stage Builds",
    description: "Official guide to multi-stage builds",
    itemTypeId: "type_link",
    collectionId: "col_devops",
    tags: ["docker", "docs"],
    url: "https://docs.docker.com/build/building/multi-stage/",
  },
  {
    id: "item_link_gh_actions",
    title: "GitHub Actions Workflows",
    description: "Workflow syntax and reusable workflow reference",
    itemTypeId: "type_link",
    collectionId: "col_devops",
    tags: ["ci", "docs"],
    url: "https://docs.github.com/en/actions/using-workflows",
  },

  // ---------- Terminal Commands ----------
  {
    id: "item_cmd_undo_commit",
    title: "Undo Last Commit (Keep Changes)",
    description: "Rewinds the commit but leaves the work staged",
    itemTypeId: "type_command",
    collectionId: "col_terminal",
    tags: ["git"],
    language: "bash",
    isFavorite: true,
    content: `git reset --soft HEAD~1`,
  },
  {
    id: "item_cmd_docker_prune",
    title: "Reclaim Docker Disk Space",
    description: "Removes stopped containers, dangling images and unused volumes",
    itemTypeId: "type_command",
    collectionId: "col_terminal",
    tags: ["docker"],
    language: "bash",
    content: `docker system prune --volumes -f`,
  },
  {
    id: "item_cmd_kill_port",
    title: "Kill the Process on a Port",
    description: "Frees a port that a crashed dev server is still holding",
    itemTypeId: "type_command",
    collectionId: "col_terminal",
    tags: ["shell", "process"],
    language: "bash",
    content: `lsof -ti :3000 | xargs kill -9`,
  },
  {
    id: "item_cmd_npm_outdated",
    title: "Audit Outdated Packages",
    description: "Lists outdated dependencies before a version bump",
    itemTypeId: "type_command",
    collectionId: "col_terminal",
    tags: ["npm"],
    language: "bash",
    content: `npm outdated && npm update --save`,
  },

  // ---------- Design Resources ----------
  {
    id: "item_link_tailwind",
    title: "Tailwind CSS Docs",
    description: "Utility class reference and theme configuration",
    itemTypeId: "type_link",
    collectionId: "col_design",
    tags: ["css", "tailwind"],
    isFavorite: true,
    url: "https://tailwindcss.com/docs",
  },
  {
    id: "item_link_shadcn",
    title: "shadcn/ui",
    description: "Accessible component blocks you copy into the project",
    itemTypeId: "type_link",
    collectionId: "col_design",
    tags: ["components", "ui"],
    url: "https://ui.shadcn.com",
  },
  {
    id: "item_link_material",
    title: "Material Design 3",
    description: "Design system guidelines for colour, type and motion",
    itemTypeId: "type_link",
    collectionId: "col_design",
    tags: ["design-system"],
    url: "https://m3.material.io",
  },
  {
    id: "item_link_lucide",
    title: "Lucide Icons",
    description: "The icon set used across DevStash",
    itemTypeId: "type_link",
    collectionId: "col_design",
    tags: ["icons"],
    url: "https://lucide.dev/icons",
  },
];

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_USER.password, BCRYPT_ROUNDS);

  const user = await prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: {
      name: DEMO_USER.name,
      passwordHash,
      emailVerified: new Date(),
      isPro: false,
    },
    create: {
      id: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      passwordHash,
      emailVerified: new Date(),
      isPro: false,
    },
  });

  // Upsert by id: the @@unique([userId, name]) constraint can't dedupe system
  // types because Postgres treats every NULL userId as distinct.
  for (const type of SYSTEM_ITEM_TYPES) {
    await prisma.itemType.upsert({
      where: { id: type.id },
      update: { name: type.name, icon: type.icon, color: type.color },
      create: { ...type, isSystem: true },
    });
  }

  for (const collection of COLLECTIONS) {
    await prisma.collection.upsert({
      where: { id: collection.id },
      update: { ...collection, userId: user.id },
      create: { ...collection, userId: user.id },
    });
  }

  for (const item of ITEMS) {
    const data = {
      title: item.title,
      description: item.description,
      contentType: item.url ? ("URL" as const) : ("TEXT" as const),
      content: item.content ?? null,
      url: item.url ?? null,
      language: item.language ?? null,
      isFavorite: item.isFavorite ?? false,
      isPinned: item.isPinned ?? false,
      lastUsedAt: new Date(),
      itemTypeId: item.itemTypeId,
      userId: user.id,
      tags: {
        connectOrCreate: item.tags.map((name) => ({
          where: { userId_name: { userId: user.id, name } },
          create: { name, userId: user.id },
        })),
      },
      collections: {
        connectOrCreate: [
          {
            where: {
              itemId_collectionId: {
                itemId: item.id,
                collectionId: item.collectionId,
              },
            },
            create: { collectionId: item.collectionId },
          },
        ],
      },
    };

    await prisma.item.upsert({
      where: { id: item.id },
      update: data,
      create: { id: item.id, ...data },
    });
  }

  console.log(
    `Seeded ${SYSTEM_ITEM_TYPES.length} system item types, ` +
      `${COLLECTIONS.length} collections and ${ITEMS.length} items ` +
      `for ${DEMO_USER.email}.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
