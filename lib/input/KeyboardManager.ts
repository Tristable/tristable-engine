export class KeyboardManager {
    down: Set<string> = new Set();
    justPressed: Set<string> = new Set();
    #alreadyPressed: Set<string> = new Set();

    constructor() {
        addEventListener("keydown", (e: KeyboardEvent) => {
            e.preventDefault();
            this.down.add(e.code);
        });

        addEventListener("keyup", (e: KeyboardEvent) => {
            e.preventDefault();
            this.down.delete(e.code);
            this.#alreadyPressed.delete(e.code);
        });
    }

    isKeyDown(code: string): boolean {
        return this.down.has(code);
    }

    isKeyJustPressed(code: string): boolean {
        return this.justPressed.has(code);
    }

    update(): void {
        this.updateJustPressed();
    }

    updateJustPressed(): void {
        this.justPressed.clear();
        for (const i of this.down) {
            if (this.#alreadyPressed.has(i)) continue;
            this.justPressed.add(i);
            this.#alreadyPressed.add(i);
        }
    }
}