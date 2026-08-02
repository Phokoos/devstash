// Mock data source for the dashboard UI.
// Replace with real Prisma queries once the database is wired up.

export type ContentType = "TEXT" | "URL" | "FILE";

export interface ItemType {
  id: string;
  name: string;
  slug: string; // used for /items/[slug] routes
  icon: string; // lucide-react icon name
  color: string; // hex color for borders/backgrounds
  isSystem: boolean;
  itemCount: number; // shown in the sidebar
}

export interface Item {
  id: string;
  title: string;
  description?: string;
  contentType: ContentType;
  content?: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  language?: string;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: string;
  lastUsedAt?: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  isFavorite: boolean;
  itemCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  isPro: boolean;
}

export const currentUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  isPro: false,
};

export const itemTypes: ItemType[] = [
  { id: "type_snippet", name: "Snippets", slug: "snippets", icon: "Code", color: "#3b82f6", isSystem: true, itemCount: 24 },
  { id: "type_prompt", name: "Prompts", slug: "prompts", icon: "Sparkles", color: "#8b5cf6", isSystem: true, itemCount: 18 },
  { id: "type_command", name: "Commands", slug: "commands", icon: "Terminal", color: "#f97316", isSystem: true, itemCount: 15 },
  { id: "type_note", name: "Notes", slug: "notes", icon: "StickyNote", color: "#fde047", isSystem: true, itemCount: 12 },
  { id: "type_file", name: "Files", slug: "files", icon: "File", color: "#6b7280", isSystem: true, itemCount: 5 },
  { id: "type_image", name: "Images", slug: "images", icon: "Image", color: "#ec4899", isSystem: true, itemCount: 3 },
  { id: "type_link", name: "Links", slug: "links", icon: "Link", color: "#10b981", isSystem: true, itemCount: 8 },
];

export const collections: Collection[] = [
  { id: "col_react", name: "React Patterns", description: "Common React patterns and hooks", isFavorite: true, itemCount: 12 },
  { id: "col_python", name: "Python Snippets", description: "Useful Python code snippets", isFavorite: false, itemCount: 8 },
  { id: "col_context", name: "Context Files", description: "AI context files for projects", isFavorite: true, itemCount: 5 },
  { id: "col_interview", name: "Interview Prep", description: "Technical interview preparation", isFavorite: false, itemCount: 24 },
  { id: "col_git", name: "Git Commands", description: "Frequently used git commands", isFavorite: true, itemCount: 15 },
  { id: "col_ai_prompts", name: "AI Prompts", description: "Curated AI prompts for coding", isFavorite: false, itemCount: 18 },
];

export const items: Item[] = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "TEXT",
    content: "export function useAuth() { /* ... */ }",
    language: "tsx",
    itemTypeId: "type_snippet",
    collectionIds: ["col_react"],
    tags: ["react", "auth", "hooks"],
    isFavorite: true,
    isPinned: true,
    createdAt: "2026-01-15",
    lastUsedAt: "2026-01-15",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "TEXT",
    content: "async function fetchWithRetry(url: string) { /* ... */ }",
    language: "ts",
    itemTypeId: "type_snippet",
    collectionIds: ["col_react", "col_interview"],
    tags: ["fetch", "error-handling"],
    isFavorite: false,
    isPinned: true,
    createdAt: "2026-01-12",
    lastUsedAt: "2026-01-12",
  },
  {
    id: "item_3",
    title: "Explain Big-O Complexity",
    description: "Prompt for explaining algorithm complexity simply",
    contentType: "TEXT",
    content: "Explain the time and space complexity of this function in simple terms:",
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai_prompts", "col_interview"],
    tags: ["ai", "algorithms"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-10",
  },
  {
    id: "item_4",
    title: "Undo Last Commit",
    description: "Keep changes staged after undoing the last commit",
    contentType: "TEXT",
    content: "git reset --soft HEAD~1",
    language: "bash",
    itemTypeId: "type_command",
    collectionIds: ["col_git"],
    tags: ["git"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-01-08",
  },
  {
    id: "item_5",
    title: "List Comprehension Cheatsheet",
    description: "Common Python list comprehension patterns",
    contentType: "TEXT",
    content: "squares = [x**2 for x in range(10)]",
    language: "python",
    itemTypeId: "type_snippet",
    collectionIds: ["col_python"],
    tags: ["python"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-05",
  },
  {
    id: "item_6",
    title: "Project Architecture Overview",
    description: "System context file for AI pair programming",
    contentType: "FILE",
    fileUrl: "/files/architecture-overview.md",
    fileName: "architecture-overview.md",
    itemTypeId: "type_file",
    collectionIds: ["col_context"],
    tags: ["architecture", "ai-context"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-03",
  },
  {
    id: "item_7",
    title: "Meeting Notes: Sprint Planning",
    description: "Notes from the sprint planning session",
    contentType: "TEXT",
    content: "- Prioritize search feature\n- Discuss AI tagging rollout",
    itemTypeId: "type_note",
    collectionIds: [],
    tags: ["meeting"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-02",
  },
  {
    id: "item_8",
    title: "Next.js Docs",
    description: "Official Next.js documentation",
    contentType: "URL",
    url: "https://nextjs.org/docs",
    itemTypeId: "type_link",
    collectionIds: ["col_interview"],
    tags: ["docs", "nextjs"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2025-12-28",
  },
  {
    id: "item_9",
    title: "Rebase Onto Main",
    description: "Replay the current branch on top of an updated main",
    contentType: "TEXT",
    content: "git fetch origin && git rebase origin/main",
    language: "bash",
    itemTypeId: "type_command",
    collectionIds: ["col_git"],
    tags: ["git", "rebase"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2025-12-22",
  },
  {
    id: "item_10",
    title: "Code Review Assistant",
    description: "Prompt that reviews a diff for bugs and edge cases",
    contentType: "TEXT",
    content: "Review this diff and list correctness risks, ordered by severity:",
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai_prompts"],
    tags: ["ai", "review"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2025-12-18",
  },
  {
    id: "item_11",
    title: "Dashboard Layout Reference",
    description: "Screenshot of the target dashboard layout",
    contentType: "FILE",
    fileUrl: "/files/dashboard-layout.png",
    fileName: "dashboard-layout.png",
    itemTypeId: "type_image",
    collectionIds: ["col_context"],
    tags: ["ui", "reference"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2025-12-14",
  },
  {
    id: "item_12",
    title: "Debounce Utility",
    description: "Tiny typed debounce helper without external deps",
    contentType: "TEXT",
    content: "export function debounce<T extends unknown[]>(fn: (...args: T) => void, ms: number) { /* ... */ }",
    language: "ts",
    itemTypeId: "type_snippet",
    collectionIds: ["col_react"],
    tags: ["typescript", "utils"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2025-12-09",
  },
];