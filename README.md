# Reinstate GBP

Marketing site for Reinstate GBP — a service that gets suspended Google Business Profiles
reinstated. The site has one job: get a business owner with a suspended listing to submit the
contact form or call the phone number.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and MDX. No CMS — all editable
copy lives in typed TypeScript files under `src/data/`.

---

## Getting started

```bash
npm install
```

Copy the environment template and fill it in:

```bash
cp .env.example .env.local
```

Then:

```bash
npm run dev
```

The site runs at http://localhost:3000.

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                    |
| `npm run build`     | Production build                              |
| `npm start`         | Serve the production build                    |
| `npm run lint`      | ESLint (zero warnings expected)               |
| `npm run typecheck` | `tsc --noEmit`                                |

> **Note:** don't run `npm run build` while `npm run dev` is running — they share `.next` and
> the build will break the dev server. Stop dev first, or `rm -rf .next` afterwards.

### Environment variables

All documented in [`.env.example`](.env.example).

| Variable                | Required        | Purpose                                                             |
| ----------------------- | --------------- | ------------------------------------------------------------------- |
| `CONTACT_EMAIL`         | for the form    | Inbox(es) receiving leads — comma separated for more than one. `Reply-To` is the submitter. |
| `MAIL_FROM`             | recommended     | Sender address on outgoing mail. Defaults to `SMTP_USER` for SMTP.   |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | option A | Send through a mailbox you already own. |
| `RESEND_API_KEY`        | option B        | Send via Resend instead. Takes precedence if both are configured.    |
| `NEXT_PUBLIC_GTM_ID`    | no              | Google Tag Manager container. Omit to disable GTM (useful locally).  |
| `NEXT_PUBLIC_SITE_URL`  | for production  | Absolute origin, no trailing slash. Drives canonicals, OG, sitemap and RSS. |

### Making the contact form send

Delivery is a chain, tried in order and stopped at the first success. Both routes reach the
same inbox, so running them together would send every lead twice.

1. **Formspree** — primary. Dashboard, spam filtering, submission history.
2. **Email** — SMTP or Resend, used only if Formspree fails or hits its monthly cap.
3. **Recovery log** — if everything fails, the lead is written to the server log.

The spreadsheet webhook (below) is separate again: it runs *alongside* the chain, because it is
a different destination rather than an alternative one.

#### Formspree (currently the only configured channel)

```
FORMSPREE_PROJECT_ID=3073603482452754274
FORMSPREE_FORM_KEY=contact
```

This is a **project-style** form, so the endpoint is `/p/<projectId>/f/<formKey>` and there is
no hashid — that is why one cannot be found in the dashboard. Dashboard-style forms set
`FORMSPREE_FORM_ID` instead (a bare hashid or a full URL).

Where the lead is emailed is configured in [`formspree.json`](formspree.json), not in the
environment. To change the recipient, edit that file and redeploy:

```bash
npx --yes @formspree/cli deploy -k "$FORMSPREE_DEPLOY_KEY"
```

The deploy key only authorises overwriting the project's form configuration. **It is not a
submission credential**: the site never reads it, it must never be committed, and it does not
belong in the production environment.

**Two current limitations, both worth knowing:**

- **No confirmation email reaches the visitor.** Formspree's `autoresponse` action is a paid
  feature — the API rejects it with *"Your plan doesn't support autoresponse"* — and the SMTP
  fallback is currently unconfigured, so nothing sends one. The on-screen confirmation
  deliberately promises a human reply rather than an email, so the site stays honest. Configure
  SMTP or upgrade the plan to change this.
- **Formspree's free plan caps monthly submissions.** With no fallback configured, the
  submission after the cap is reached fails and the visitor is shown the phone number. The lead
  is still written to the log, and the cause is logged as `FORMSPREE_QUOTA_REACHED` so it is
  distinguishable from an ordinary failure at a glance.

#### Google Sheets, via Apps Script

1. Create a spreadsheet. **Extensions → Apps Script.**
2. Replace everything in `Code.gs` with the script below and set your own `SECRET`.
3. **Deploy → New deployment → Web app.** Set *Execute as* **Me** and *Who has access*
   **Anyone**. "Anyone with a Google account" will not work — the POST gets a login redirect
   instead of reaching the script.
4. Authorise it. Google shows "hasn't verified this app" for your own scripts: **Advanced →
   Go to (unsafe)**.
