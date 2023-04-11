import { Vector2 } from "../math/Vector2.js";
import { canvas, realCanvas } from "../render/canvas.js";
import { currentCamera } from "../tristable.js";
export class MouseManager {
    pos = new Vector2();
    delta = new Vector2();
    down = new Set();
    justPressed = new Set();
    wheelDelta = 0;
    #alreadyPressed = new Set();
    constructor() {
        addEventListener("mousemove", (e) => {
            const last = this.pos.copy;
            const { clientX, clientY } = e;
            const { top, left, width, height } = realCanvas.getBoundingClientRect();
            this.pos.set({
                x: (clientX - left) * canvas.width / width,
                y: (clientY - top) * canvas.height / height
            });
            this.delta = this.pos.sub(last);
        });
        addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.down.add(e.button);
        });
        addEventListener("mouseup", (e) => {
            e.preventDefault();
            this.down.delete(e.button);
            this.#alreadyPressed.delete(e.button);
        });
        addEventListener("wheel", (e) => {
            this.wheelDelta = e.deltaY;
        });
    }
    get worldPos() {
        return currentCamera.toWorld(this.pos);
    }
    get worldDelta() {
        return this.delta.scale(currentCamera.zoom);
    }
    get scrollingUp() {
        return this.wheelDelta < 0;
    }
    get scrollingDown() {
        return this.wheelDelta > 0;
    }
    isMouseDown(button = 0) {
        return this.down.has(button);
    }
    isMouseJustPressed(button = 0) {
        return this.justPressed.has(button);
    }
    update() {
        this.delta.reset();
        this.wheelDelta = 0;
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
