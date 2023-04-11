import { Vector2 } from "../math/Vector2.js";
import { canvas, realCanvas } from "../render/canvas.js";
import { currentCamera } from "../tristable.js";

export class MouseManager {
    pos: Vector2 = new Vector2();
    delta: Vector2 = new Vector2();
    down: Set<number> = new Set();
    justPressed: Set<number> = new Set();
    wheelDelta = 0;
    #alreadyPressed: Set<number> = new Set();

    constructor() {
        addEventListener("mousemove", (e: MouseEvent) => {
            const last: Vector2 = this.pos.copy;
            const { clientX, clientY }: MouseEvent = e;
            const { top, left, width, height }: DOMRect = realCanvas.getBoundingClientRect();

            this.pos.set({
                x: (clientX - left) * canvas.width / width,
                y: (clientY - top) * canvas.height / height
            });

            this.delta = this.pos.sub(last);
        });

        addEventListener("mousedown", (e: MouseEvent) => {
            e.preventDefault();
            this.down.add(e.button);
        });

        addEventListener("mouseup", (e: MouseEvent) => {
            e.preventDefault();
            this.down.delete(e.button);
            this.#alreadyPressed.delete(e.button);
        });

        addEventListener("wheel", (e: WheelEvent) => {
            this.wheelDelta = e.deltaY;
        });
    }

    get worldPos() {
        return currentCamera.toWorld(this.pos);
    }

    get worldDelta() {
        return this.delta.scale(currentCamera.zoom);
    }

    get scrollingUp(): boolean {
        return this.wheelDelta < 0;
    }

    get scrollingDown(): boolean {
        return this.wheelDelta > 0;
    }

    isMouseDown(button = 0): boolean {
        return this.down.has(button);
    }

    isMouseJustPressed(button = 0): boolean {
        return this.justPressed.has(button);
    }

    update(): void {
        this.delta.reset();
        this.wheelDelta = 0;
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