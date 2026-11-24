/*
  Shared layout components: <site-header> and <site-footer>.

  Edit the header or footer ONCE here and every page picks it up.
  No build step and no fetch(), so this works when a page is opened
  directly from disk (file://) as well as on GitHub Pages.

  Links are written relative to the site root. The root is worked out
  from this script's own URL (it lives at js/components.js), so a page
  at index.html and a page at pages/contact.html both get correct links.
*/
(function () {
  var scriptSrc = document.currentScript ? document.currentScript.src : "";
  var SITE_ROOT = scriptSrc.replace(/js\/components\.js(\?.*)?$/, "");

  var SITE_NAME = "Crust and Crumb";

  var NAV_LINKS = [
    { label: "Home",     href: "index.html" },
    { label: "Products", href: "pages/products.html" },
    { label: "Contact",  href: "pages/contact.html" }
  ];

  function isCurrentPage(href) {
    var target = new URL(href, SITE_ROOT).pathname;
    var here = location.pathname;
    // Treat "/" and "/index.html" as the same page.
    if (here.endsWith("/")) { here += "index.html"; }
    return target === here;
  }

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      var links = NAV_LINKS.map(function (link) {
        var current = isCurrentPage(link.href) ? ' aria-current="page"' : "";
        return '<a href="' + SITE_ROOT + link.href + '"' + current + ">" + link.label + "</a>";
      }).join("\n      ");

      this.innerHTML =
        "<header>\n" +
        "  <h1>" + SITE_NAME + "</h1>\n" +
        '  <nav aria-label="Main">\n' +
        "      " + links + "\n" +
        "  </nav>\n" +
        "</header>";
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML =
        "<footer>\n" +
        "  <p>" + SITE_NAME + "</p>\n" +
        "</footer>";
    }
  }

  customElements.define("site-header", SiteHeader);
  customElements.define("site-footer", SiteFooter);
})();
