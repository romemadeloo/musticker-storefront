# Musticker Storefront Test Cases

Generated: 2026-08-10

Target production URL: `https://www.musticker.com/kr`

## Scope

This test plan covers production-safe Playwright E2E automation for the public Musticker storefront, with destructive purchase/payment scenarios separated for dev or explicitly enabled production-safe seeded accounts.

Scanned pages:

- `https://www.musticker.com/`
- `https://www.musticker.com/kr/stickers`
- `https://www.musticker.com/kr/roll-stickers`
- `https://www.musticker.com/kr/sheet-stickers`
- `https://www.musticker.com/kr/stickers/die-cut-sticker`
- `https://www.musticker.com/kr/roll-stickers/die-cut-roll`
- `https://www.musticker.com/kr/sheet-stickers/die-cut-sheet`
- `https://www.musticker.com/kr/faq`
- `https://www.musticker.com/kr/terms-of-use`
- `https://www.musticker.com/kr/privacy-policy`

## Automation Standards

- Write tests from the user's perspective and assert visible outcomes.
- Prefer Playwright locators in this order: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`, `getByTestId`, then CSS only as a documented fallback.
- Use Page Object Model classes under `tests/pom` for page actions and reusable assertions.
- Keep tests isolated and parallel-safe. Do not depend on test order.
- Use Playwright web-first assertions and avoid `page.waitForTimeout()`.
- Use Playwright `request` for direct API contract checks. Keep production API tests read-only unless explicitly tagged `@destructive`.
- Use `BASE_URL=https://www.musticker.com/kr` for production-safe runs.
- Tag tests for selective execution: `@smoke`, `@regression`, `@production`, `@mobile`, `@auth`, `@api`, `@purchasing`, `@validation`, `@destructive`, `@slow`.
- Do not create orders, submit payments, or mutate durable production data unless the test is explicitly tagged `@destructive` and guarded by environment variables.
- Keep credentialed authentication checks optional and skip them unless `AUTH_TEST_EMAIL` and `AUTH_TEST_PASSWORD` are provided.

## Recommended Test Data

- Public anonymous user for discovery, navigation, FAQ, inquiry validation, search, product configuration, and cart UI checks.
- Seeded member only for `@auth` and account/cart persistence tests.
- Credentialed auth tests should use a non-admin seeded member with no saved payment method and no sensitive production data.
- Disposable dev member only for full registration, checkout, upload, and payment regression.
- Runtime-generated PNG/PDF/ZIP files for upload validation.

## Test Case Matrix

