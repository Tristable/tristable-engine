import { Vector2 } from "../math/Vector2.js";
import { Action } from "./Action.js";
export declare class InputManager {
    #private;
    addAction(name: string, action: Action): void;
    get mousePos(): Vector2;
    get mouseWorldPos(): Vector2;
    get mouseDelta(): Vector2;
    get mouseWorldDelta(): Vector2;
    get mouseButtonsDown(): Set<number>;
    get mouseButtonsJustPressed(): Set<number>;
    get scrollDelta(): number;
    get scrollingUp(): boolean;
    get scrollingDown(): boolean;
    isMouseDown(button?: number): boolean;
    isMouseJustPressed(button?: number): boolean;
    isKeyDown(code: string): boolean;
    isKeyJustPressed(code: string): boolean;
    isActionPressed(name: string): boolean;
    isActionJustPressed(name: string): boolean;
    update(): void;
    getVector(negx: string, posx: string, negy: string, posy: string, scale: number): Vector2;
}
export declare const input: InputManager;
