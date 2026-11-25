# Design decisions

  Crust and Crumb click-and-collect prototype. Each decision names where it lives in the site,
  what it connects to, and how it is evidenced. Status: **Done**, **Planned**, or **Finding**
  (a problem found in the template that we chose to fix).

  ## Inclusiveness

  | # | Decision | Where | Connects to | Evidence |
  |---|----------|-------|-------------|----------|
  | I1 | Form labels and error messages use plain language ("Enter your phone number so we can text you when your order is ready"), not codes or jargon. | `pages/contact.html` (done),checkout form (planned) | ISO 9241-210; WCAG 3.3.1, 3.3.2; ACM 1.4 | Screenshot of each form with errors shown |
  | I2 | No time limit anywhere. The basket and checkout never expire or auto-clear while the user is on the page.Checkout (planned) | WCAG 2.2.1 | Statement in accessibility statement; code review that no `setTimeout` clears state |
  | I3 | Collection slots are a list of radio buttons with the time written as text ("Saturday 10:00 to 10:30, 3 slots left"). Availability is never shown by colour alone. | Checkout (planned) | WCAG 1.4.1, 1.3.3 | Screenshot in greyscale showing slots still readable |
  | I4 | Nothing depends on hover. Product details, allergen text and basket controls are visible orreachable by tap and keyboard; no hover-only tooltips. | `pages/products.html` (done: all text is static) | WCAG 1.4.13, 2.1.1 | Keyboard-only walkthrough in test log |
  | I5 | Current page marked with `aria-current="page"` and a visible style; one `<h1>` per page; skip link; focus ring never removed. | `js/components.js`, `css/base.css`, all pages | WCAG 1.3.1, 2.4.1, 2.4.6, 2.4.7 | WAVE and Lighthouse reports in `evidence/`; contrast log |
  | I6 | Layout is single column first and never scrolls sideways at 320px or 400% zoom. Template's `width: 30%` flex cards replaced with CSS Grid. | `css/style.css` | WCAG 1.4.10, 1.4.4 | Screenshots at 320px and 400% zoom |

  ## Ethics: no dark patterns

  | # | Decision | Where | Connects to | Evidence |
  |---|----------|-------|-------------|----------|
  | E1 | No marketing opt-in is pre-ticked. If a "send me offers" box exists it defaults to unchecked and is not required. | Checkout (planned) | ACM 1.3; CMA online choice architecture; CPUTR 2008 | Screenshot of checkout form in default state |
  | E2 | No fake urgency. Stock counts shown only when real and only as plain information ("3 left today"), never as countdowns or "others are viewing this". | `pages/products.html` | ACM 1.2, 1.3; CMA guidance on scarcity claims | Code review: no stock text is hard-coded or randomised |
  | E3 | The price on the product card is the price paid. No fees, service charges or minimums appear for the first time at the final step. The basket total is shown on every step. | Products, basket, checkout | CPUTR 2008 (drip pricing); CMA guidance | Screenshots of product, basket and review totals matching |
  | E4 | "Remove" is as visible as "Add to basket": same size button, next to each basket line, not hidden in a menu. The basket can be emptied in one action. | Basket on `pages/products.html` (planned: current basket has no remove) | ACM 1.3; CMA guidance (obstruction) | Screenshot of basket with add and remove side by side |
  | E5 | Cancelling an order is as easy as placing one: a cancel link on the confirmation page, no phone call required. | Confirmation (planned) | CMA guidance (subscription traps / obstruction) |Screenshot |

  ## Safety and duty of care

  | # | Decision | Where | Connects to | Evidence |
  |---|----------|-------|-------------|----------|
  | S1 | Each product record carries a list of the 14 UK regulated allergens it contains. Allergens are shown as text on the product card, not as icons alone. | Product data (planned: current data is stationery with no allergen field) | Food Information Regulations 2014; WCAG 1.1.1 | Product data file; screenshot |
  | S2 | Allergen information is repeated on the basket and on the review step before confirming, so the customer sees it at the moment of commitment, not only on the product page. | Basket, checkout review (planned) | FIR 2014; ACM 1.2 | Screenshots of basket and review step showing allergens |
  | S3 | If an item is unavailable, a substitute is only offered when its allergen list is a subset of the original's. A substitute introducing a new allergen is never proposed automatically. | Substitution logic (planned) | FIR 2014; ACM 1.2 | Unit test cases in test log: same allergens passes, new allergen rejected |
  | S4 | A "tell us about allergies" free-text field on checkout is optional and clearly says the shop will phone to confirm, so the site never implies it can guarantee safety. | Checkout (planned) | ACM 1.2; honesty about capability | Screenshot of field and helper text |

  ## Privacy

  | # | Decision | Where | Connects to | Evidence |
  |---|----------|-------|-------------|----------|
  | P1 | Checkout collects name and one contact method (phone or email) only. No address field unless the customer uses the optional "find my nearest shop" postcode feature, and the postcode is not stored. | Checkout (planned) | UK GDPR Art. 5(1)(c) data minimisation | Form field list in this document; screenshot |
  | P2 | Every field has a one-line reason next to it ("Phone: we text you when your order is ready"). | `pages/contact.html` (planned addition), checkout | UK GDPR Art. 13 transparency; WCAG 3.3.2 | Screenshot |
  | P3 | Nothing is sent anywhere. The prototype has no backend; the contact form and checkout write only to the browser's own storage and say so on the page. | `pages/contact.html`, checkout | UK GDPR Art. 5(1)(f); BCS respect for privacy | Browser network tab screenshot showing no requests on submit |
  | P4 | A short privacy notice page explains what is collected, why, where it goes (nowhere), how long it is kept (until the browser clears it), and who to contact. Linked from the footer. | `pages/privacy.html` (planned), `js/components.js` footer | UK GDPR Art. 13 | The page itself |
  | P5 | The contact form currently asks for email as the only contact channel. Decision: keep it optional and add phone as an alternative, so people without email are not excluded. | `pages/contact.html` | UK GDPR minimisation; ACM 1.4 | Screenshot |

  ## Security

  | # | Decision | Where | Connects to | Evidence |
  |---|----------|-------|-------------|----------|
  | X1 | **Finding.** The template's `addToBasket()` writes the product name into the page with `innerHTML`. If a product name ever came from user input or a data file, this is a cross-site scripting (XSS) vector. Fixed by using `textContent` and DOM methods throughout. | `js/script.js` line 6 | OWASP Top 10 A03 Injection; ACM 2.9; BCS competence | Before/after code in test log; `grep innerHTML` returns nothing in `js/` |
  | X2 | All basket and checkout rendering builds elements with `document.createElement` and sets `textContent`, never string-concatenated HTML. | `js/script.js` (planned rewrite) | OWASP A03 | Code review |
  | X3 | Payment is a clearly labelled mock: the page says "Demo only, do not enter a real card". Card fields are never written to `localStorage`, `sessionStorage`, cookies or the URL. Only the order summary is stored. | Checkout payment step (planned) | OWASP A02 Cryptographic Failures; ACM 2.9 | Screenshot of label; inspection of Application tab in dev tools after a test order |
  | X4 | Input is validated on every step, not only at the end: required fields, phone and email formats, quantity as a positive integer with a sensible maximum. Validation is in plain language and tied to the field with `aria-describedby`. | Contact form, checkout | OWASP A03; WCAG 3.3.1, 3.3.3 | Screenshots of each validation message |
  | X5 | HTTPS is stated as a production requirement in the README and accessibility statement,since a prototype served from disk or GitHub Pages cannot demonstrate transport security itself. |`README.md` | OWASP A02; BCS competence | README section |

  ## Professional practice

  | # | Decision | Where | Connects to | Evidence |
  |---|----------|-------|-------------|----------|
  | R1 | Every change goes through a branch and pull request with a short description of what was tested. No direct commits to `main` after the baseline. | Git history | BCS duty to the profession; ACM 2.5 | PR list on GitHub |
  | R2 | A test log records each check as it is done: contrast ratios with the tool used, keyboard walkthroughs, 320px and 400% zoom, WAVE and Lighthouse runs, security review of `innerHTML`. | `evidence/contrast-test-log.md` and later logs | ACM 2.5 thorough evaluations | The log files |
  | R3 | A baseline audit of the unmodified template was captured before any change, so improvement can be shown rather than claimed. | `evidence/baseline/` | ACM 2.5; honesty | Lighthouse HTML and WAVE screenshot, dated 2026-11-24 |
  | R4 | An accessibility statement lists what was tested, with which tools and assistive technology, and admits known issues (for example: not tested with a real screen reader user; JavaScript required for the shared header). It does not claim WCAG conformance. | `pages/accessibility.html` (planned), linked from footer | BCS honesty about capability; Public Sector Bodies Accessibility Regulations format used as a model | The page itself |
  | R5 | Known limitation recorded: the header and footer are injected by JavaScript. Without JavaScript the nav is missing. Accepted for a prototype to avoid a build step; noted in the statement. | `js/components.js` | Honesty about capability | Accessibility statement entry |

  ## Commercial

  | # | Decision | Where | Connects to | Evidence |
  |---|----------|-------|-------------|----------|
  | C1 | On a tight budget the first things cut would be: screen reader testing with real users, the privacy notice page, and the allergen-aware substitution logic. The cost: the Click-Away Pound 2019 survey found 69% of disabled shoppers leave sites with barriers, representing an estimated £17.1bn in UK spending; an allergen error carries criminal liability under FIR 2014 and potential Equality Act 2010 claims. Decision: keep allergen and keyboard work, defer only the user testing, and say so in the statement. | This document | Click-Away Pound 2019; Equality Act 2010 s.29; FIR 2014 | Reasoning recorded here |
  | C2 | Shared header and footer components were chosen over a build tool to keep the project maintainable by one person with no toolchain, accepting the JavaScript dependency (R5). | `js/components.js` | Proportionate engineering | README |
  | C3 | Design tokens in `css/base.css` mean a future rebrand or dark theme changes one block and the contrast log is re-run against one list, which is cheaper than auditing scattered colours. | `css/base.css` | Maintainability; WCAG 1.4.3 | Contrast log |
