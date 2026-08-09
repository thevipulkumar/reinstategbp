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
| `RESEND_API_KEY`        | for the form    | Sends contact form submissions. Without it, dev logs to the console and production returns an error with the phone number as fallback. |
| `CONTACT_EMAIL`         | for the form    | Inbox that receives new leads.                                       |
| `RESEND_FROM_EMAIL`     | recommended     | Verified Resend sender. Falls back to Resend's shared sender.        |
| `NEXT_PUBLIC_GTM_ID`    | no              | Google Tag Manager container. Omit to disable GTM (useful locally).  |
| `NEXT_PUBLIC_SITE_URL`  | for production  | Absolute origin, no trailing slash. Drives canonicals, OG, sitemap and RSS. |

### Deploying

Push to a Git remote and import the repo on Vercel. Add the environment variables above in the
Vercel project settings. No build configuration is needed — the defaults are correct.

---

## Where to edit content

Nothing user-facing is hard-coded in a component. Everything lives here:

| File                          | What's in it                                                        |
| ----------------------------- | ------------------------------------------------------------------- |
| `src/data/site.ts`            | Business name, phone, email, site URL, social links                  |
| `src/data/home.ts`            | Every homepage section's copy (hero, problem, method, process, team, contact) |
| `src/data/services.ts`        | All four service pages — hero, causes, process, outcome, per-page FAQs |
| `src/data/faqs.ts`            | The eight homepage FAQs                                              |
| `src/data/testimonials.ts`    | Video testimonials (YouTube IDs, orientation, client attribution)     |
| `src/data/team.ts`            | Team members and roles                                               |
| `src/data/clients.ts`         | Trust-strip client logos                                             |
| `src/data/about.ts`           | About page copy and stats                                            |
| `src/data/legal.ts`           | Privacy policy and terms                                             |
| `src/data/navigation.ts`      | Header and footer navigation (services are derived automatically)    |

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

**Two contact addresses in the brief.** The spec listed `hello@reinstategbp.com` as a conversion
action and `reinstategbp@gmail.com` in the contact section's verbatim copy. The site shows one
address everywhere, taken from `site.email` in `src/data/site.ts`, currently set to the verbatim
value. Change that one constant to switch the whole site. The inbox that *receives* form
submissions is separate and set by `CONTACT_EMAIL`.

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