5. Copy the deployment's **`/exec`** URL (not `/dev`), append `?secret=...`, and set that as
   `LEAD_WEBHOOK_URL`.

```js
const SECRET = 'REPLACE_WITH_A_LONG_RANDOM_STRING';
const SHEET_NAME = 'Leads';
const HEADERS = ['Received', 'Name', 'Email', 'Phone', 'Message'];

function doPost(e) {
  try {
    if (!e || !e.parameter || e.parameter.secret !== SECRET) {
      return json({ ok: false, error: 'forbidden' });
    }

    const lead = JSON.parse(e.postData.contents);

    // Two submissions arriving together must not claim the same row.
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.setFrozenRows(1);
      }

      sheet.appendRow([
        lead.receivedAt || new Date().toISOString(),
        lead.fullName || '',
        lead.email || '',
        lead.phone || '',
        lead.message || '',
      ]);
    } finally {
      lock.releaseLock();
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

The script creates the `Leads` tab and its header row on the first submission, so there is
nothing to set up in the sheet by hand.

**Test it on its own before wiring the site to it** — this isolates Apps Script problems from
site problems:

```bash
curl -L -X POST "https://script.google.com/macros/s/XXXX/exec?secret=YOUR_SECRET" \
  -H 'Content-Type: application/json' \
  -d '{"receivedAt":"2026-01-01T00:00:00Z","fullName":"Test Lead","email":"t@example.com","phone":"+10000000000","message":"Apps Script test"}'
```

`{"ok":true}` and a new row means it is working. `{"ok":false,"error":"forbidden"}` means the
secret does not match. `-L` matters: Apps Script answers with a 302 to
`script.googleusercontent.com`, and following it is what completes the write.

Two things worth knowing:

- **The secret goes in the query string, not a header.** Apps Script cannot read request
  headers. `LEAD_WEBHOOK_SECRET` and the `X-Webhook-Secret` header are for destinations that
  can (Zapier, n8n, your own endpoint).
- **Apps Script answers 200 to everything** — rejected secret, uncaught exception, missing
  sheet. The webhook therefore treats an explicit `{"ok": false}` body as a failure as well, so
  a wrong secret surfaces as a 502 with the lead written to the log, rather than silently
  discarding every submission while the site reports success.

**Editing the script later:** changes do not go live until you redeploy. **Deploy → Manage
deployments →** pencil icon **→ Version: New version → Deploy.** The `/exec` URL stays the same.

### Deploying

The site is currently served from **Hostinger** at https://reinstategbp.com, running as a Node
application (not a static export — `/api/contact` needs a live server).

**Set the environment variables in the host's control panel, not in a file.** `.env.local` is
gitignored and never leaves your machine, so a key added there has no effect on production. On
Hostinger this is under the Node.js application's Environment Variables section; on Vercel it is
Project → Settings → Environment Variables.

**Restart / redeploy after changing them.** The values are read at process start, so an already
running app will keep using the old ones.

To confirm the contact form can actually send after a deploy, post a submission and read the
status code — it tells you exactly what is wrong:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://reinstategbp.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Test","lastName":"Check","email":"you@example.com","phone":"+15550000000","message":"Deployment smoke test, please ignore."}'
```

| Status | Meaning |
| ------ | -------------------------------------------------------------------- |
| `200`  | Sent. Check the inbox. |
| `500`  | No transport configured — set SMTP_* or `RESEND_API_KEY`. |
| `502`  | Transport configured but the send failed — wrong SMTP credentials/port, or an unverified Resend domain. |
| `400`  | Validation rejected the payload (expected for a deliberately bad one). |
| `429`  | Rate limited — 5 per IP per hour. Wait, or test from another network. |

### If a lead can't be emailed

Any submission that cannot be delivered is still written to the server log in full, tagged
`CONTACT_LEAD_UNDELIVERED`. Nothing is lost silently. To recover them from the host's log
viewer or over SSH:

```bash
grep CONTACT_LEAD_UNDELIVERED <logfile>
```

Each line carries the timestamp, name, email, phone and message as JSON.

---

## Where to edit content

Nothing user-facing is hard-coded in a component. Everything lives here:

