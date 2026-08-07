# Auth UI & Credentials Provider Spec

## Summary & Requirements
This spec covers the Authentication flow for the application.
- **Pages**: Login Page and Register Page.
- **Provider**: NextAuth.js (Auth.js v5) using the Credentials provider.
- **Fields**: Email and Password only.
- **Strategy**: JWT session strategy (required for Credentials provider).
- **Design**: Must strictly adhere to `.istm-context/design.md` tokens (dark-theme, Space Grotesk/Inter fonts, hairline borders).
- **State**: Any global client-side state required during auth flows should use `zustand` if lifted beyond local component state (though standard form state can remain local). React Query (TanStack Query) handles API polling where needed.

## UI & Architecture
- **Framework**: Next.js 16 (App Router), Server Actions for form submissions to `signIn`.
- **Components**: We will use `shadcn/ui` components (e.g., `Form`, `Input`, `Button`, `Card`) but they MUST be styled using the `design.md` CSS custom properties (e.g., `--color-surface-inset` for inputs, `--color-primary` for buttons).
- **Typography**: 
  - Page Titles (if any H1) use Playfair Display.
  - Card Headings/Buttons use Space Grotesk.
  - Body/Input text uses Inter.
- **Asset Rule**: No image files. Use Lucide icons only.

## Strict Typing & Constants
- All TypeScript types MUST go in a dedicated `app/(auth)/types/` folder.
- All constants (like route paths, API endpoints, validation limits) MUST go in a `app/(auth)/constants/` folder.
- Absolutely NO use of the `any` type is allowed.
- Use `zod` for strict schema validation of the Email and Password fields.

## Build Plan

### Step 1: Global Setup Verification
Ensure the global CSS (`globals.css`) contains the design tokens from `design.md`, the fonts (Playfair Display, Space Grotesk, Inter) are loaded in the root `layout.tsx`, and the `<html>` tag has `data-theme="dark"` (or uses a theme provider).

### Step 2: NextAuth.js (v5) Configuration
1. Create `auth.ts` in the project root (or `app/api/auth/`).
2. Configure the `Credentials` provider from `next-auth/providers/credentials`.
3. Implement the `authorize` function to validate the email and password against the Neon Postgres database.
4. Set `session: { strategy: "jwt" }`.
5. Create the API route at `app/api/auth/[...nextauth]/route.ts` exporting `GET` and `POST` from `auth.ts` `handlers`.

### Step 3: Auth Types & Constants
1. Create `app/app/(auth)/types/index.ts`. Define types for `LoginCredentials`, `RegisterCredentials`, and the User session shape.
2. Create `app/app/(auth)/constants/index.ts`. Define routes (e.g., `LOGIN_ROUTE = "/login"`) and validation limits.
3. Define `zod` schemas for login and registration forms.

### Step 4: UI Components
1. Create `LoginForm.tsx` and `RegisterForm.tsx` in `app/app/(auth)/components/`.
2. Wrap forms in a card-like container using `--color-surface` and `--color-hairline`.
3. Input fields must use the `text-input` design tokens (`--color-surface-inset` background, `--radius-md`).
4. Submit buttons must use the `button-primary` design tokens (`--color-primary` background, Space Grotesk 14px).

### Step 5: Auth Pages Assembly
1. Create `app/(auth)/login/page.tsx` and `app/(auth)/register/page.tsx`.
2. Render the forms within these pages, centered on the screen, adhering to the whitespace and layout rules.
3. Wire the forms to Server Actions that call NextAuth's `signIn("credentials", ...)` and handle redirection/errors seamlessly.
