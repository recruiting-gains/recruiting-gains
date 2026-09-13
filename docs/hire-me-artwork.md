# HIRE ME profile artwork

The profile's green pixel badge spells **HIRE ME** using the bitmap font from [Commit Font](https://github.com/shivam230/commit-art) by Studio 4by5. It is decorative artwork, not a modification of GitHub's native contribution graph. Real activity remains linked below the badge.

No synthetic commits, invented activity totals, network requests, animation, external fonts, account tokens, or scheduled jobs are needed. The SVG is self-contained and scales with the README.

## Rebuild and check

With Node.js installed, from the repository root:

```sh
node scripts/render-hire-me.mjs
node --test scripts/profile.test.mjs tests/hire-me.test.mjs
```

There are no installed package dependencies. Repeated rendering produces the same bytes. Input validation rejects unsupported/oversized text and invalid handles before rendering; tests also verify recovery with valid input and preservation of the profile's real activity link.

Source and license provenance: [Commit Font notice](../tools/commit-font/NOTICE.md). This profile change uses only its font, with a separate renderer that omits fictional contribution statistics. Keep the notice if reusing the font.

Recovery: revert the single profile-artwork commit to restore the previous activity image; do not rewrite contribution history.