| File                          | What's in it                                                        |
| ----------------------------- | ------------------------------------------------------------------- |
| `src/data/site.ts`            | Business name, phone numbers, email, site URL, social links           |
| `src/data/home.ts`            | Every homepage section's copy (hero, problem, method, process, team, contact) |
| `src/data/services.ts`        | All four service pages — hero, causes, process, outcome, per-page FAQs |
| `src/data/faqs.ts`            | The eight homepage FAQs                                              |
| `src/data/testimonials.ts`    | Video testimonials (YouTube IDs, orientation, client attribution)     |
| `src/data/team.ts`            | Team members and roles                                               |
| `src/data/clients.ts`         | Trust-strip client logos                                             |
| `src/data/about.ts`           | About page copy and stats                                            |
| `src/data/legal.ts`           | Privacy policy and terms                                             |
| `src/data/navigation.ts`      | Header and footer navigation (services are derived automatically)    |

### Phone numbers

`site.phones` in `src/data/site.ts` holds every number, in priority order. Add or reorder
entries there and the whole site follows.

`phones[0]` is the primary. It is what the hero, the mobile sticky bar, inner-page heroes and
the contact form's error fallback use, because those have room for one number and offering two
just adds a decision. The **contact section and footer render the full list**, each with its
country label, and the Organization structured data emits one `ContactPoint` per region.

If you later want an Australian visitor to see the AU number in the hero too, that needs
request-time geo detection — the pages are statically generated, so it cannot be done from the
manifest alone. Worth doing only once the AU line is carrying real volume.

### Design tokens

Every colour, radius, spacing value and type size is defined once, in the `@theme` block at the
top of [`src/app/globals.css`](src/app/globals.css). There are no raw hex values anywhere else
in the codebase. Change a token there and it applies everywhere.

### Adding a blog post

1. Create `src/content/blog/your-post-slug.mdx`. The filename becomes the URL:
   `/blog/your-post-slug`.
2. Start the file with frontmatter:

   ```mdx
   ---
   title: "Your post title"
   description: "One or two sentences — used for the card, meta description and RSS."
   date: "2026-08-09"
   author: "Reinstate GBP"
   tags: ["suspensions", "local seo"]
   image: "/images/your-hero.webp"   # optional
   imageAlt: "Describe the image"    # optional, required if image is set
   ---
   ```

3. Write the body in Markdown. Reading time, the blog index card, pagination, related posts
   (ranked by shared tags), the RSS feed and the sitemap all pick it up automatically.

`title` and `date` are required — the build fails with a clear error if either is missing.
Pagination kicks in at 7 posts (`POSTS_PER_PAGE` in `src/lib/blog.ts`).

---

## Outstanding items

### Assets

All client logos and team headshots are now the real files. Team photos live at
`public/images/team/{name}.webp`, normalised to 300 × 300 and displayed as 140px rounded
squares. To swap someone's photo, replace the file at the same path — keep it square so the
`object-cover` crop stays predictable, and re-crop first if the source is portrait.

Two of the four headshots (Sophie, Prakash) are greyscale cut-outs on saturated blue and teal
backdrops, while Tim and Dilip are full-colour photographs. They read as two different sets in
the 4-up row. Supplying replacements on a consistent background — or on `--color-mint`
(`#DEF7EA`) — would tidy that up; nothing in the code needs to change either way.

The brand lockup in the header, hero and footer is drawn as live text plus an inline SVG pin
rather than an image. The only logo file supplied was a 500 × 500 raster on a solid green plate,
which cannot invert onto dark backgrounds. The SVG version uses `--color-accent-red` for the pin
and `currentColor` for the wordmark, so it works on any background at any size.

### Copy still to come

- **Testimonial attribution** — `src/data/testimonials.ts` has `TODO` values for `clientName`
  and `businessType`. The card UI hides the caption entirely until real values are filled in,
  so nothing reads as broken in the meantime.
- **Legal review** — the privacy policy and terms in `src/data/legal.ts` are written to match
  what the site actually does (a contact form that emails a lead, plus GTM). Have a lawyer read
  them before launch.

---

## Decisions worth knowing about

**One contact address, one constant.** The brief listed two (`hello@reinstategbp.com` and
`reinstategbp@gmail.com`); `hello@reinstategbp.com` was chosen and is used everywhere — footer,
contact section, legal pages and the Organization structured data — from `site.email` in
`src/data/site.ts`. Change that one constant to switch the whole site. The inbox that
*receives* form submissions is separate and set by `CONTACT_EMAIL`.

