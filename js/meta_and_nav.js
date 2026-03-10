if (document.querySelector("meta[name=\"page-subtitle\"]")) {
    const subtitle = document.querySelector("meta[name=\"page-subtitle\"]");
    const title = "noto";
    let titleEl = document.querySelector("title");

    if (!titleEl) {
        titleEl = document.createElement("title");
        document.head.appendChild(titleEl);
    }

    titleEl.textContent = title;

    if (!subtitle.getAttribute("content") == "") {
        titleEl.textContent += " | " + subtitle.getAttribute("content");
    }
}

if (document.querySelector("meta[name=\"nav\"]")) {
    class NavManager {
        constructor() {
            this.nav = document.createElement("nav");
        }

        addLink(href, text) {
            const a = document.createElement("a");
            a.href = href;
            a.textContent = text;
            this.nav.appendChild(a);
            
            return this;
        }

        prependNav() {
            document.body.prepend(this.nav);
            return this;
        }
    }

    (new NavManager())
        .addLink("/", "noto")
        .addLink("/stock", "stock")
        .addLink("/testing", "testing")
        .addLink("/archive", "archive")
        .addLink("https://github.com/noto173", "github")
        .prependNav();
}

let favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "/favicon.png";

document.head.appendChild(favicon);