| ID | Area | Tags | Scenario | Priority |
| --- | --- | --- | --- | --- |
| MS-V2-001 | Home | `@smoke @production` | Homepage loads with primary hero, product nav, CTA buttons, reviews, inquiry entry, and footer | P0 |
| MS-V2-002 | Header | `@smoke @production` | Header navigation opens product categories from home | P0 |
| MS-V2-003 | Search | `@smoke @production` | Search opens from header and returns relevant product/content results | P0 |
| MS-V2-004 | Cart | `@smoke @production` | Empty cart opens from header and shows a non-broken empty state | P0 |
| MS-V2-005 | Account | `@smoke @production` | Account icon routes anonymous users to authentication without console/page failure | P0 |
| MS-V2-006 | Category | `@regression @production` | Sticker category lists all scanned sticker product links | P1 |
| MS-V2-007 | Category | `@regression @production` | Roll sticker category lists all scanned roll product links | P1 |
| MS-V2-008 | Category | `@regression @production` | Sheet sticker category lists all scanned sheet product links | P1 |
| MS-V2-009 | Product | `@regression @production @purchasing` | Die-cut sticker detail supports size and quantity selection with recalculated price | P0 |
| MS-V2-010 | Product | `@regression @production @purchasing` | Die-cut roll sticker detail supports size and quantity selection with recalculated price | P0 |
| MS-V2-011 | Product | `@regression @production @purchasing` | Die-cut sheet sticker detail supports material, sheet size, and quantity selection | P0 |
| MS-V2-012 | Product | `@validation @production` | Product custom size and custom quantity controls validate required/min/max inputs | P1 |
| MS-V2-013 | Product | `@regression @production` | Product page delivery/free-shipping/production promise copy is visible | P1 |
| MS-V2-014 | Product | `@regression @production` | Product page reviews carousel advances and returns without losing content | P2 |
| MS-V2-015 | FAQ | `@smoke @production` | FAQ page loads category topics and expands common questions | P0 |
| MS-V2-016 | FAQ | `@regression @production` | FAQ search filters or surfaces matching FAQ content | P1 |
| MS-V2-017 | Inquiry | `@validation @production` | Inquiry form validates required fields before submission | P0 |
| MS-V2-018 | Inquiry | `@validation @production` | Inquiry form accepts supported attachment types and rejects unsupported/oversized files | P1 |
| MS-V2-019 | External Links | `@regression @production` | Kakao and Naver inquiry links open expected external destinations | P2 |
| MS-V2-020 | Legal/Footer | `@smoke @production` | Footer business details, phone, email, terms, privacy, and FAQ links are visible | P0 |
| MS-V2-021 | Localization | `@regression @production` | Korean locale selector is visible and does not break the current page | P2 |
| MS-V2-022 | Mobile | `@smoke @production @mobile` | Core home, nav, search, cart, and inquiry flows work on mobile viewport | P0 |
| MS-V2-023 | Accessibility | `@regression @production` | Main interactive controls have accessible names and keyboard focus behavior | P1 |
| MS-V2-024 | Visual | `@visual @production` | Home, category, product, FAQ, and inquiry drawer visual snapshots stay stable | P2 |
| MS-V2-025 | Checkout | `@e2e @destructive @slow` | Dev-only anonymous/member product-to-checkout flow with upload and order placement | P0 |
| MS-V2-026 | Auth | `@smoke @production @auth` | Login entry opens from account navigation and renders the authentication screen | P0 |
| MS-V2-027 | Auth | `@smoke @production @auth` | Login form exposes usable email, password, submit, register, and recovery controls | P0 |
| MS-V2-028 | Auth | `@validation @production @auth` | Login form blocks blank required fields with user-facing validation | P0 |
| MS-V2-029 | Auth | `@validation @production @auth` | Login form rejects malformed email input without starting an auth session | P1 |
| MS-V2-030 | Auth | `@validation @production @auth` | Invalid credentials show a safe failure message and keep the user anonymous | P0 |
| MS-V2-031 | Auth | `@regression @production @auth` | Password field remains masked or the visibility toggle works without exposing credentials in the URL | P1 |
| MS-V2-032 | Auth | `@regression @production @auth` | Forgot-password entry opens recovery flow and validates blank/invalid email safely | P1 |
| MS-V2-033 | Auth | `@regression @production @auth` | Register entry is reachable from login without creating a production account | P1 |
| MS-V2-034 | Auth | `@smoke @production @auth @credentialed` | Valid seeded member credentials log in and reveal member-only account state | P0 |
| MS-V2-035 | Auth | `@regression @production @auth @credentialed` | Authenticated session persists across reload/navigation and logout clears the session | P0 |
| MS-V2-036 | API | `@smoke @production @api` | Navigation categories API returns public category data used by the storefront | P0 |
| MS-V2-037 | API | `@smoke @production @api` | Inquiry types API returns selectable inquiry metadata without requiring login | P1 |
| MS-V2-038 | API | `@smoke @production @api` | Anonymous user session API rejects unauthenticated users safely | P0 |
| MS-V2-039 | About | `@smoke @production` | About page loads hero, sub-nav anchors, stats, and CTAs | P2 |
| MS-V2-040 | Catalog | `@regression @production` | Every sitemap product detail page not already covered loads with a heading and options panel | P1 |
| MS-V2-041 | Checkout | `@regression @production` | Checkout page (reached via cart) renders shipping fields, payment method options, and order summary without submitting | P1 |
| MS-V2-042 | Checkout | `@validation @production` | Checkout blocks payment submission when required shipping/contact fields are blank | P1 |
| MS-V2-043 | Errors | `@regression @production` | Unknown route redirects safely to the homepage instead of showing a broken page | P2 |
| MS-V2-044 | Auth | `@regression @production` | Re-verification of MS-V2-031 password visibility toggle against current production behavior | P1 |

## Detailed Test Cases

### MS-V2-001 - Homepage Critical Content

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Assert page title contains `머스티커`.
3. Assert hero heading `스티커ㅋㅋㅋ, 이유가 있구나` is visible.
4. Assert product category links `스티커`, `롤스티커`, and `시트 스티커` are visible.
5. Assert CTAs `빠른 주문`, `바로 주문하기`, and `제작 문의하기` are visible.
6. Assert reviews section with `사진 후기 225개` is visible.
7. Assert footer includes `MUSTICKER / 머스티커`, `1899-5529`, `sales@musticker.com`, `이용약관`, and `개인정보처리방침`.

Expected result: Homepage renders complete public content without client error.

