class NotoGame {
    #setup;
    #update;
    #paused;
    #halt;
    #lastTime;
    keys;

    constructor(setup, update) {
        this.#setup = setup;
        this.#update = update;
        this.#lastTime = 0;

        this.#update_wrap = this.#update_wrap.bind(this);

        this.keys = {};

        window.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            delete this.keys[e.key];
        });
    }

    start() {
        this.#setup();
        this.#lastTime = performance.now();
        requestAnimationFrame(this.#update_wrap);
    }

    pause() {
        this.#paused = true;
    }

    resume() {
        this.#paused = false;
    }

    stop() {
        this.#halt = true;
    }

    #update_wrap = (timestamp) => {
        if (!this.#paused) {
            this.#update(Math.min(timestamp - this.#lastTime, 100));
        }
        this.#lastTime = timestamp;
        if (!this.#halt) {
            requestAnimationFrame(this.#update_wrap);
        } else {
            this.#halt = false;
        }
    }
}