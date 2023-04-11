export class KeyboardManager {
    down = new Set();
    justPressed = new Set();
    #alreadyPressed = new Set();
    constructor() {
        addEventListener("keydown", (e) => {
            e.preventDefault();
            this.down.add(e.code);
        });
        addEventListener("keyup", (e) => {
            e.preventDefault();
            this.down.delete(e.code);
            this.#alreadyPressed.delete(e.code);
        });
    }
    isKeyDown(code) {
        return this.down.has(code);
    }
    isKeyJustPressed(code) {
        return this.justPressed.has(code);
    }
    update() {
        this.updateJustPressed();
    }
    updateJustPressed() {
        this.justPressed.clear();
        for (const i of this.down) {
            if (this.#alreadyPressed.has(i))
                continue;
            this.justPressed.add(i);
            this.#alreadyPressed.add(i);
        }
    }
}