Automation notes: Use `HomePage` POM and `expect(page.getByRole('heading', { name: /스티커/ })).toBeVisible()`.

### MS-V2-002 - Header Product Navigation

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Click `스티커`; assert URL includes `/stickers` and heading `스티커`.
3. Return to home.
4. Click `롤스티커`; assert URL includes `/roll-stickers` and heading `롤스티커`.
5. Return to home.
6. Click `시트 스티커`; assert URL includes `/sheet-stickers` and heading `시트 스티커`.

Expected result: Header/category navigation routes to the correct category pages.

Automation notes: Use role links. Avoid asserting exact full URL when locale or query params may be present.

### MS-V2-003 - Header Search

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Open header search using accessible name `layout.header.search`.
3. Search for `홀로그램`.
4. Assert relevant results or product links are visible.
5. Select a result.

Expected result: Search opens, accepts text, returns matching content, and navigates to a relevant page.

Automation notes: If the search button keeps the translation key as its accessible name, add a product-facing aria label in the app and prefer that selector.

### MS-V2-004 - Empty Cart Drawer/Page

Preconditions: Anonymous clean browser context.

Steps:

1. Navigate to `/`.
2. Click `장바구니`.
3. Assert cart drawer or cart page is visible.
4. Assert empty-state copy or disabled checkout state is visible.
5. Close the cart, if shown as a drawer.

Expected result: Anonymous empty cart can be opened and closed without error.

Automation notes: Use `CartDrawer` or `CartPage` POM. Start each cart test in a fresh context.

### MS-V2-005 - Anonymous Account Entry

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Click `계정`.
3. Assert login/register page or auth modal is shown.
4. Assert email and password fields or registration controls are visible.

Expected result: Account entry leads anonymous users to authentication.

Automation notes: Tag with `@auth`, but keep production version read-only.

### MS-V2-006 - Sticker Category Product Discovery

Preconditions: Anonymous session.

Steps:

1. Navigate to `/stickers`.
2. Assert heading `스티커`.
3. Assert product links are visible: `자유형 스티커`, `원형 스티커`, `직사각형 스티커`, `정사각형 스티커`, `타원형 스티커`, `둥근 사각 스티커`, `키스컷 스티커`, `커스텀 시트 스티커`, `투명 스티커`, `홀로그램 스티커`, `풀 컬러 레터링 스티커`, `레터링 스티커`.
4. Click representative product `자유형 스티커`.
5. Assert product page heading is visible.

Expected result: Sticker category exposes all expected product routes.

Automation notes: Parameterize product link assertions from a fixture array.

### MS-V2-007 - Roll Sticker Category Product Discovery

Preconditions: Anonymous session.

Steps:

1. Navigate to `/roll-stickers`.
2. Assert heading `롤스티커`.
3. Assert product links are visible: `자유형 롤 스티커`, `투명 롤 스티커`, `원형 롤 스티커`, `정사각형 롤 스티커`, `직사각형 롤 스티커`, `둥근 사각 롤 스티커`, `타원형 롤 스티커`, `아트지 롤 스티커`.
4. Click representative product `자유형 롤 스티커`.
5. Assert product page heading is visible.

Expected result: Roll sticker category exposes all expected product routes.

Automation notes: Run across desktop and mobile projects.

### MS-V2-008 - Sheet Sticker Category Product Discovery

Preconditions: Anonymous session.

Steps:

1. Navigate to `/sheet-stickers`.
2. Assert heading `시트 스티커`.
3. Assert product links are visible: `자유형 시트 스티커`, `원형 시트 스티커`, `타원형 시트 스티커`, `정사각형 시트 스티커`, `직사각형 시트 스티커`, `둥근 사각 시트 스티커`.
4. Click representative product `자유형 시트 스티커`.
5. Assert product page heading is visible.

Expected result: Sheet sticker category exposes all expected product routes.

Automation notes: Use `getByRole('link', { name })`; do not use product card CSS.

### MS-V2-009 - Die-Cut Sticker Configuration

Preconditions: Anonymous session.

Steps:

1. Navigate to `/stickers/die-cut-sticker`.
2. Assert heading `자유형 스티커`.
3. Select size `중형 75x75`.
4. Select quantity `100개`.
5. Assert price updates from the default price.
6. Assert per-unit price is visible.
7. Click `다음 단계`.
8. Assert the next step, upload modal, cart transition, or auth/checkout gate appears.

Expected result: Product options update the order summary and allow progression.

Automation notes: Use web-first assertions on price text. Avoid exact price assertions unless backed by stable fixture pricing.

### MS-V2-010 - Die-Cut Roll Sticker Configuration

