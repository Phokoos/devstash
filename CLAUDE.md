# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Project Overview

DevStash is a Next.js 16.2.10 application using React 19, TypeScript, and Tailwind CSS 4. This is a modern Next.js setup
with the App Router architecture.

## Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Next.js App Router Structure

- Uses the App Router (not Pages Router) located in `src/app/`
- `src/app/layout.tsx` - Root layout with Geist font configuration
- `src/app/page.tsx` - Home page component
- Path aliases: `@/*` maps to `./src/*`

### Styling

- Tailwind CSS 4 with PostCSS integration
- Global styles in `src/app/globals.css`
- Uses Geist Sans and Geist Mono fonts via `next/font/google`

### TypeScript Configuration

- Strict mode enabled
- Target: ES2017
- JSX runtime: react-jsx (modern, no React import needed)
- Module resolution: bundler

### ESLint Configuration

- Uses Next.js eslint-config-next with TypeScript support
- Core Web Vitals rules enabled
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Important Notes

- **Next.js Version**: This uses Next.js 16.2.10, which may have breaking changes from earlier versions. Always consult
  `node_modules/next/dist/docs/` for current API documentation before implementing features.
- **Tailwind CSS 4**: Uses the new `@tailwindcss/postcss` plugin instead of traditional `tailwind.config.js`
