# Current Feature

<!-- Feature name -->

## Status

<!-- Not Started|In Progress|Completed -->

## Goals

<!-- Goals & requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI Phase 1: shadcn/ui init, /dashboard route, dark-mode-by-default layout, top bar (search, New Collection, New Item — display only), sidebar/main placeholders, Roboto/Roboto Mono fonts, mobile-responsive top bar and sidebar
- Dashboard UI Phase 2: real collapsible sidebar (shadcn Sidebar block) fed by mock data — item types with /items/[slug] links and counts, favorite/recent collections, user avatar + settings footer, desktop icon-collapse toggle in top bar, mobile drawer via Sheet; fixed useIsMobile hook to use useSyncExternalStore (avoids a React Compiler lint error)
- Dashboard UI Phase 3: main content area — 4 stats cards (items, collections, favorite items, favorite collections), recent collections grid with cards color-coded by their dominant item type, pinned items, and the 10 most recent items; added shadcn card/badge, extracted the item-type icon map to src/lib/item-types.ts (shared with the sidebar), and grew mock data to 12 items so the recent list fills up
- Database setup: Prisma 7 + Neon PostgreSQL — schema from project-overview.md (Auth.js models, ItemType/Item/Collection/ItemCollection/Tag, ContentType enum, indexes, cascade deletes), initial migration applied to the Neon dev branch, seed for the 7 system item types, prisma.config.ts with the datasource URL, PrismaPg driver adapter + HMR-safe client singleton in src/lib/prisma.ts, db:* npm scripts; generated client lives in src/generated (gitignored, rebuilt on postinstall)