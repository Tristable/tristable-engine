import { Vector2 } from "../math/Vector2.js";
import { KeyboardManager } from "./KeyboardManager.js";
import { MouseManager } from "./MouseManager.js";
export class InputManager {
    #actions = new Map();
    #mouse = new MouseManager();
    #keyboard = new KeyboardManager();
    addAction(name, action) {
        this.#actions.set(name, action);
    }
    get mousePos() {
        return this.#mouse.pos;
    }
    get mouseWorldPos() {
        return this.#mouse.worldPos;
    }
    get mouseDelta() {
        return this.#mouse.delta;
    }
    get mouseWorldDelta() {
        return this.#mouse.worldDelta;
    }
    get mouseButtonsDown() {
        return this.#mouse.down;
    }
    get mouseButtonsJustPressed() {
        return this.#mouse.justPressed;
    }
    get scrollDelta() {
        return this.#mouse.wheelDelta;
    }
    get scrollingUp() {
        return this.#mouse.scrollingUp;
    }
    get scrollingDown() {
        return this.#mouse.scrollingDown;
    }
    isMouseDown(button = 0) {
        return this.#mouse.isMouseDown(button);
    }
    isMouseJustPressed(button = 0) {
        return this.#mouse.isMouseJustPressed(button);
    }
    isKeyDown(code) {
        return this.#keyboard.isKeyDown(code);
    }
    isKeyJustPressed(code) {
        return this.#keyboard.isKeyJustPressed(code);
    }
    isActionPressed(name) {
        if (!this.#actions.has(name))
            return false;
        return this.#actions.get(name).pressed(this);
    }
    isActionJustPressed(name) {
        if (!this.#actions.has(name))
            return false;
        return this.#actions.get(name).justPressed(this);
    }
    update() {
        this.#mouse.update();
        this.#keyboard.update();
    }
    getVector(negx, posx, negy, posy, scale) {
        return new Vector2(Number(this.isActionPressed(posx)) - Number(this.isActionPressed(negx)), Number(this.isActionPressed(posy)) - Number(this.isActionPressed(negy))).normalized.scale(scale);
    }
}
export const input = new InputManager();
