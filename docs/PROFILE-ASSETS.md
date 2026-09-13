# Profile assets

The terminal banner is original code-native SVG artwork. Its portrait is AI-stylized from an owner-supplied photograph, used with the owner's request to feature it on this public profile. It is not a photograph of a new scene. The raw source photograph is not included in this repository.

The styling follows the general idea of a terminal portrait/name layout, not another creator's source code, identity, copy, contribution counts, or logos.

## Rebuild

Run `node scripts/build-profile.mjs` from this repository. It uses Node's built-in modules and the checked-in portrait PNG. No dependencies, API keys, network requests, credentials, scheduled jobs, or model calls are required to rebuild the SVG.

The README references the banner at an immutable commit to prevent a cached older name from appearing. After changing the banner, publish the generated SVG and update the README image URL to that commit.

Run `node --test scripts/profile.test.mjs tests/hire-me.test.mjs` for static asset, accessibility, and copy checks. These checks do not replace viewing the actual profile on desktop and mobile.

The banner contains no scripts, external images, analytics, or live status claims. Its animation ends after a short entrance, with a reduced-motion alternative and a descriptive accessible title. Profile links and text are ordinary Markdown. GitHub's native contribution graph remains the source of truth for activity. The README's HIRE ME panel is separately labeled decorative pixel artwork, not contribution data. Its image and caption link to GitHub's native activity view. It does not create synthetic contributions, show invented activity totals, or use scheduled commits. See [HIRE ME artwork](hire-me-artwork.md) for its source credits, rebuild instructions, and checks.

The earlier miniature-lab hero is retained in `assets/ai-builds-showcase.webp`; history and previous assets are not deleted by this redesign.
