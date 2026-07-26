# Current Feature

Dashboard UI Phase 2

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

This is phase 2 of 3 for the dashboard UI layout. Use the screenshot referenced below for how it should look. Use the data from the mock data file referenced below. Just import it directly for now until we implement a database.

- Collapsible sidebar
- Items/types with links to /items/TYPE (eg.items/snippets)
- Favorite collections
- Most recent collections
- User avatar area at the bottom
- Drawer icon to open/close sidebar
- Always a drawer on mobile view

## Notes

<!-- Any extra notes -->

References:

- @context/screenshots/dashboard-ui-main.png
- @context/project-overview.md
- @src/lib/mock-data.ts
- @context/features/dashboard-phase-1-spec.md
- @context/features/dashboard-phase-3-spec.md

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI Phase 1: shadcn/ui init, /dashboard route, dark-mode-by-default layout, top bar (search, New Collection, New Item — display only), sidebar/main placeholders, Roboto/Roboto Mono fonts, mobile-responsive top bar and sidebar
- Dashboard UI Phase 2: real collapsible sidebar (shadcn Sidebar block) fed by mock data — item types with /items/[slug] links and counts, favorite/recent collections, user avatar + settings footer, desktop icon-collapse toggle in top bar, mobile drawer via Sheet; fixed useIsMobile hook to use useSyncExternalStore (avoids a React Compiler lint error)