Preconditions: Anonymous session.

Steps:

1. Navigate to `/roll-stickers/die-cut-roll`.
2. Assert heading `자유형 롤 스티커`.
3. Select size `중형 75x75`.
4. Select quantity `300개`.
5. Assert price and per-unit price are visible.
6. Click `다음 단계`.

Expected result: Roll sticker configuration accepts selected options and progresses.

Automation notes: Share product option helpers with sticker product tests.

### MS-V2-011 - Die-Cut Sheet Sticker Configuration

Preconditions: Anonymous session.

Steps:

1. Navigate to `/sheet-stickers/die-cut-sheet`.
2. Assert heading `자유형 시트 스티커`.
3. Select material `투명`.
4. Select sheet size `A5 148x210`.
5. Select quantity `50시트`.
6. Assert template download and layout guide controls are visible.
7. Click `다음 단계`.

Expected result: Sheet-specific material, sheet size, and quantity controls work together.

Automation notes: Keep sheet configuration in a dedicated POM method because the option model differs from ordinary stickers.

### MS-V2-012 - Custom Size and Quantity Validation

Preconditions: Anonymous session.

Steps:

1. Navigate to representative product page.
2. Open `원하는 크기 입력`.
3. Attempt to apply blank, non-numeric, too-small, and too-large width/height values.
4. Assert validation feedback and no invalid price calculation.
5. Open `원하는 수량 입력`.
6. Attempt to apply blank, non-numeric, zero, and unsupported values.
7. Assert validation feedback and no invalid progression.

Expected result: Invalid custom values are rejected with user-facing feedback.

Automation notes: Prefer labels/placeholders inside the custom option modal. Use parameterized edge cases.

### MS-V2-013 - Production Promise Content

Preconditions: Anonymous session.

Steps:

1. Navigate to representative product page.
2. Assert `5만원 이상 무료배송` is visible.
3. Assert `3시 이전 시안 확정 시 당일배송` is visible.
4. Assert delivery estimate with courier `CJ 대한통운` is visible when available.
5. Assert `오늘제작, 내일발송`, `빠른 시안 피드백`, and `뛰어난 내구성과 내수성` are visible.

Expected result: Product trust and delivery information is present.

Automation notes: Date-specific delivery text should be regex-based, not hardcoded.

### MS-V2-014 - Reviews Carousel

Preconditions: Anonymous session.

Steps:

1. Navigate to representative product or home page.
2. Assert reviews section is visible.
3. Capture the first visible review author or text.
4. Click `다음 리뷰`.
5. Assert a different review appears or carousel position changes.
6. Click `이전 리뷰`.
7. Assert the previous content returns.

Expected result: Reviews carousel controls work without hiding all reviews.

Automation notes: Use soft assertions for individual review text because live review content can change.

### MS-V2-015 - FAQ Topic Expansion

Preconditions: Anonymous session.

Steps:

1. Navigate to `/faq`.
2. Assert hero heading/copy `도움이 필요하신가요?`.
3. Assert topic tabs/buttons `멤버십`, `주문`, `디자인 파일 업로드`, `인쇄`, `결제`, `반품/환불`.
4. Click `주문`.
5. Expand `비회원으로도 주문이 가능한가요?`.
6. Assert an answer panel is visible.

Expected result: FAQ categories and accordions are usable.

Automation notes: Use button roles for accordion headers.

### MS-V2-016 - FAQ Search

Preconditions: Anonymous session.

Steps:

1. Navigate to `/faq`.
2. Fill search input `궁금한 사항을 입력해주세요.` with `쿠폰`.
3. Assert matching FAQ results include coupon-related questions.
4. Clear the input.
5. Assert the default FAQ list returns.

Expected result: FAQ search narrows and resets results.

Automation notes: If filtering is debounce-based, assert result changes with Playwright auto-retrying expectations.

### MS-V2-017 - Inquiry Required Field Validation

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Open `1:1문의하기` or `제작 문의하기`.
3. Click `문의하기` with all fields blank.
4. Assert required validation for inquiry type, name, email, and message.
5. Fill invalid email format.
6. Assert email validation is shown.

Expected result: Inquiry cannot submit incomplete or invalid data.

Automation notes: Keep production-safe by not submitting a valid inquiry.

### MS-V2-018 - Inquiry Attachment Validation

Preconditions: Anonymous session and generated local fixture files.

Steps:

