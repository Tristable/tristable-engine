import { Object2D } from "./Object2D.js";
import { DrawRect } from "../render/DrawRect.js";
export class RectObject extends Object2D {
    /** The configuration for the resulting `DrawRect`. */
    rectConfig;
    /** The rectangle for the `DrawRect` to be drawn in. Position is the offset from the `globalPos` of the `RectObject`. */
    rect;
    constructor(name, rect, pos, rectConfig, children) {
        super(name, pos, children);
        this.rect = rect;
        this.rectConfig = rectConfig ?? {};
    }
    /** The rectangle for the `DrawRect` to be drawn in global space. */
    get globalRect() {
        return this.rect.translate(this.globalPos);
    }
    objectDraw(delta) {
        super.objectDraw(delta);
        new DrawRect(this.globalRect, this.rectConfig).draw();
    }
}
