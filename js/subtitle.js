const title = "noto";

(()=>{
    const subtitle = document.querySelector("meta[name=\"page-subtitle\"]");
    let titleEl = document.querySelector("title");
    
    if (!titleEl) {
        titleEl = document.createElement("title");
        document.head.appendChild(titleEl);
    }

    titleEl.textContent = title;

    if (!subtitle || subtitle.getAttribute("content") == "") {
        return;
    }

    titleEl.textContent += " | " + subtitle.getAttribute("content");
})();