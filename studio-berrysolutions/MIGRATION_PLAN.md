# Berry Solutions Content Migration Plan

This migration is intentionally staged and non-destructive. The existing hardcoded website content remains the source of truth until we verify the same content is available in Sanity for each section.

## Phase 1 — Inventory and schema scaffolding

The following hardcoded content has been identified as prime candidates for Sanity-managed content:

- Home page hero and CTA content
- Berry concept cards and supporting copy
- Client testimonial content
- Portfolio projects and project case studies
- Service catalog and detail content
- Blog posts and article metadata
- FAQ content
- Career roles
- Footer and contact metadata

The first schema set is in place to support this migration without changing site behavior yet.

## Phase 2 — Migrate portfolio content

Source: `berrysols_2/data/portfolio.ts`

Migrated content:
- Project list: title, slug, category, excerpt, image, technologies, date
- Case study details: overview text, problems, solutions, standout points, process steps
- Featured project selection
- Same Day Me and related case study content

Migration rule:
- Keep existing project names and slugs unchanged first.
- Sanity will hold the same project object, then edits are made inside Studio.
- Only after verification will the app read from Sanity instead of the static array.

## Phase 3 — Migrate service content (implementation complete)

Source: `berrysols_2/data/services.ts`

Migrated content:
- Service eyebrow/title/description
- Flow steps
- Capabilities and industries
- Tech stack groups
- Case study references
- CTA line

Migration rule:
- Preserve the current service slugs (`ai-automation`, `web-development`, etc.) to keep URLs stable.
- `scripts/migrate-services.ts` upserts all eight existing service records by slug, including their full detail content and current hero asset paths.
- The Next.js Services pages, dynamic service routes, sitemap, navigation, and contact selector now read from Sanity after migration.

## Phase 4 — Migrate blog content

Source: `berrysols_2/lib/blog.ts`

Migrated content:
- Title, date, category, image, excerpt
- Article sections and supporting images
- FAQ blocks inside article pages
- Related metadata

Migration rule:
- Keep article URLs identical to current slugs.

## Phase 5 — Migrate FAQ and careers

Sources:
- `berrysols_2/app/faq/page.tsx`
- `berrysols_2/data/careers.ts`

Migrated content:
- FAQ list with category, question, answer
- Career roles, department, summary, responsibilities, requirements

## Phase 6 — Migrate footer and contact metadata

Source:
- `berrysols_2/components/home/Footer.tsx`

Migrated content:
- Brand tagline
- Connect heading
- Social links
- Navigation links
- Copyright text

## Phase 7 — Switch app reads to Sanity (Services complete)

Once each section is present in Studio and match the live site output:
1. Fetch the Sanity document(s) in the route or component
2. Apply fallback values if empty
3. Verify the rendered output matches the current design exactly
4. Remove the old hardcoded arrays only after the same content is live in Sanity

## Do not delete existing website content

We will not remove source data or break URLs during this process. The migration is staged by content area, and each section will be validated before we make any destructive changes.