1. Open inquiry form.
2. Attach allowed file types one at a time: `.eps`, `.ai`, `.psd`, `.pdf`, `.tif`, `.tiff`, `.zip`, `.png`, `.jpg`.
3. Assert accepted files are displayed.
4. Attempt more than 4 files.
5. Assert max-file validation.
6. Attempt unsupported file type and file set over 50MB.
7. Assert validation feedback.

Expected result: Inquiry upload follows documented constraints: max 4 files and total 50MB.

Automation notes: Run oversized fixture generation only in local/dev CI where disk cost is acceptable.

### MS-V2-019 - External Inquiry Links

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Click `카카오채널로 문의하기`.
3. Assert a new page opens with host `pf.kakao.com`.
4. Return and click `네이버 톡톡 으로 문의하기`.
5. Assert a new page opens with host `talk.naver.com`.

Expected result: External support links open the correct third-party destinations.

Automation notes: Use `page.waitForEvent('popup')`; do not interact with third-party pages beyond host assertion.

### MS-V2-020 - Footer Legal and Business Links

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Assert footer business information is visible.
3. Click `이용약관`.
4. Assert URL includes `/terms-of-use`.
5. Navigate back and click `개인정보처리방침`.
6. Assert URL includes `/privacy-policy`.
7. Navigate back and click `자주 묻는 질문`.
8. Assert URL includes `/faq`.

Expected result: Footer legal and support links are reachable.

Automation notes: Use accessible link names and URL regex assertions.

### MS-V2-021 - Locale Selector

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Locate `KR` locale control.
3. Open the locale selector.
4. Assert current locale remains available.
5. Close selector without changing locale.

Expected result: Locale control is visible and does not break navigation.

Automation notes: If only Korean is supported in production, assert stability rather than alternate locales.

### MS-V2-022 - Mobile Critical Flow

Preconditions: Anonymous session using mobile Chromium project.

Steps:

1. Navigate to `/`.
2. Assert hero and category navigation are visible or reachable through mobile menu.
3. Open search.
4. Open cart.
5. Navigate to `/stickers/die-cut-sticker`.
6. Select size and quantity.
7. Open inquiry form.

Expected result: Critical anonymous flows remain usable on mobile.

Automation notes: Use the configured `chromium-mobile` project and avoid desktop-only assumptions.

### MS-V2-023 - Keyboard and Accessibility Smoke

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Use keyboard tabbing through header controls.
3. Assert focus reaches search, cart, account, product category links, and main CTA.
4. Press Enter on search and assert it opens.
5. Press Escape and assert modal/drawer closes.

Expected result: Core controls are keyboard reachable and operable.

Automation notes: Prefer role/name assertions. Track untranslated accessible names as bugs.

### MS-V2-024 - Visual Snapshot Coverage

Preconditions: Stable production or controlled visual baseline environment.

Steps:

1. Capture full-page screenshots for home, sticker category, roll category, sheet category, representative product, FAQ, and inquiry drawer.
2. Compare against approved baselines.
3. Fail only on meaningful visual regressions.

Expected result: Major layout regressions are detected.

Automation notes: Keep visual tests separate from smoke because live reviews and notices can change.

### MS-V2-025 - Dev-Only Full Product-to-Checkout Flow

Preconditions: Dev/staging environment, disposable account or seeded member, upload fixture, payment sandbox enabled.

Steps:

1. Register or log in as test user.
2. Navigate to representative product page.
3. Configure size, material if applicable, and quantity.
4. Continue to upload step.
5. Upload traceable artwork file.
6. Add configured product to cart.
7. Proceed to checkout.
8. Fill shipping/contact information.
9. Use sandbox payment method.
10. Assert order confirmation page displays matching order details.
11. Clean up created test data where API support exists.

Expected result: Full purchase journey succeeds in non-production test environment.

Automation notes: Tag `@destructive @slow @payment`; guard with `RUN_PAYMENT_E2E=true`.

### MS-V2-026 - Login Entry From Account Navigation

Preconditions: Anonymous session.

Steps:

1. Navigate to `/`.
2. Click the account/member icon or link in the header.
3. Assert the page routes to login or an authentication modal opens.
4. Assert the auth surface has a clear login heading or form region.
5. Assert no console/page error is raised during the transition.

Expected result: Anonymous users can reach authentication from the storefront header.

Automation notes: Use `HeaderComponent` and a new `LoginPage` POM. Prefer role/name selectors and URL regex checks over implementation-specific selectors.

### MS-V2-027 - Login Form Controls

Preconditions: Anonymous session.

Steps:

1. Navigate directly to the discovered login route or open it from the account entry.
2. Assert the email or username field is visible and editable.
3. Assert the password field is visible and has password masking.
4. Assert the login submit button is visible.
5. Assert register/signup and forgot-password recovery entries are visible when offered by the UI.
6. Assert social login buttons are visible if they are part of the public login page.

