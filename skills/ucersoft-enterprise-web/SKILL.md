---
name: ucersoft-enterprise-web
description: Design, edit, or review the Üçersoft corporate website and its XStudio or Akıllı Civata product pages while preserving the established industrial brand, evidence boundaries, visual provenance, accessibility, and premium editorial experience. Use only for this repository's public web experience.
metadata:
  short-description: Build and review Üçersoft web pages
---

# Üçersoft Enterprise Web

Create a calm, credible product experience: Apple-like in editorial discipline, not in copied appearance. Preserve Üçersoft's industrial identity and existing factual boundaries.

## Ground the work

Before editing, inspect the target route, shared header, global tokens, and current git diff. Treat existing uncommitted changes as user work. For visual work, read:

- [`../../docs/GORSEL-SANAT-YONETIMI.md`](../../docs/GORSEL-SANAT-YONETIMI.md) before selecting, generating, grading, or repeating imagery.
- [`../../docs/VISUAL-ASSET-PROVENANCE.md`](../../docs/VISUAL-ASSET-PROVENANCE.md) when changing a generated visual or describing its provenance.

Do not redesign `/sunum` or `/onizleme` unless the request explicitly includes those routes.

## Design decisions

- Use off-white editorial surfaces and graphite product stages. Reserve signal blue for state, action, or measured data; never wash an entire image blue.
- Keep Space Grotesk for display type and Noto Sans for reading copy. Limit reading text to roughly 65–72 characters per line with relaxed line height.
- Prefer a few large, purposeful product scenes over repeated cards, ornamental HUD elements, or decorative grid lines.
- Preserve the existing content order and anchor URLs unless the user requests an information-architecture change.
- Translate Apple influence into hierarchy, whitespace, product focus, and restrained motion. Do not copy Apple's layouts, wording, icons, or trade dress.
- Use existing optimized WebP assets when available. Never use the same photograph twice on one page; use diagrams or typography when another visual role is needed.

## Truth and product status

- Do not invent customers, certifications, measured performance, launch status, or field results.
- Keep development targets explicitly labeled as targets. Preserve qualification notes such as Akıllı Civata's final values depending on laboratory and field validation.
- Treat generated dashboards and XStudio UI compositions as representative unless a verified product screenshot is supplied.
- Keep image alt text factual and avoid describing decorative overlays as product capability.

## Interaction quality

- Preserve visible keyboard focus, semantic headings, skip links, labeled navigation, and operable controls.
- Motion must have a useful narrative role. Honor `prefers-reduced-motion`; animated product stories must remain understandable when static.
- Verify desktop and mobile navigation, anchors, CTA mail links, overflow, image loading, and animation controls in a real browser.
- Use Playwright only as a development check; the production site must not depend on MCP or browser tooling.

## Completion checks

Run lint and a production build. Inspect `/` and `/akilli-civata` at 1440, 1024, 768, and 390 CSS pixels. Confirm `/sunum` and `/onizleme` still open, and report any performance or accessibility target that could not be measured rather than claiming it passed.
