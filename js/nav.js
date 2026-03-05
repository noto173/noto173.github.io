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
    .addLink("/index", "noto")
    .addLink("/archive", "archive")
    .addLink("https://noto173.github.io/slope-game", "slope")
    .addLink("https://github.com/noto173", "github")
    .prependNav();