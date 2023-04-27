import { Vector2 } from "../math/Vector2.js";
import { Rect2 } from "../math/Rect2.js";
import { GameObject } from "./GameObject.js";
import { Object2D } from "./Object2D.js";
import { DrawRectConfig } from "../render/DrawRect.js";
export declare class RectObject extends Object2D {
    /** The configuration for the resulting `DrawRect`. */
    rectConfig: DrawRectConfig;
    /** The rectangle for the `DrawRect` to be drawn in. Position is the offset from the `globalPos` of the `RectObject`. */
    rect: Rect2;
    constructor(name: string, rect: Rect2, pos?: Vector2, rectConfig?: DrawRectConfig, children?: GameObject[]);
    /** The rectangle for the `DrawRect` to be drawn in global space. */
    get globalRect(): Rect2;
    objectDraw(delta: number): void;
}
