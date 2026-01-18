# AGENTS.MD - AI & Developer Instructions

This document serves as the source of truth for all AI agents and developers working on this repository. Strictly adhere to these architectural patterns and coding standards.

## 1. Monorepo Architecture & Component Strategy

### 🚨 CRITICAL RULE: Component Location
* **DO NOT** create UI components strictly within consumer applications (e.g., `apps/web`).
* **ALWAYS** create new UI components within the shared packages directory (`packages/ui`) use/create tokens in `packages/ui/src/styles/tokens.ts`.
* **CONSUMPTION:** Applications should import components from the shared packages (e.g., `import { Button } from '@andisds/ui';`).

### 📖 Documentation Standard
* **Storybook:** Every new component created in `packages/ui` **MUST** have a corresponding Storybook story created in `packages/ui/src/stories` (or `apps/docs` if separated).
* **Completeness:** Stories must demonstrate all variants (primary, secondary, disabled, loading states) and include strict typing examples.

---

## 2. Front-End Guidelines (React + Vite)

### Technology Stack
* **Framework:** React 19 + Vite
* **Styling:** Styled Components (CSS-in-JS)
* **State Management:** Context API + Hooks (prefer local state)
* **Routing:** React Router v7

### Core Principles
* **Functional Components:** Use React Functional Components (FC) with Hooks strictly. No Class components.
* **TypeScript:** Use strict typing. Avoid `any`. Define interfaces for all Props (e.g., `ButtonProps`).
* **Dark Mode:** Implement dark mode support using the shared `OrionProvider` and `useTheme` hook.

### Best Practices
1.  **Logic Separation:** Extract complex business logic into custom hooks (`useMyLogic.ts`) to keep UI components pure and presentational.
2.  **Performance:**
    * Use `useMemo` for expensive calculations.
    * Use `useCallback` for functions passed as props to memoized children.
3.  **Styling (Styled Components):**
    * Use the `theme` prop to access design tokens: `color: ${({ theme }) => theme.colors.primary};`
    * Avoid hardcoded values (colors, spacing, fonts). Always use the Theme.

---

## 3. Back-End Guidelines (NestJS)

### Technology Stack
* **Framework:** NestJS 11
* **Database:** PostgreSQL via Prisma ORM
* **Auth:** Passport JWT + Local Strategy

### Architecture
* **Modularity:** Organize code by **Modules**. Each domain feature should have its own directory containing `module`, `controller`, `service`, and `dto`.
* **Dependency Injection:** Always use DI for service instantiation. Avoid manual class instantiation.

### Data & Validation
* **DTOs (Data Transfer Objects):** specific classes for data input/output.
* **Validation:** Use `class-validator` and `class-transformer` decorators in DTOs to enforce data integrity at the request level.
* **Prisma:**
    * Use `PrismaService` for DB operations.
    * Never write raw SQL unless absolutely necessary for complex aggregations.

### Error Handling
* Use NestJS Global Exception Filters.
* Throw standard HTTP Exceptions (e.g., `NotFoundException`, `BadRequestException`) rather than generic Javascript errors.

---

## 4. Code Quality & Git
* **Conventional Commits:** Follow the Conventional Commits specification (e.g., `feat: add button component`, `fix: resolve login bug`).
* **Linting:** Ensure no ESLint warnings remain before committing.
* **Testing:** Write unit tests (`.spec.ts`) for all business logic in `packages` and NestJS services.

## 5. Design System & Theming
* **Tokens:** All design tokens (colors, spacing, etc.) are defined in `packages/ui/src/styles/tokens.ts`.
* **Theming:** The application supports Light and Dark modes.
    * Use the `useTheme` hook from `@andisds/ui` to toggle modes.
    * When creating components, always define styles for both light and dark contexts using the semantic color tokens (e.g., `background`, `surface`, `text`).