Expected result: The login page exposes the expected controls with accessible names.

Automation notes: Do not click social login providers in production automation. Only verify the entry points are present.

### MS-V2-028 - Blank Login Validation

Preconditions: Anonymous session.

Steps:

1. Open the login page.
2. Submit the form with both fields blank.
3. Assert required-field validation appears or focus moves to the first invalid field.
4. Assert the user remains on the login/auth route.

Expected result: Blank login attempts are blocked before authentication is attempted.

Automation notes: Use Playwright web-first assertions for validation text, `aria-invalid`, or focused invalid controls.

### MS-V2-029 - Malformed Email Login Validation

Preconditions: Anonymous session.

Steps:

1. Open the login page.
2. Fill the email field with `not-an-email`.
3. Fill the password field with any non-secret dummy value.
4. Submit the form.
5. Assert email-format validation appears.
6. Assert no authenticated member UI appears.

Expected result: Malformed email input is rejected and does not create a session.

Automation notes: Avoid asserting exact validation copy unless the copy is stable. Prefer regex or invalid-control state.

### MS-V2-030 - Invalid Credentials Handling

Preconditions: Anonymous session.

Steps:

1. Open the login page.
2. Fill the email field with a reserved invalid address such as `invalid-login-e2e@example.com`.
3. Fill the password field with a reserved invalid password.
4. Submit the form.
5. Assert a generic login failure message is visible.
6. Assert the URL, cookies, local storage, and header still reflect an anonymous user.

Expected result: Invalid credentials fail safely without exposing whether the email exists.

Automation notes: Keep retry count low for this test to avoid account lockout behavior. Never use a real customer email for negative testing.

### MS-V2-031 - Password Masking And Visibility

Preconditions: Anonymous session.

Steps:

1. Open the login page.
2. Fill the password field with a dummy value.
3. Assert the password input is masked by default.
4. If a visibility toggle exists, click it and assert the input switches visibility.
5. Click the toggle again and assert the input returns to masked mode.
6. Assert the password value is not written into the URL.

Expected result: Password entry behaves securely and predictably.

Automation notes: Implement conditional assertions only around optional visibility controls; the baseline password masking check should always run. Current production observation on 2026-08-10: the visibility toggle is rendered but does not change the password input from masked to visible, so the automated test is tracked as `fixme` until the product behavior is corrected.

### MS-V2-032 - Forgot Password Flow

Preconditions: Anonymous session.

Steps:

1. Open the login page.
2. Click the forgot-password/recovery entry.
3. Assert the recovery route or modal is shown.
4. Submit the recovery form blank.
5. Assert required-field validation appears.
6. Fill a malformed email and assert format validation appears.

Expected result: Password recovery is reachable and validates inputs without sending a real recovery request.

Automation notes: Do not submit a valid email address in production unless a disposable inbox and cleanup policy are provided.

### MS-V2-033 - Register Entry From Login

Preconditions: Anonymous session.

Steps:

1. Open the login page.
2. Click the register/signup entry.
3. Assert the registration route or modal is shown.
4. Assert core registration fields or social registration options are visible.
5. Navigate back to login.
6. Assert the login form is restored.

Expected result: Users can discover registration from login without accidentally creating an account.

Automation notes: Keep production automation read-only. Full registration belongs in dev/staging with disposable test data.

### MS-V2-034 - Valid Seeded Member Login

Preconditions: `AUTH_TEST_EMAIL` and `AUTH_TEST_PASSWORD` are configured for a non-admin seeded member.

Steps:

1. Open the login page.
2. Fill the configured email and password.
3. Submit the form.
4. Assert login succeeds by checking member-only header/account state.
5. Assert anonymous login/register prompts are no longer primary account actions.
6. Save authenticated storage state only for downstream credentialed tests in the same CI run.

Expected result: Seeded member credentials authenticate successfully and expose member UI.

Automation notes: Skip this test when credentials are absent. Never print credential values in logs, screenshots, traces, or assertion messages.

Production observation on 2026-08-10: valid member login succeeds with `POST /sys/kr/auth/login` 200, followed by `GET /sys/kr/user/me` 200 and the `로그인에 성공했습니다.` toast. The login page should wait for Nuxt hydration and bootstrap API responses before filling credentials.

### MS-V2-035 - Session Persistence And Logout

Preconditions: Authenticated seeded member session from `MS-V2-034`.

Steps:

