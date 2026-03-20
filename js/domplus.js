const dom = (query) => {
    let els = query instanceof Element ? [query] : document.querySelectorAll(query);

    return {
        show: function() {
            els.forEach(el => el.hidden = false);
            return this;
        },
        hide: function() {
            els.forEach(el => el.hidden = true);
            return this;
        },
        html: function(html) {
            if (html !== undefined) {
                els.forEach(el => el.innerHTML = html);
                return this;
            }
            return els[0]?.innerHTML;
        },
        text: function(text) {
            if (text !== undefined) {
                els.forEach(el => el.textContent = text);
                return this;
            }
            return els[0]?.textContent;
        },
        on: function(event, callback) {
            els.forEach(el => el.addEventListener(event, (e) => {
                callback.call(this, e);
            }));
            return this;
        },
        attr: function(attr, value) {
            if (value !== undefined) {
                els.forEach(el => el.setAttribute(attr, value));
                return this;
            }
            return els[0]?.getAttribute(attr);
        },
        css: function(prop, value) {
            if (value !== undefined) {
                els.forEach(el => el.style[prop] = value);
                return this;
            }
            return els[0]?.style[prop];
        },
        addClass: function(class_) {
            els.forEach(el => el.classList.add(class_));
            return this;
        },
        removeClass: function(class_) {
            els.forEach(el => el.classList.remove(class_));
            return this;
        },
        id: function(id) {
            if (id !== undefined) {
                els.forEach(el => el.id = id);
                return this;
            }
            return els[0]?.id;
        },
        each: function(callback) {
            els.forEach(el => callback.call(dom(el)));
            return this;
        },
        first: function(callback) {
            return dom(els[0]);
        },
        element: function() {
            return els[0];
        },
        elements: function() {
            return els;
        }
    };
};