import { Vector2 } from "../math/Vector2.js";
import { Rect2 } from "../math/Rect2.js";
import { GameObject } from "./GameObject.js";
import { Object2D } from "./Object2D.js";
import { DrawRect, DrawRectConfig } from "../render/DrawRect.js";

export class RectObject extends Object2D {
    /** The configuration for the resulting `DrawRect`. */
    rectConfig: DrawRectConfig;

    /** The rectangle for the `DrawRect` to be drawn in. Position is the offset from the `globalPos` of the `RectObject`. */
    rect: Rect2;

    constructor(name: string, rect: Rect2, pos?: Vector2, rectConfig?: DrawRectConfig, children?: GameObject[]) {
        super(name, pos, children);
        this.rect = rect;
        this.rectConfig = rectConfig ?? {};
    }

    /** The rectangle for the `DrawRect` to be drawn in global space. */
    get globalRect(): Rect2 {
        return this.rect.translate(this.globalPos);
    }

    override objectDraw(delta: number): void {
        super.objectDraw(delta);
        new DrawRect(this.globalRect, this.rectConfig).draw();
    }
}