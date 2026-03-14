class NotoGame {
    #setup;
    #update;
    #paused;
    #halt;
    #lastTime;

    constructor(setup, update) {
        this.#setup = setup;
        this.#update = update;
        this.#lastTime = 0;

        this.#update_wrap = this.#update_wrap.bind(this);
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