import { Vector2 } from "../math/Vector2.js";
import { Action } from "./Action.js";
import { KeyboardManager } from "./KeyboardManager.js";
import { MouseManager } from "./MouseManager.js";

export class InputManager {
    #actions: Map<string, Action> = new Map();
    #mouse: MouseManager = new MouseManager();
    #keyboard: KeyboardManager = new KeyboardManager();

    addAction(name: string, action: Action): void {
        this.#actions.set(name, action);
    }

    get mousePos(): Vector2 {
        return this.#mouse.pos;
    }

    get mouseWorldPos(): Vector2 {
        return this.#mouse.worldPos;
    }

    get mouseDelta(): Vector2 {
        return this.#mouse.delta;
    }

    get mouseWorldDelta(): Vector2 {
        return this.#mouse.worldDelta;
    }

    get mouseButtonsDown(): Set<number> {
        return this.#mouse.down;
    }

    get mouseButtonsJustPressed(): Set<number> {
        return this.#mouse.justPressed;
    }

    get scrollDelta(): number {
        return this.#mouse.wheelDelta;
    }

    get scrollingUp(): boolean {
        return this.#mouse.scrollingUp;
    }

    get scrollingDown(): boolean {
        return this.#mouse.scrollingDown;
    }

    isMouseDown(button = 0): boolean {
        return this.#mouse.isMouseDown(button);
    }

    isMouseJustPressed(button = 0): boolean {
        return this.#mouse.isMouseJustPressed(button);
    }

    isKeyDown(code: string): boolean {
        return this.#keyboard.isKeyDown(code);
    }

    isKeyJustPressed(code: string): boolean {
        return this.#keyboard.isKeyJustPressed(code);
    }

    isActionPressed(name: string): boolean {
        if (!this.#actions.has(name)) return false;
        return this.#actions.get(name)!.pressed(this);
    }

    isActionJustPressed(name: string): boolean {
        if (!this.#actions.has(name)) return false;
        return this.#actions.get(name)!.justPressed(this);
    }

    update(): void {
        this.#mouse.update();
        this.#keyboard.update();
    }

    getVector(negx: string, posx: string, negy: string, posy: string, scale: number): Vector2 {
        return new Vector2(
            Number(this.isActionPressed(posx)) - Number(this.isActionPressed(negx)),
            Number(this.isActionPressed(posy)) - Number(this.isActionPressed(negy))
        ).normalized.scale(scale);
    }
}

export const input: InputManager = new InputManager();