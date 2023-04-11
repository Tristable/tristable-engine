import { Vector2 } from "../math/Vector2.js";
export declare class MouseManager {
    #private;
    pos: Vector2;
    delta: Vector2;
    down: Set<number>;
    justPressed: Set<number>;
    wheelDelta: number;
    constructor();
    get worldPos(): Vector2;
    get worldDelta(): Vector2;
    get scrollingUp(): boolean;
    get scrollingDown(): boolean;
    isMouseDown(button?: number): boolean;
    isMouseJustPressed(button?: number): boolean;
    update(): void;
    updateJustPressed(): void;
}
