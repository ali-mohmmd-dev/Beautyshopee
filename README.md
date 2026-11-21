# Beauty Shoppee Tirur

A cosmetics storefront built with Next.js App Router, TypeScript, and Tailwind CSS.

## Local development

Use Node.js 22.13 or later and pnpm 12.15.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

| Command          | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| `pnpm lint`      | Check source code with ESLint                     |
| `pnpm typecheck` | Generate Next.js route types and check TypeScript |
| `pnpm test`      | Run the storefront tests                          |
| `pnpm build`     | Build for production                              |
| `pnpm start`     | Serve the production build                        |

## Project structure

| Directory                 | Responsibility                                                  |
| ------------------------- | --------------------------------------------------------------- |
| `src/app`                 | Routes, layouts, metadata, error boundaries, and global styles  |
| `src/features/storefront` | Storefront sections, catalog, store information, and shop state |
| `src/components/ui`       | Shared UI primitives                                            |
| `src/hooks` and `src/lib` | Shared hooks and utilities                                      |
| `src/assets` and `public` | Imported storefront images and publicly served files            |
| `src/test`                | Vitest setup and storefront tests                               |

Add routes under `src/app` and put feature-specific logic under `src/features`. The homepage composes storefront sections, with client components for search, cart, wishlist, and the newsletter form. Checkout and newsletter submissions are local UI flows.

## Deployment

Use a host with Next.js support and run `pnpm build` before serving the app. The project originated in [Lovable](https://lovable.dev/projects/44400564-9751-4cec-9593-4203f65aee58). Lovable hosting compatibility is unverified.
# Beautyshopee

## Published CMS cache

Published records are cached across requests for 60 seconds with the `cms-published` tag. Draft preview reads bypass this cache. Configure the same server-only `CMS_CONTENT_TOKEN` in the CMS and storefront, and set the CMS `STOREFRONT_URL` to this deployed storefront. After committing a publish or unpublish, the CMS calls `POST /api/cms-revalidate` with a bearer token. This immediately expires the content cache and invalidates storefront paths; the next server request loads fresh data. Already open tabs update on reload. If delivery fails, the CMS displays a warning; publishing again retries delivery, and the time-based cache expiry is a fallback (the first request after expiry can receive stale content while it refreshes). Never prefix this token with `NEXT_PUBLIC_`.

## Shop by concern

Manage concern names, descriptions, images and SEO under **Shop by concern** in the CMS. Assign one or more concerns in each product editor. Publish the concerns before publishing linked products. **Navigation & footer → Shop by concern — homepage** controls section heading, intro, visibility, selected concerns and slider order. An empty selection includes all eligible concerns. Only enabled concerns with published assigned products appear on the homepage. Each published enabled concern has a `/concerns/[slug]` page; empty pages display a browse-all link. Hidden concerns are excluded from public pages and the sitemap. Draft preview can still open them. Publishing uses the existing cache refresh; no per-concern database requests are added.
