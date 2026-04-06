# CogniPost Frontend — Sprint Plan

> Frontend: Next.js 14+ (App Router) | TypeScript | Tailwind CSS + shadcn/ui | Native fetch | HttpOnly cookies

---

## Architecture

```
Frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (main)/                   # Main route group
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── articles/
│   │   ├── search/
│   │   ├── tags/
│   │   └── popular/
│   ├── (dashboard)/              # Authenticated routes
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── my-articles/
│   │   ├── edit/
│   │   ├── feed/
│   │   └── settings/
│   ├── api/auth/                 # Cookie proxy routes
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # navbar, footer, sidebar
│   ├── articles/                 # article cards, editor, list
│   ├── comments/                 # comment forms, threads
│   ├── auth/                     # login/signup forms
│   └── shared/                   # buttons, badges, utilities
├── lib/                          # api.ts, utils.ts, constants.ts
├── services/                     # auth, article, comment, user, etc.
├── context/                      # auth.context.tsx
├── hooks/                        # use-auth, use-articles, etc.
├── types/                        # TypeScript interfaces
├── middleware.ts                 # Route protection
└── config files                  # next.config, tailwind, etc.
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14+ (App Router, SSR) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **State** | React Context + hooks |
| **Data Fetching** | Native `fetch` (no Axios) |
| **Validation** | Zod |
| **Forms** | React Hook Form + Zod resolver |
| **Markdown** | react-markdown + remark-gfm |
| **Date Formatting** | date-fns |

## Auth Strategy

- **HttpOnly cookies** — Next.js API routes proxy auth calls to backend, set secure cookies
- **Client never sees tokens** — XSS-proof auth
- **Middleware** — Route protection via `middleware.ts`
- **Token refresh** — Automatic refresh via API route before expiry

## Data Fetching Strategy

- **Server Components (SSR)** — Default for all read pages with ISR caching
- **Client Components** — For mutations (like, bookmark, comment, form submissions)
- **Native fetch** — Simple wrapper in `lib/api.ts`, no Axios
- **API Routes** — Proxy for auth endpoints to set httpOnly cookies

---

## Sprint 1: Foundation & Setup

**Goal:** Initialize project, configure dependencies, establish structure.

| # | Task | Details | Status |
|---|------|---------|--------|
| 1.1 | Initialize Next.js project | `npx create-next-app@latest` with TypeScript, Tailwind, App Router, src dir | ✅ 2026-04-05 |
| 1.2 | Install dependencies | shadcn/ui, react-hook-form, zod, react-markdown, remark-gfm, date-fns, lucide-react | ✅ 2026-04-05 |
| 1.3 | Configure shadcn/ui | `npx shadcn@latest init`, add core components | ✅ 2026-04-05 |
| 1.4 | Set up project structure | Create all directories (app, components, lib, services, context, hooks, types) | ✅ 2026-04-05 |
| 1.5 | Define TypeScript types | Mirror all backend DTOs (ApiResponse, PageResponse, ArticleResponse, etc.) | ✅ 2026-04-05 |
| 1.6 | Create API base URL config | `.env.local` with `NEXT_PUBLIC_API_URL`, `lib/constants.ts` | ✅ 2026-04-05 |
| 1.7 | Build `lib/api.ts` | Generic fetch wrapper with error handling, auth headers, response unwrapping | ✅ 2026-04-05 |
| 1.8 | Root layout & metadata | Fonts, theme, global metadata, providers | ✅ 2026-04-05 |

---

## Sprint 2: Authentication System

**Goal:** Full auth flow with httpOnly cookies, protected routes.

| # | Task | Details | Status |
|---|------|---------|--------|
| 2.1 | Create `api/auth/login` route | POST: call backend, set httpOnly cookies | ✅ 2026-04-05 |
| 2.2 | Create `api/auth/logout` route | POST: call backend, clear cookies | ✅ 2026-04-05 |
| 2.3 | Create `api/auth/refresh` route | POST: call backend, rotate cookies | ✅ 2026-04-05 |
| 2.4 | Create `api/auth/me` route | GET: validate cookie, return current user | ✅ 2026-04-05 |
| 2.5 | Build `auth.context.tsx` | AuthContext with user, isLoading, login(), logout(), refreshSession() | ✅ 2026-04-05 |
| 2.6 | Create `use-auth.ts` hook | Typed hook to consume AuthContext (exported from auth.context.tsx) | ✅ 2026-04-06 |
| 2.7 | Build login page | Form with react-hook-form + Zod validation | ✅ 2026-04-05 |
| 2.8 | Build signup page | Form with validation, auto-login after signup | ✅ 2026-04-05 |
| 2.9 | Create `middleware.ts` | Route protection: redirect unauthenticated/authenticated | ✅ 2026-04-05 |
| 2.10 | Navbar with auth state | Show login/signup or user menu based on auth | ✅ 2026-04-05 |

---

## Sprint 3: Articles (Read)

**Goal:** Browse, view, and paginate published articles.

| # | Task | Details | Status |
|---|------|---------|--------|
| 3.1 | Build `article.service.ts` | getArticles(), getArticleBySlug(), getPopularArticles() | ✅ 2026-04-06 |
| 3.2 | Home page | SSR: fetch published articles, display as cards | ✅ 2026-04-06 |
| 3.3 | Article list page | Paginated list with sorting options | ✅ 2026-04-06 |
| 3.4 | Article detail page | SSR: fetch by slug, render markdown body, metadata | ✅ 2026-04-06 |
| 3.5 | Article card component | Reusable preview with title, author, tags, stats | ✅ 2026-04-06 |
| 3.6 | Pagination component | Reusable page navigation | ✅ 2026-04-06 |
| 3.7 | Popular articles page | SSR: fetch and display | ✅ 2026-04-06 |
| 3.8 | Loading skeletons | Suspense boundaries with skeleton UI | ✅ 2026-04-06 |
| 3.9 | Error boundaries | Graceful error states | ✅ 2026-04-06 |

---

## Sprint 4: Tags & Search

**Goal:** Browse tags, search articles.

| # | Task | Details | Status |
|---|------|---------|--------|
| 4.1 | Build `tag.service.ts` | getAllTags(), getTagBySlug() | ✅ 2026-04-06 |
| 4.2 | Tags listing page | Display all tags as badges/cards | ✅ 2026-04-06 |
| 4.3 | Tag detail page | Articles filtered by tag | ✅ 2026-04-06 |
| 4.4 | Search page | Query params: q, tag, author — SSR results | ✅ 2026-04-06 |
| 4.5 | Search bar component | Navbar search with debounced navigation | ✅ 2026-04-06 |
| 4.6 | Tag badges on articles | Clickable tags navigating to tag pages | ✅ 2026-04-06 |

---

## Sprint 5: Comments

**Goal:** Full comment system with nested replies.

| # | Task | Details | Status |
|---|------|---------|--------|
| 5.1 | Build `comment.service.ts` | getComments(), createComment(), createReply(), deleteComment() | ✅ 2026-04-06 |
| 5.2 | Comment thread component | Nested comments with recursive rendering | ✅ 2026-04-06 |
| 5.3 | Comment form | Authenticated users only, validation | ✅ 2026-04-06 |
| 5.4 | Reply functionality | Nested reply form, toggle visibility | ✅ 2026-04-06 |
| 5.5 | Delete comment | Owner-only, confirmation dialog | ✅ 2026-04-06 |
| 5.6 | Comment count on articles | Display in article header and cards | ✅ 2026-04-06 |

---

## Sprint 6: Social Interactions

**Goal:** Likes, bookmarks, follow system.

| # | Task | Details | Status |
|---|------|---------|--------|
| 6.1 | Build `interaction.service.ts` | toggleLike(), toggleBookmark() | ✅ 2026-04-06 |
| 6.2 | Like button component | Toggle with optimistic update, count | ✅ 2026-04-06 |
| 6.3 | Bookmark button component | Toggle with optimistic update | ✅ 2026-04-06 |
| 6.4 | Build `follow.service.ts` | toggleFollow() | ✅ 2026-04-06 |
| 6.5 | Follow button component | On user profiles, follower count | ✅ 2026-04-06 |
| 6.6 | Auth-gated interactions | Redirect to login if unauthenticated | ✅ 2026-04-06 |

---

## Sprint 7: Article Creation & Editing

**Goal:** Create, edit, delete articles with markdown.

| # | Task | Details | Status |
|---|------|---------|--------|
| 7.1 | Create article page | Markdown editor with live preview | ✅ 2026-04-06 |
| 7.2 | Article form | Title, subtitle, body, tags input | ✅ 2026-04-06 |
| 7.3 | Create article service call | POST to backend, handle draft | ✅ 2026-04-06 |
| 7.4 | Edit article page | Pre-fill form with existing data | ✅ 2026-04-06 |
| 7.5 | Update article service call | PUT to backend, owner-only | ✅ 2026-04-06 |
| 7.6 | Delete article | Confirmation dialog, redirect | ✅ 2026-04-06 |
| 7.7 | Tag input component | Multi-select with autocomplete | ✅ 2026-04-06 |

---

## Sprint 8: Dashboard & Feed

**Goal:** Author dashboard, personalized feed.

| # | Task | Details | Status |
|---|------|---------|--------|
| 8.1 | Dashboard layout | Sidebar navigation, protected route | ✅ 2026-04-06 |
| 8.2 | Author stats page | SSR: fetch /users/me/stats, display metrics | ✅ 2026-04-06 |
| 8.3 | My articles page | Paginated list including drafts | ✅ 2026-04-06 |
| 8.4 | Personalized feed page | SSR: fetch /feed | ✅ 2026-04-06 |
| 8.5 | Settings page | Profile update form (bio, image) | ✅ 2026-04-06 |

---

## Sprint 9: Polish & UX

**Goal:** Final touches, responsive design, SEO.

| # | Task | Details | Status |
|---|------|---------|--------|
| 9.1 | Toast notifications | Success/error toasts for mutations | ✅ 2026-04-06 |
| 9.2 | Loading states | Suspense + skeletons throughout | ✅ 2026-04-06 |
| 9.3 | 404 page | Custom not-found with navigation | ✅ 2026-04-06 |
| 9.4 | Error page | Custom error boundary with retry | ✅ 2026-04-06 |
| 9.5 | Responsive design | Mobile-first, all breakpoints | ✅ 2026-04-06 |
| 9.6 | SEO metadata | Dynamic OpenGraph, structured data | ✅ 2026-04-06 |
| 9.7 | Reading time display | On cards and detail pages | ✅ 2026-04-06 |
| 9.8 | Relative timestamps | "2 hours ago" format | ✅ 2026-04-06 |
