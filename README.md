# Crust and Crumb-website
an accessible click-and-collect bakery and deli prototype (HTML, CSS, JavaScript). 

## How the pages are organised

Plain static HTML with no build step. Open `index.html` in a browser or publish the folder as is.

- The header, navigation and footer are shared. They are written once in `js/components.js`, and each page includes them with `<site-header></site-header>` and `<site-footer></site-footer>`.
- Each page links one stylesheet, `css/main.css`, which imports `css/base.css` (design tokens and base styles) and `css/style.css` (layout). Add or rename stylesheets in `main.css` rather than in every page.

## Design tokens

Colours and the type scale are defined once as CSS custom properties at the top of `css/base.css`. Every colour pair was checked with WebAIM's Contrast Checker; the ratios are recorded in `evidence/contrast-test-log.md`.