**Green that carries white text is `--color-brand-dark`.** The brief states white on
`#049564` passes AA. It doesn't — that pair is 3.83:1, which only clears the bar for large text,
and button labels are 14px. Applying the brief's own remedy, surfaces with small white text on
them (buttons, FAQ bars) use `--color-brand-dark` (`#03744E`, 5.81:1) and lift to `#049564` on
hover. `#049564` still carries the hero accent, all 24px headings, icons and other non-text
graphics, where the bar is 3:1.

**Form errors are not red.** `--color-accent-red` is scoped to the logo mark by the brief, so
invalid fields are marked with an icon, bold ink text, `aria-invalid` and `role="alert"` instead.

**Guarantee wording.** The problem section says "a proven solution", not "a guaranteed
solution", and FAQ #8 states plainly that reinstatement cannot be guaranteed. These two agree
on purpose — please keep them that way.

**Two dependency overrides, and one thing left unfixed.** `npm audit` reports zero
vulnerabilities, but getting there needed some care:

- **`postcss` and `sharp`** are pinned to patched versions in `overrides`. Both are nested
  dependencies of `next@15.5.23` — which is the newest 15.x release — and the advisories are
  only resolved in `next@16`, a breaking upgrade. Both bumps are minor and Next tolerates them
  (`@tailwindcss/postcss` already ran postcss 8.5.x alongside). **Re-check these when you move
  to Next 16 and delete them if they become redundant.**
- **`gray-matter` was removed.** It is unmaintained and hard-codes `yaml.safeLoad`, an API
  js-yaml dropped in v4, so it can only ever run js-yaml 3.15.1 — the last 3.x, carrying
  CVE-2026-53550. Frontmatter is now split by `splitFrontmatter()` in `src/lib/blog.ts`, twelve
  lines calling js-yaml 4 directly. Post format is unchanged; nothing in `src/content/blog/`
  needed editing.
- **`brace-expansion@1.1.18` is still in the tree and cannot be removed.** It arrives via
  `minimatch@3`, which ESLint core itself depends on along with four `eslint-config-next`
  plugins. v1 exports a function and v5 exports an object, so an override breaks `minimatch@3`
  and with it linting. It is a devDependency that never reaches the browser or the server
  bundle. `npm audit` does not flag it; an external scanner did. Revisit when ESLint and the
  Next plugin set move off `minimatch@3`.

---

## How a few things work

**Video testimonials** load nothing from YouTube until a visitor clicks. Each card renders a
static thumbnail with a play overlay and only injects an iframe (against
`youtube-nocookie.com`) on click. Shorts use the `oardefault` thumbnail variant, which preserves
their 9:16 framing; landscape videos use `maxresdefault`. Both fall back to `hqdefault`.

**The FAQ accordion** is built on `<details>`/`<summary>`, so it opens, closes and is keyboard
navigable with JavaScript disabled. Multiple items can be open at once.

**Scroll reveals** are a single shared `IntersectionObserver` (`RevealObserver` in the root
layout) watching every `.reveal` element, rather than one client component per element. Without
JavaScript the reveal styles never apply and everything renders visible; the same is true under
`prefers-reduced-motion`.

**The contact form** validates with one zod schema (`src/lib/contact-schema.ts`) on the client
via react-hook-form and again server-side in the API route. Spam is handled by a honeypot field
plus a minimum fill time, both of which return a success-shaped response so bots learn nothing,
and by a per-IP rate limit. The rate limiter is in-memory — fine for this traffic, but swap
`src/lib/rate-limit.ts` for Upstash or Vercel KV if the form is ever seriously abused. A
`generate_lead` event is pushed to the GTM data layer on success.

---

## Measured results

Lighthouse, mobile, production build, simulated slow-4G:

| Page                | Performance | Accessibility | Best Practices | SEO | LCP   | CLS |
| ------------------- | ----------- | ------------- | -------------- | --- | ----- | --- |
| `/`                 | 96          | 100           | 100            | 100 | 2.7 s | 0   |
| `/services/…`       | 98          | 100           | 100            | 100 | 2.5 s | 0   |
| `/blog/…`           | 98          | 100           | 100            | 100 | 2.3 s | 0   |
| `/about`            | 98          | 100           | 100            | 100 | 2.4 s | 0   |

LCP is above the 2.0 s target in these runs, but they were measured against `next start` on
localhost, where Lighthouse's simulation charges roughly 460 ms of TTFB that a CDN removes. The
hero image itself is 25 KB of AVIF and downloads in well under 200 ms. Re-measure on the Vercel
deployment before treating LCP as a real problem.

`npm run lint` and `npm run typecheck` both pass clean.
