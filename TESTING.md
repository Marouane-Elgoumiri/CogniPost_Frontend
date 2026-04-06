# CogniPost Frontend Testing Documentation

> **Testing Strategy:** Unit Tests, Integration Tests, Smoke Tests, API Tests, SSR Tests, and E2E Tests
> 
> **Testing Stack:** Vitest, React Testing Library, MSW (Mock Service Worker), Playwright

---

## Table of Contents

1. [Overview](#overview)
2. [Testing Stack](#testing-stack)
3. [Test Categories](#test-categories)
4. [Project Structure](#project-structure)
5. [Running Tests](#running-tests)
6. [Writing Tests](#writing-tests)
7. [Test Coverage](#test-coverage)
8. [MSW Mock Handlers](#msw-mock-handlers)
9. [Test Registry](#test-registry)
10. [Best Practices](#best-practices)

---

## Overview

The CogniPost Frontend testing strategy ensures code quality, reliability, and maintainability through comprehensive testing at multiple levels:

- **Unit Tests:** Test individual functions, utilities, and hooks in isolation
- **Integration Tests:** Test components with their dependencies, context providers, and API interactions
- **Smoke Tests:** Verify critical user flows work end-to-end
- **API Tests:** Test API routes and backend integration
- **SSR Tests:** Verify server-side rendering behavior
- **E2E Tests:** Full browser automation testing with Playwright

### Goals

- **75% overall code coverage** minimum
- **90% utility function coverage**
- **85% service layer coverage**
- **70% component coverage**
- **All critical user journeys** covered by E2E tests

---

## Testing Stack

| Tool | Purpose | Version |
|------|---------|---------|
| **Vitest** | Unit & Integration Test Runner | Latest |
| **React Testing Library** | Component Testing | Latest |
| **@testing-library/user-event** | User Interaction Simulation | Latest |
| **MSW (Mock Service Worker)** | API Mocking | Latest |
| **Playwright** | E2E Browser Testing | Latest |
| **jsdom** | DOM Simulation Environment | Latest |

### Configuration Files

- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright E2E configuration
- `src/__tests__/setup.ts` - Test setup and global hooks
- `src/__mocks__/test-utils.tsx` - Custom render with providers
- `src/__mocks__/handlers/` - MSW mock handlers

---

## Test Categories

### 1. Unit Tests (Fast, Isolated)

Unit tests verify individual functions in isolation. They should be:
- Fast (< 100ms per test)
- Deterministic
- No external dependencies
- Easy to debug

#### A. Utility Functions (`src/lib/*.ts`)

| File | Test File | Status |
|------|-----------|--------|
| `utils.ts` | `__tests__/unit/lib/utils.test.ts` | ⬜ TODO |
| `validators.ts` | `__tests__/unit/lib/validators.test.ts` | ⬜ TODO |
| `api.ts` | `__tests__/unit/lib/api.test.ts` | ⬜ TODO |
| `constants.ts` | `__tests__/unit/lib/constants.test.ts` | ⬜ TODO |

**Test Cases for `utils.ts`:**

```typescript
describe('formatDate', () => {
  ✅ Valid date string
  ✅ Date object
  ✅ Invalid input (throws or returns default)
  ✅ Edge case: Date at midnight
  ✅ Edge case: Date in past/future
});

describe('formatRelativeTime', () => {
  ✅ 'just now' (< 60 seconds)
  ✅ 'Xm ago' (minutes)
  ✅ 'Xh ago' (hours)
  ✅ 'Xd ago' (days < 7)
  ✅ Full date (>= 7 days)
  ✅ Future date (edge case)
});

describe('truncate', () => {
  ✅ String shorter than limit (no change)
  ✅ String exactly at limit (no change)
  ✅ String longer than limit (truncated + '...')
  ✅ Empty string
  ✅ Limit of 0 (edge case)
});
```

#### B. Service Layer (`src/services/*.ts`)

| Service | Test File | Status |
|---------|-----------|--------|
| `article.service.ts` | `__tests__/unit/services/article.service.test.ts` | ⬜ TODO |
| `auth.service.ts` | `__tests__/unit/services/auth.service.test.ts` | ⬜ TODO |
| `comment.service.ts` | `__tests__/unit/services/comment.service.test.ts` | ⬜ TODO |
| `interaction.service.ts` | `__tests__/unit/services/interaction.service.test.ts` | ⬜ TODO |
| `follow.service.ts` | `__tests__/unit/services/follow.service.test.ts` | ⬜ TODO |
| `user.service.ts` | `__tests__/unit/services/user.service.test.ts` | ⬜ TODO |
| `feed.service.ts` | `__tests__/unit/services/feed.service.test.ts` | ⬜ TODO |
| `tag.service.ts` | `__tests__/unit/services/tag.service.test.ts` | ⬜ TODO |

**Test Cases for `article.service.ts`:**

```typescript
describe('articleService', () => {
  describe('getAll', () => {
    ✅ Fetches articles with default params
    ✅ Supports pagination params (page, size)
    ✅ Supports sorting params
    ✅ Handles 401 unauthorized
    ✅ Handles 500 server error
    ✅ Returns PageResponse structure
  });

  describe('getBySlug', () => {
    ✅ Fetches article by slug
    ✅ Handles 404 not found
    ✅ Handles network error
  });

  describe('create', () => {
    ✅ Creates article with valid data
    ✅ Handles validation errors (422)
    ✅ Handles 401 unauthorized
    ✅ Returns ArticleResponse with id
  });

  describe('update', () => {
    ✅ Updates article successfully
    ✅ Handles 403 forbidden (non-owner)
    ✅ Handles 404 not found
    ✅ Partial updates work
  });

  describe('delete', () => {
    ✅ Deletes article successfully (204)
    ✅ Handles 403 forbidden
    ✅ Handles 404 not found
  });

  describe('search', () => {
    ✅ Searches by query (q param)
    ✅ Filters by tag
    ✅ Filters by author
    ✅ Combined filters work
    ✅ Empty search returns empty array
  });

  describe('getPopular', () => {
    ✅ Returns array of popular articles
    ✅ Handles empty response
  });
});
```

#### C. Custom Hooks (`src/hooks/*.ts`)

| Hook | Test File | Status |
|------|-----------|--------|
| `use-toast.ts` | `__tests__/unit/hooks/use-toast.test.ts` | ⬜ TODO |

**Test Cases for `use-toast.ts`:**

```typescript
describe('useToast', () => {
  ✅ success() shows success toast
  ✅ error() shows error toast
  ✅ info() shows info toast
  ✅ warning() shows warning toast
  ✅ loading() shows loading toast and returns id
  ✅ dismiss() dismisses toast by id
  ✅ dismiss() dismisses all toasts when no id
});
```

---

### 2. Integration Tests (Components with Context)

Integration tests verify components work correctly with their dependencies.

#### A. Shared Components (`src/components/shared/*.tsx`)

| Component | Test File | Status |
|-----------|-----------|--------|
| `pagination.tsx` | `__tests__/integration/components/shared/pagination.test.tsx` | ⬜ TODO |
| `search-bar.tsx` | `__tests__/integration/components/shared/search-bar.test.tsx` | ⬜ TODO |
| `like-button.tsx` | `__tests__/integration/components/shared/like-button.test.tsx` | ⬜ TODO |
| `bookmark-button.tsx` | `__tests__/integration/components/shared/bookmark-button.test.tsx` | ⬜ TODO |
| `follow-button.tsx` | `__tests__/integration/components/shared/follow-button.test.tsx` | ⬜ TODO |

**Test Cases for `Pagination`:**

```typescript
describe('Pagination', () => {
  ✅ Renders nothing when totalPages <= 1
  ✅ Renders correct page numbers (first page)
  ✅ Renders correct page numbers (middle page)
  ✅ Renders correct page numbers (last page)
  ✅ Shows ellipsis for large page counts
  ✅ First/Last buttons disabled appropriately
  ✅ Previous/Next buttons disabled appropriately
  ✅ Click on page number navigates
  ✅ Uses custom basePath
  ✅ Keyboard navigation works
});
```

**Test Cases for `LikeButton`:**

```typescript
describe('LikeButton', () => {
  ✅ Renders with initial count
  ✅ Shows liked/unliked state correctly
  ✅ Click toggles like (optimistic update)
  ✅ Shows toast on success
  ✅ Shows toast on error
  ✅ Redirects to login when unauthenticated
  ✅ Loading state during request
  ✅ Disabled during loading
  ✅ Renders different sizes (sm, md, lg)
});
```

#### B. Article Components (`src/components/articles/*.tsx`)

| Component | Test File | Status |
|-----------|-----------|--------|
| `article-card.tsx` | `__tests__/integration/components/articles/article-card.test.tsx` | ⬜ TODO |
| `article-form.tsx` | `__tests__/integration/components/articles/article-form.test.tsx` | ⬜ TODO |
| `delete-article-button.tsx` | `__tests__/integration/components/articles/delete-article-button.test.tsx` | ⬜ TODO |

**Test Cases for `ArticleForm`:**

```typescript
describe('ArticleForm', () => {
  describe('Create Mode', () => {
    ✅ Renders empty form
    ✅ Shows validation errors on submit
    ✅ Title required error
    ✅ Body required error
    ✅ Subtitle max length error
    ✅ Add/remove tags works
    ✅ Max 10 tags limit
    ✅ Submit creates article
    ✅ Shows loading state
    ✅ Success toast shown
    ✅ Navigates to article on success
    ✅ Error toast on failure
  });

  describe('Edit Mode', () => {
    ✅ Pre-fills form with article data
    ✅ Submit updates article
    ✅ Cancels and navigates back
    ✅ Shows existing tags
  });
});
```

#### C. Comment Components (`src/components/comments/*.tsx`)

| Component | Test File | Status |
|-----------|-----------|--------|
| `comment-thread.tsx` | `__tests__/integration/components/comments/comment-thread.test.tsx` | ⬜ TODO |
| `comment-form` (in comment-thread) | Included in above | ⬜ TODO |
| `comments-section.tsx` | `__tests__/integration/components/comments/comments-section.test.tsx` | ⬜ TODO |

#### D. Layout Components (`src/components/layout/*.tsx`)

| Component | Test File | Status |
|-----------|-----------|--------|
| `navbar.tsx` | `__tests__/integration/components/layout/navbar.test.tsx` | ⬜ TODO |
| `footer.tsx` | `__tests__/integration/components/layout/footer.test.tsx` | ⬜ TODO |

#### E. Context Providers (`src/context/*.tsx`)

| Context | Test File | Status |
|---------|-----------|--------|
| `auth.context.tsx` | `__tests__/integration/context/auth.context.test.tsx` | ⬜ TODO |

**Test Cases for `AuthContext`:**

```typescript
describe('AuthContext', () => {
  describe('AuthProvider', () => {
    ✅ Renders children
    ✅ Starts in loading state
    ✅ Loads user on mount (authenticated)
    ✅ Sets user to null (unauthenticated)
    ✅ Handles 401 gracefully
  });

  describe('useAuth hook', () => {
    ✅ Returns context when inside provider
    ✅ Throws when used outside provider
    ✅ Returns user object
    ✅ Returns isLoading boolean
    ✅ Returns setUser function
    ✅ Returns logout function
  });

  describe('logout', () => {
    ✅ Calls logout API
    ✅ Clears user state
    ✅ Handles logout error gracefully
  });
});
```

---

### 3. API Route Tests (Integration)

API routes proxy requests to the backend and set httpOnly cookies.

#### A. Auth Routes (`src/app/api/auth/*/route.ts`)

| Route | Test File | Status |
|-------|-----------|--------|
| `POST /api/auth/login` | `__tests__/integration/api/auth/login.test.ts` | ⬜ TODO |
| `POST /api/auth/logout` | `__tests__/integration/api/auth/logout.test.ts` | ⬜ TODO |
| `GET /api/auth/me` | `__tests__/integration/api/auth/me.test.ts` | ⬜ TODO |
| `POST /api/auth/refresh` | `__tests__/integration/api/auth/refresh.test.ts` | ⬜ TODO |
| `POST /api/auth/signup` | `__tests__/integration/api/auth/signup.test.ts` | ⬜ TODO |

**Test Cases for `/api/auth/login`:**

```typescript
describe('POST /api/auth/login', () => {
  ✅ Returns 200 with valid credentials
  ✅ Sets httpOnly accessToken cookie
  ✅ Sets httpOnly refreshToken cookie
  ✅ Returns user data
  ✅ Returns 401 with invalid credentials
  ✅ Returns 400 with missing fields
  ✅ Handles backend 500 error
  ✅ Correct cookie attributes (httpOnly, secure, sameSite)
});
```

#### B. Article Routes (`src/app/api/articles/*/route.ts`)

| Route | Test File | Status |
|-------|-----------|--------|
| `POST /api/articles` | `__tests__/integration/api/articles/create.test.ts` | ⬜ TODO |
| `GET /api/articles/my` | `__tests__/integration/api/articles/my.test.ts` | ⬜ TODO |
| `PUT /api/articles/[slug]/update` | `__tests__/integration/api/articles/update.test.ts` | ⬜ TODO |
| `DELETE /api/articles/[slug]/delete` | `__tests__/integration/api/articles/delete.test.ts` | ⬜ TODO |
| `POST /api/articles/[slug]/like` | `__tests__/integration/api/articles/like.test.ts` | ⬜ TODO |
| `POST /api/articles/[slug]/bookmark` | `__tests__/integration/api/articles/bookmark.test.ts` | ⬜ TODO |

#### C. Comment Routes

| Route | Test File | Status |
|-------|-----------|--------|
| `GET/POST /api/comments/[slug]` | `__tests__/integration/api/comments/crud.test.ts` | ⬜ TODO |
| `DELETE /api/comments/[slug]/[id]` | Included in above | ⬜ TODO |

#### D. User Routes

| Route | Test File | Status |
|-------|-----------|--------|
| `GET /api/users/me/stats` | `__tests__/integration/api/users/stats.test.ts` | ⬜ TODO |
| `POST /api/users/[id]/follow` | `__tests__/integration/api/users/follow.test.ts` | ⬜ TODO |

#### E. Feed Route

| Route | Test File | Status |
|-------|-----------|--------|
| `GET /api/feed` | `__tests__/integration/api/feed.test.ts` | ⬜ TODO |

---

### 4. SSR Tests (Server-Side Rendering)

SSR tests verify pages render correctly on the server.

| Page | Test File | Status |
|------|-----------|--------|
| Home (`/`) | `__tests__/integration/pages/home.test.tsx` | ⬜ TODO |
| Articles List (`/articles`) | `__tests__/integration/pages/articles.test.tsx` | ⬜ TODO |
| Article Detail (`/articles/[slug]`) | `__tests__/integration/pages/article-detail.test.tsx` | ⬜ TODO |
| Tags List (`/tags`) | `__tests__/integration/pages/tags.test.tsx` | ⬜ TODO |
| Tag Detail (`/tags/[slug]`) | `__tests__/integration/pages/tag-detail.test.tsx` | ⬜ TODO |
| Search (`/search`) | `__tests__/integration/pages/search.test.tsx` | ⬜ TODO |
| Popular (`/popular`) | `__tests__/integration/pages/popular.test.tsx` | ⬜ TODO |

**Test Cases for Home Page (SSR):**

```typescript
describe('Home Page (SSR)', () => {
  ✅ Renders hero section
  ✅ Fetches latest articles on server
  ✅ Renders article cards
  ✅ Shows empty state when no articles
  ✅ Handles fetch error gracefully
  ✅ Renders markdown in article cards
  ✅ Generates correct metadata
  ✅ Loading skeletons shown while fetching
  ✅ Links to article detail work
  ✅ Links to /articles work
});
```

---

### 5. Smoke Tests (Critical Paths)

Smoke tests verify critical user flows work.

| Test Suite | Test File | Status |
|------------|-----------|--------|
| Auth Flow | `__tests__/smoke/auth.smoke.test.ts` | ⬜ TODO |
| Article CRUD | `__tests__/smoke/articles.smoke.test.ts` | ⬜ TODO |
| Comments | `__tests__/smoke/comments.smoke.test.ts` | ⬜ TODO |

**Test Cases for Auth Smoke:**

```typescript
describe('Auth Flow (Smoke)', () => {
  ✅ User can signup
  ✅ User can login
  ✅ User can logout
  ✅ Protected routes redirect when unauthenticated
  ✅ Session persists on refresh (via cookies)
});
```

---

### 6. E2E Tests (Playwright)

E2E tests verify full user journeys in a real browser.

| Journey | Test File | Status |
|---------|-----------|--------|
| Authentication | `__tests__/e2e/auth.spec.ts` | ⬜ TODO |
| Articles | `__tests__/e2e/articles.spec.ts` | ⬜ TODO |
| Comments | `__tests__/e2e/comments.spec.ts` | ⬜ TODO |
| Interactions | `__tests__/e2e/interactions.spec.ts` | ⬜ TODO |
| Search | `__tests__/e2e/search.spec.ts` | ⬜ TODO |
| Dashboard | `__tests__/e2e/dashboard.spec.ts` | ⬜ TODO |

**Test Cases for Authentication E2E:**

```typescript
test.describe('Authentication', () => {
  test('User can signup', async ({ page }) => {
    ⬜ Navigate to /signup
    ⬜ Fill form with valid data
    ⬜ Submit form
    ⬜ Verify redirected to home
    ⬜ Verify logged in (navbar shows user menu)
  });

  test('User can login', async ({ page }) => {
    ⬜ Navigate to /login
    ⬜ Fill form
    ⬜ Submit
    ⬜ Verify redirected to home
    ⬜ Verify logged in
  });

  test('User can logout', async ({ page }) => {
    ⬜ Login first
    ⬜ Click user menu
    ⬜ Click logout
    ⬜ Verify logged out
    ⬜ Verify redirected
  });

  test('Protected routes redirect unauthenticated users', async ({ page }) => {
    ⬜ Navigate to /dashboard
    ⬜ Verify redirected to /login
    ⬜ Navigate to /new
    ⬜ Verify redirected to /login
  });

  test('Login page redirects authenticated users', async ({ page }) => {
    ⬜ Login
    ⬜ Navigate to /login
    ⬜ Verify redirected to home
  });
});
```

**Test Cases for Articles E2E:**

```typescript
test.describe('Articles', () => {
  test('User can view article list', async ({ page }) => {
    ⬜ Navigate to /articles
    ⬜ Verify articles rendered
    ⬜ Verify pagination works
  });

  test('User can view article detail', async ({ page }) => {
    ⬜ Navigate to /articles/[slug]
    ⬜ Verify title rendered
    ⬜ Verify markdown rendered
    ⬜ Verify author info shown
    ⬜ Verify stats shown
  });

  test('User can create article', async ({ page }) => {
    ⬜ Login
    ⬜ Navigate to /new
    ⬜ Fill form
    ⬜ Submit
    ⬜ Verify article created
    ⬜ Verify redirected to article page
  });

  test('User can edit article', async ({ page }) => {
    ⬜ Login
    ⬜ Navigate to /my-articles
    ⬜ Click edit
    ⬜ Modify content
    ⬜ Submit
    ⬜ Verify article updated
  });

  test('User can delete article', async ({ page }) => {
    ⬜ Login
    ⬜ Create an article first
    ⬜ Navigate to /my-articles
    ⬜ Click delete
    ⬜ Confirm in dialog
    ⬜ Verify article deleted
    ⬜ Verify redirected to my-articles
  });

  test('User can like article', async ({ page }) => {
    ⬜ Login
    ⬜ Navigate to article
    ⬜ Click like button
    ⬜ Verify count increased
    ⬜ Verify button state changed
    ⬜ Verify toast shown
  });

  test('User can bookmark article', async ({ page }) => {
    ⬜ Login
    ⬜ Navigate to article
    ⬜ Click bookmark
    ⬜ Verify state changed
    ⬜ Verify toast shown
  });
});
```

---

## Project Structure

```
Frontend/
├── src/
│   ├── __tests__/
│   │   ├── setup.ts                 # Global test setup
│   │   ├── unit/                    # Unit tests
│   │   │   ├── lib/
│   │   │   │   ├── utils.test.ts
│   │   │   │   ├── validators.test.ts
│   │   │   │   ├── api.test.ts
│   │   │   │   └── constants.test.ts
│   │   │   ├── services/
│   │   │   │   ├── article.service.test.ts
│   │   │   │   ├── auth.service.test.ts
│   │   │   │   ├── comment.service.test.ts
│   │   │   │   ├── interaction.service.test.ts
│   │   │   │   ├── follow.service.test.ts
│   │   │   │   ├── user.service.test.ts
│   │   │   │   ├── feed.service.test.ts
│   │   │   │   └── tag.service.test.ts
│   │   │   └── hooks/
│   │   │       └── use-toast.test.ts
│   │   ├── integration/             # Integration tests
│   │   │   ├── components/
│   │   │   │   ├── shared/
│   │   │   │   │   ├── pagination.test.tsx
│   │   │   │   │   ├── search-bar.test.tsx
│   │   │   │   │   ├── like-button.test.tsx
│   │   │   │   │   ├── bookmark-button.test.tsx
│   │   │   │   │   └── follow-button.test.tsx
│   │   │   │   ├── articles/
│   │   │   │   │   ├── article-card.test.tsx
│   │   │   │   │   ├── article-form.test.tsx
│   │   │   │   │   └── delete-article-button.test.tsx
│   │   │   │   ├── comments/
│   │   │   │   │   ├── comment-thread.test.tsx
│   │   │   │   │   └── comments-section.test.tsx
│   │   │   │   └── layout/
│   │   │   │       ├── navbar.test.tsx
│   │   │   │       └── footer.test.tsx
│   │   │   ├── context/
│   │   │   │   └── auth.context.test.tsx
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login.test.ts
│   │   │   │   │   ├── logout.test.ts
│   │   │   │   │   ├── me.test.ts
│   │   │   │   │   ├── refresh.test.ts
│   │   │   │   │   └── signup.test.ts
│   │   │   │   ├── articles/
│   │   │   │   │   ├── create.test.ts
│   │   │   │   │   ├── my.test.ts
│   │   │   │   │   ├── update.test.ts
│   │   │   │   │   ├── delete.test.ts
│   │   │   │   │   ├── like.test.ts
│   │   │   │   │   └── bookmark.test.ts
│   │   │   │   ├── comments/
│   │   │   │   │   └── crud.test.ts
│   │   │   │   └── users/
│   │   │   │       ├── stats.test.ts
│   │   │   │       └── follow.test.ts
│   │   │   └── pages/
│   │   │       ├── home.test.tsx
│   │   │       ├── articles.test.tsx
│   │   │       ├── article-detail.test.tsx
│   │   │       ├── tags.test.tsx
│   │   │       ├── tag-detail.test.tsx
│   │   │       ├── search.test.tsx
│   │   │       └── popular.test.tsx
│   │   ├── smoke/                   # Smoke tests
│   │   │   ├── auth.smoke.test.ts
│   │   │   ├── articles.smoke.test.ts
│   │   │   └── comments.smoke.test.ts
│   │   └── e2e/                     # E2E tests (Playwright)
│   │       ├── auth.spec.ts
│   │       ├── articles.spec.ts
│   │       ├── comments.spec.ts
│   │       ├── interactions.spec.ts
│   │       ├── search.spec.ts
│   │       └── dashboard.spec.ts
│   └── __mocks__/
│       ├── test-utils.tsx           # Custom render with providers
│       └── handlers/
│           ├── server.ts            # MSW server setup
│           ├── index.ts             # Combined handlers
│           ├── auth.handler.ts      # Auth mock handlers
│           ├── articles.handler.ts  # Articles mock handlers
│           ├── comments.handler.ts  # Comments mock handlers
│           ├── users.handler.ts     # Users mock handlers
│           ├── tags.handler.ts      # Tags mock handlers
│           └── feed.handler.ts      # Feed mock handlers
├── vitest.config.ts
├── playwright.config.ts
└── TESTING.md                       # This file
```

---

## Running Tests

### Unit & Integration Tests

```bash
# Run all tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npx vitest run src/__tests__/unit/lib/utils.test.ts

# Run tests matching pattern
npx vitest run --grep "articleService"
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug

# Run specific E2E test
npx playwright test auth.spec.ts

# Run E2E tests in specific browser
npx playwright test --project=chromium
```

### Running Tests Against Backend

For integration and E2E tests, you can run against the real backend:

```bash
# Start backend (in another terminal)
cd ../Backend
./gradlew bootRun

# Run frontend tests (in Frontend terminal)
npm run test:run

# Run E2E tests
npm run test:e2e
```

---

## Writing Tests

### Unit Test Example

```typescript
// src/__tests__/unit/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate, formatRelativeTime, truncate } from '@/lib/utils';

describe('formatDate', () => {
  it('formats valid date string', () => {
    const result = formatDate('2026-04-06T10:00:00Z');
    expect(result).toBe('April 6, 2026');
  });

  it('formats Date object', () => {
    const date = new Date('2026-04-06T10:00:00Z');
    const result = formatDate(date);
    expect(result).toBe('April 6, 2026');
  });
});

describe('formatRelativeTime', () => {
  it('returns "just now" for recent dates', () => {
    const now = new Date();
    const result = formatRelativeTime(now);
    expect(result).toBe('just now');
  });

  it('returns minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    const result = formatRelativeTime(date);
    expect(result).toBe('5m ago');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    const result = truncate('Hello World', 5);
    expect(result).toBe('Hello...');
  });

  it('does not truncate short strings', () => {
    const result = truncate('Hi', 5);
    expect(result).toBe('Hi');
  });
});
```

### Component Test Example

```typescript
// src/__tests__/integration/components/shared/pagination.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/__mocks__/test-utils';
import userEvent from '@testing-library/user-event';
import { Pagination } from '@/components/shared/pagination';

describe('Pagination', () => {
  it('renders nothing when totalPages <= 1', () => {
    const { container } = render(<Pagination page={0} totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders correct page numbers', () => {
    render(<Pagination page={2} totalPages={10} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // Current page
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('…')).toBeInTheDocument();
  });

  it('navigates on click', async () => {
    const user = userEvent.setup();
    render(<Pagination page={0} totalPages={5} />);
    
    await user.click(screen.getByText('3'));
    // Verify navigation (would need router mock)
  });
});
```

### API Route Test Example

```typescript
// src/__tests__/integration/api/auth/login.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '@/app/api/auth/login/route';

describe('POST /api/auth/login', () => {
  it('returns 200 with valid credentials', async () => {
    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'testuser', password: 'password123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.user.username).toBe('testuser');
  });

  it('sets httpOnly cookies', async () => {
    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'testuser', password: 'password123' }),
    });

    const response = await POST(request);
    const cookies = response.headers.getSetCookie();

    expect(cookies.some(c => c.includes('accessToken'))).toBe(true);
    expect(cookies.some(c => c.includes('httpOnly'))).toBe(true);
  });
});
```

---

## Test Coverage

### Coverage Thresholds

| Category | Target | Current |
|----------|--------|---------|
| **Lines** | 75% | ⬜ N/A |
| **Functions** | 75% | ⬜ N/A |
| **Branches** | 70% | ⬜ N/A |
| **Statements** | 75% | ⬜ N/A |

### Coverage by Module

| Module | Target | Current | Status |
|--------|--------|---------|--------|
| `src/lib/utils.ts` | 90% | ⬜ N/A | ⬜ TODO |
| `src/lib/validators.ts` | 90% | ⬜ N/A | ⬜ TODO |
| `src/lib/api.ts` | 85% | ⬜ N/A | ⬜ TODO |
| `src/services/*.ts` | 85% | ⬜ N/A | ⬜ TODO |
| `src/components/**/*.tsx` | 70% | ⬜ N/A | ⬜ TODO |
| `src/context/*.tsx` | 80% | ⬜ N/A | ⬜ TODO |
| `src/app/api/**/route.ts` | 80% | ⬜ N/A | ⬜ TODO |

### Viewing Coverage Report

```bash
# Generate coverage
npm run test:coverage

# Open HTML report
open coverage/index.html
```

---

## MSW Mock Handlers

MSW intercepts HTTP requests and returns mock responses, allowing tests to run without a real backend.

### Handler Files

| File | Endpoints Mocked |
|------|------------------|
| `auth.handler.ts` | `/auth/login`, `/auth/logout`, `/auth/refresh`, `/users`, `/users/me` |
| `articles.handler.ts` | `/articles`, `/articles/:slug`, `/articles/search`, `/articles/popular`, `/articles/my`, `/articles/:slug/like`, `/articles/:slug/bookmark` |
| `comments.handler.ts` | `/articles/:slug/comments`, `/articles/:slug/comments/:id` |
| `users.handler.ts` | `/users/me/stats`, `/users/:id/follow` |
| `tags.handler.ts` | `/tags`, `/tags/:slug` |
| `feed.handler.ts` | `/feed` |

### Customizing Mocks

```typescript
import { http, HttpResponse } from 'msw';
import { server } from '@/__mocks__/handlers/server';

// Override default handler for specific test
it('handles error', async () => {
  server.use(
    http.get('http://localhost:8080/api/v1/articles', () => {
      return HttpResponse.json(
        { message: 'Server error' },
        { status: 500 }
      );
    })
  );

  // Test error handling
});
```

---

## Test Registry

### Unit Tests

| Test Suite | File | Status | Last Run | Pass Rate |
|------------|------|--------|----------|-----------|
| utils | `unit/lib/utils.test.ts` | ⬜ TODO | - | - |
| validators | `unit/lib/validators.test.ts` | ⬜ TODO | - | - |
| api | `unit/lib/api.test.ts` | ⬜ TODO | - | - |
| article.service | `unit/services/article.service.test.ts` | ⬜ TODO | - | - |
| auth.service | `unit/services/auth.service.test.ts` | ⬜ TODO | - | - |
| comment.service | `unit/services/comment.service.test.ts` | ⬜ TODO | - | - |
| interaction.service | `unit/services/interaction.service.test.ts` | ⬜ TODO | - | - |
| follow.service | `unit/services/follow.service.test.ts` | ⬜ TODO | - | - |
| user.service | `unit/services/user.service.test.ts` | ⬜ TODO | - | - |
| feed.service | `unit/services/feed.service.test.ts` | ⬜ TODO | - | - |
| tag.service | `unit/services/tag.service.test.ts` | ⬜ TODO | - | - |
| use-toast | `unit/hooks/use-toast.test.ts` | ⬜ TODO | - | - |

### Integration Tests

| Test Suite | File | Status | Last Run | Pass Rate |
|------------|------|--------|----------|-----------|
| Pagination | `integration/components/shared/pagination.test.tsx` | ⬜ TODO | - | - |
| SearchBar | `integration/components/shared/search-bar.test.tsx` | ⬜ TODO | - | - |
| LikeButton | `integration/components/shared/like-button.test.tsx` | ⬜ TODO | - | - |
| BookmarkButton | `integration/components/shared/bookmark-button.test.tsx` | ⬜ TODO | - | - |
| FollowButton | `integration/components/shared/follow-button.test.tsx` | ⬜ TODO | - | - |
| ArticleCard | `integration/components/articles/article-card.test.tsx` | ⬜ TODO | - | - |
| ArticleForm | `integration/components/articles/article-form.test.tsx` | ⬜ TODO | - | - |
| DeleteArticleButton | `integration/components/articles/delete-article-button.test.tsx` | ⬜ TODO | - | - |
| CommentThread | `integration/components/comments/comment-thread.test.tsx` | ⬜ TODO | - | - |
| CommentsSection | `integration/components/comments/comments-section.test.tsx` | ⬜ TODO | - | - |
| Navbar | `integration/components/layout/navbar.test.tsx` | ⬜ TODO | - | - |
| Footer | `integration/components/layout/footer.test.tsx` | ⬜ TODO | - | - |
| AuthContext | `integration/context/auth.context.test.tsx` | ⬜ TODO | - | - |
| Login API | `integration/api/auth/login.test.ts` | ⬜ TODO | - | - |
| Logout API | `integration/api/auth/logout.test.ts` | ⬜ TODO | - | - |
| Me API | `integration/api/auth/me.test.ts` | ⬜ TODO | - | - |
| Refresh API | `integration/api/auth/refresh.test.ts` | ⬜ TODO | - | - |
| Signup API | `integration/api/auth/signup.test.ts` | ⬜ TODO | - | - |
| Create Article API | `integration/api/articles/create.test.ts` | ⬜ TODO | - | - |
| My Articles API | `integration/api/articles/my.test.ts` | ⬜ TODO | - | - |
| Update Article API | `integration/api/articles/update.test.ts` | ⬜ TODO | - | - |
| Delete Article API | `integration/api/articles/delete.test.ts` | ⬜ TODO | - | - |
| Like Article API | `integration/api/articles/like.test.ts` | ⬜ TODO | - | - |
| Bookmark Article API | `integration/api/articles/bookmark.test.ts` | ⬜ TODO | - | - |
| Comments API | `integration/api/comments/crud.test.ts` | ⬜ TODO | - | - |
| User Stats API | `integration/api/users/stats.test.ts` | ⬜ TODO | - | - |
| Follow User API | `integration/api/users/follow.test.ts` | ⬜ TODO | - | - |
| Feed API | `integration/api/feed.test.ts` | ⬜ TODO | - | - |

### Smoke Tests

| Test Suite | File | Status | Last Run | Pass Rate |
|------------|------|--------|----------|-----------|
| Auth Flow | `smoke/auth.smoke.test.ts` | ⬜ TODO | - | - |
| Articles CRUD | `smoke/articles.smoke.test.ts` | ⬜ TODO | - | - |
| Comments Flow | `smoke/comments.smoke.test.ts` | ⬜ TODO | - | - |

### E2E Tests

| Test Suite | File | Status | Last Run | Pass Rate |
|------------|------|--------|----------|-----------|
| Authentication | `e2e/auth.spec.ts` | ⬜ TODO | - | - |
| Articles | `e2e/articles.spec.ts` | ⬜ TODO | - | - |
| Comments | `e2e/comments.spec.ts` | ⬜ TODO | - | - |
| Interactions | `e2e/interactions.spec.ts` | ⬜ TODO | - | - |
| Search | `e2e/search.spec.ts` | ⬜ TODO | - | - |
| Dashboard | `e2e/dashboard.spec.ts` | ⬜ TODO | - | - |

---

## Best Practices

### 1. Test User Behavior, Not Implementation Details

❌ **Bad:**
```typescript
expect(component.state.count).toBe(1);
```

✅ **Good:**
```typescript
await user.click(screen.getByRole('button', { name: /increment/i }));
expect(screen.getByText('1')).toBeInTheDocument();
```

### 2. Use Testing Library Queries by Priority

1. `getByRole` - Most accessible
2. `getByLabelText` - Form inputs
3. `getByPlaceholderText` - Input placeholders
4. `getByText` - Text content
5. `getByDisplayValue` - Current input value
6. `getByAltText` - Images
7. `getByTitle` - Title attributes
8. `getByTestId` - Last resort (data-testid)

### 3. Avoid Testing Library Implementation Details

❌ **Bad:**
```typescript
const { container } = render(<MyComponent />);
expect(container.querySelector('.my-class')).toBeInTheDocument();
```

✅ **Good:**
```typescript
render(<MyComponent />);
expect(screen.getByRole('button')).toBeInTheDocument();
```

### 4. Test Accessibility

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 5. Mock External Dependencies

```typescript
// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams('?q=test'),
}));
```

### 6. Use MSW for API Mocking

MSW is better than mocking fetch/axios because:
- Works at the network level
- Doesn't pollute test code with mock setup
- Same handlers work for unit, integration, and E2E tests
- More realistic testing

### 7. Keep Tests Isolated

Each test should:
- Arrange: Set up test data and environment
- Act: Execute the code under test
- Assert: Verify expected outcomes

### 8. Test Error States

Don't just test happy paths:
```typescript
describe('ArticleForm', () => {
  it('shows validation errors', async () => {
    // ...
  });

  it('shows network error', async () => {
    server.use(
      http.post('/api/articles', () => 
        HttpResponse.json({ message: 'Error' }, { status: 500 })
      )
    );
    // ...
  });
});
```

### 9. Use Meaningful Test Names

❌ **Bad:**
```typescript
it('works', () => {});
it('test1', () => {});
```

✅ **Good:**
```typescript
it('displays error message when password is too short', () => {});
it('redirects to home page after successful login', () => {});
```

### 10. Clean Up Side Effects

```typescript
afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.clearAllMocks();
});
```

---

## Test Status Legend

| Icon | Meaning |
|------|---------|
| ⬜ TODO | Test not yet written |
| ✅ PASS | Test passing |
| ❌ FAIL | Test failing |
| ⏸️ SKIP | Test skipped |
| 🚧 WIP | Work in progress |

---

## Contributing Tests

When adding new features:

1. **Write tests first** (TDD approach preferred)
2. **Update this document** with new test cases
3. **Run full test suite** before committing
4. **Maintain coverage thresholds**
5. **Update MSW handlers** if adding new API endpoints

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-06 | Initial testing setup and documentation | Claude |

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW Documentation](https://mswjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing JavaScript](https://testingjavascript.com/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-testing-mistakes)

---

**Last Updated:** 2026-04-06