1. Log in with `AUTH_TEST_EMAIL` and `AUTH_TEST_PASSWORD`.
2. Reload the page.
3. Navigate to home and a product page.
4. Assert member account state persists.
5. Open the account menu and click logout.
6. Assert the header returns to anonymous account state.
7. Attempt to open a member-only account page, if available.
8. Assert the user is redirected to login or shown an auth gate.

Expected result: Login persists during normal browsing and logout fully clears the authenticated session.

Automation notes: Keep this isolated in a fresh browser context and clear storage after the test.

### MS-V2-036 - Public Navigation Categories API

Preconditions: Anonymous API request context.

Steps:

1. Send `GET /index.php/sys/kr/navigation/categories` against `API_BASE_URL`.
2. Assert the response is 2xx.
3. Assert the response content type is JSON.
4. Assert the payload is not empty.
5. Assert the payload includes known storefront category slugs such as `stickers`, `roll-stickers`, or `sheet-stickers`.

Expected result: Public navigation category metadata is available for storefront bootstrap.

Automation notes: Use Playwright `request`. Do not require browser UI setup for this test.

### MS-V2-037 - Public Inquiry Types API

Preconditions: Anonymous API request context.

Steps:

1. Send `GET /index.php/sys/kr/inquiry/types` against `API_BASE_URL`.
2. Assert the response is 2xx.
3. Assert the response content type is JSON.
4. Assert the payload is not empty.

Expected result: Inquiry type metadata is available without login so the inquiry form can render its selectable options.

Automation notes: Keep assertions schema-light unless the API team publishes a stable response contract.

### MS-V2-038 - Anonymous User Session API Boundary

Preconditions: Anonymous API request context.

Steps:

1. Send `GET /index.php/sys/kr/user/me` against `API_BASE_URL` without credentials.
2. Assert the response status is `401`.
3. Assert the response body does not expose stack traces, SQL details, or raw exception text.

Expected result: The session endpoint rejects anonymous callers cleanly without leaking implementation details.

Automation notes: This is a production-safe negative API check. Authenticated `200` coverage belongs with credentialed auth tests.

### MS-V2-039 - About Page Content

Preconditions: Anonymous session.

Steps:

1. Navigate to `/about`.
2. Assert the hero heading containing `우리가 만드는 것은` is visible.
3. Assert stats `10년+` and `수십만 건` are visible.
4. Assert sub-nav buttons `왜 만들었나`, `우리의 철학`, `왜 빠른가`, and `우리가 가는 길` are visible.
5. Assert CTA buttons `우리의 이야기 보기` and `바로 주문하기` are visible.
6. Assert footer brand and terms/privacy links are visible.

Expected result: The About page renders its full public content without client error.

Automation notes: Use `AboutV2Page` POM. Discovered via sitemap.xml on 2026-08-11; previously untested.

### MS-V2-040 - Full Catalog Crawl

Preconditions: Anonymous session.

Steps:

1. For each product path listed in `sitemap.xml` that is not already deep-tested by `v2Products` (23 pages across sticker/roll/sheet shape variants, hologram, lettering, and sheet products), navigate directly to the page.
2. Assert the URL did not silently redirect elsewhere (guards against the same silent-redirect behavior observed for unknown routes in MS-V2-043).
3. Assert a level-1 heading is visible.
4. Assert the product options panel is visible.

Expected result: Every catalog product page renders independently, not only when reached through its category listing link.

Automation notes: One parameterized test per path via `ProductV2Page.expectCatalogEntryRenders()`, tagged `@regression`. This is render-only coverage (heading + options panel), not full size/quantity configuration — that remains covered by the 3 representative products in `product-config.spec.ts`.

### MS-V2-041 - Checkout Page Renders

Preconditions: Anonymous session with one item added to cart.

Steps:

1. Configure the representative die-cut sticker product (size + quantity) and click `장바구니 담기` in the next-step dialog. Production observation on 2026-08-11: adding to cart does **not** require a design file upload first — the dialog explicitly says the file can be uploaded later from the cart or post-checkout dashboard.
2. Navigate to `/checkout`.
3. Assert contact email, name, and postal code fields are visible.
4. Assert Kakao Pay and credit card payment method options are visible.
5. Assert the order summary shows a coupon-discount line.
6. Assert the `결제하기` (pay) button is visible. Do not click it.

Expected result: The checkout page renders its full shipping/payment form for a real (non-empty) cart, entirely without submitting.

Automation notes: Confirmed live that navigating directly to `/checkout` with an **empty** cart redirects to `/cart` (see MS-V2-004), so this test must add an item to cart first via the new `ProductV2Page.addToCart()` helper.

