# Colour contrast test log

**Date:** 2026-11-24
**Tool:** WebAIM Contrast Checker, https://webaim.org/resources/contrastchecker/
(queried via its API: `?fcolor=XXXXXX&bcolor=XXXXXX&api`)
**Tokens under test:** `css/base.css` `:root` block
**Criteria:** WCAG 2.2 SC 1.4.3 Contrast (Minimum) 4.5:1 for normal text;
SC 1.4.11 Non-text Contrast 3:1 for borders and focus indicators.

| # | Use | Foreground | Background | Ratio | Needs | Result |
|---|-----|-----------|------------|------:|------:|--------|
| 1 | Body text on page background | `--color-text` #2B1D14 | `--color-bg` #FFF8F0 | 15.4:1 | 4.5:1 | Pass (AAA) |
| 2 | Body text in inputs / cards | `--color-text` #2B1D14 | `--color-surface` #FFFFFF | 16.2:1 | 4.5:1 | Pass (AAA) |
| 3 | Muted text (footer) | `--color-text-muted` #5A4A3F | `--color-bg` #FFF8F0 | 8.01:1 | 4.5:1 | Pass (AAA) |
| 4 | Links | `--color-accent` #8A3B12 | `--color-bg` #FFF8F0 | 7.34:1 | 4.5:1 | Pass (AAA) |
| 5 | Button label | `--color-on-accent` #FFFFFF | `--color-accent` #8A3B12 | 7.73:1 | 4.5:1 | Pass (AAA) |
| 6 | Error message text | `--color-error` #B3261E | `--color-bg` #FFF8F0 | 6.20:1 | 4.5:1 | Pass (AA) |
| 7 | Text on error-coloured button | `--color-on-error` #FFFFFF | `--color-error` #B3261E | 6.53:1 | 4.5:1 | Pass (AA) |
| 8 | Focus ring | `--color-focus` #0B57D0 | `--color-bg` #FFF8F0 | 6.06:1 | 3:1 | Pass |
| 9 | Borders (header, footer, cards) | `--color-border` #8C7A6B | `--color-bg` #FFF8F0 | 3.90:1 | 3:1 | Pass |
| 10 | Input borders | `--color-border` #8C7A6B | `--color-surface` #FFFFFF | 4.10:1 | 3:1 | Pass |

## Notes

- Rows 9 and 10 show "AA fail" in WebAIM's output because the tool applies the
  4.5:1 text threshold to every pair. These colours are only used for borders,
  so the relevant criterion is 1.4.11 (3:1), which both pass.
- Rows 6, 7 and 8 fall short of AAA (7:1) but AA is the project target.
- `--color-focus` is a blue deliberately distinct from the brown accent so the
  focus ring is also distinguishable from hover/active states by hue, not just
  by contrast.
- Re-run this log whenever a token value changes.