### MS-V2-042 - Checkout Blank Submission Blocked

Preconditions: Anonymous session with one item added to cart (same setup as MS-V2-041).

Steps:

1. Reach the checkout page with a populated cart and all shipping/contact fields left blank.
2. Click `결제하기`.
3. Assert the page stays on `/checkout` (no navigation to a payment gateway or confirmation page).
4. Assert a validation/error indicator becomes visible.

Expected result: Checkout cannot proceed to payment when required fields are blank.

Automation notes: This replaces an originally-planned "invalid coupon code" test. Production observation on 2026-08-11: no manual coupon-code input exists on the anonymous checkout page (only a static "쿠폰 할인" summary line), so that scenario isn't testable as scoped. Confirmed via network capture that clicking pay while blank fires no order/payment API call — only page-load bootstrap calls (`coupon/applicable`, `shipping/shipping-methods-local`, `address/validate`).

### MS-V2-043 - Unknown Route Handling

Preconditions: Anonymous session.

Steps:

1. Navigate to a nonsense path under the current locale (e.g. `/this-page-does-not-exist-e2e-check`).
2. Assert the response status is not a server error.
3. Assert the homepage hero heading is visible.

Expected result: Unknown routes fail safely.

Automation notes: Production observation on 2026-08-11: there is **no dedicated 404 page** — the app silently redirects unknown `/kr/*` routes to the bare-domain homepage with a `200` status. The test asserts that verified redirect-to-home behavior, not a 404 page.

### MS-V2-044 - Password Visibility Toggle Re-Verification

Preconditions: Anonymous session.

Steps:

1. Re-run MS-V2-031 against current production.
2. Confirm the password input's `type` attribute transitions password → text → password across two toggle clicks.

Expected result: The visibility toggle behaves correctly.

Automation notes: Production observation on 2026-08-11: masked → visible → masked all confirmed via a live browser check. The bug noted in the MS-V2-031 automation notes on 2026-08-10 (toggle rendered but did not unmask) is no longer reproducible, so the `test.fixme` on MS-V2-031 has been removed rather than kept.

## Suggested Spec Organization

- `tests/e2e/smoke/storefront-smoke.spec.ts`
- `tests/e2e/api/public-api.spec.ts`
- `tests/e2e/auth/login.spec.ts`
- `tests/e2e/discovery/category-discovery.spec.ts`
- `tests/e2e/purchasing/product-config.spec.ts`
- `tests/e2e/validation/inquiry-validation.spec.ts`
- `tests/e2e/discovery/faq.spec.ts`
- `tests/e2e/smoke/mobile-critical.spec.ts`
- `tests/e2e/regression/accessibility.spec.ts`
- `tests/e2e/regression/visual.spec.ts`
- `tests/e2e/discovery/about.spec.ts`
- `tests/e2e/discovery/catalog-crawl.spec.ts`
- `tests/e2e/purchasing/checkout-page.spec.ts`
- `tests/e2e/regression/error-pages.spec.ts`

## Suggested POM Updates

- `HomePage`: hero, category links, review carousel, inquiry CTA, footer assertions.
- `HeaderComponent`: search, cart, account, locale, product navigation.
- `LoginPage`: open, fill credentials, submit, assert validation, assert anonymous/authenticated state, open recovery, open registration.
- `ProductPage`: select size, custom size, select quantity, custom quantity, material selection, price summary, next step, add to cart, catalog-entry render check.
- `InquiryForm`: open, choose inquiry type, fill fields, attach files, assert validation, cancel.
- `FaqPage`: search, select topic, expand question, assert answer.
- `AboutPage`: hero/stats assertions, sub-nav visibility, CTA visibility, footer assertions.
- `CheckoutPage`: open, assert form renders, assert blank-submission is blocked.

## Production-Safe Command Examples

```powershell
npm.cmd run test:prod:smoke
npm.cmd run test:api
npm.cmd run test:prod:full
npm.cmd run test:prod:mobile
```

## Credentialed Auth Command Examples

```powershell
$Env:AUTH_TEST_EMAIL = "seeded-member@example.com"
$Env:AUTH_TEST_PASSWORD = "replace-with-secret"
npx.cmd playwright test tests/e2e/auth/login.spec.ts --grep "@credentialed" --project chromium-desktop
```

## Dev/Destructive Command Examples

```powershell
$Env:RUN_PAYMENT_E2E = "true"
$Env:SKIP_SEEDED_AUTH_SETUP = "true"
npm.cmd run test:e2e:member-regression
```
