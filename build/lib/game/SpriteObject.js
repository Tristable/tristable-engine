import { Object2D } from "./Object2D.js";
import { Sprite } from "../render/Sprite.js";
/** A `GameObject` that renders a texture. Not to be confused with `Sprite`. */
export class SpriteObject extends Object2D {
    /** The texture for the `SpriteObject` to render. */
    texture;
    /** The configuration for the resulting `Sprite`. */
    spriteConfig;
    /** The rectangle for the `Sprite` to be drawn in. Position is the offset from the `globalPos` of the `SpriteObject`. */
    rect;
    constructor(name, texture, rect, pos, spriteConfig, children) {
        super(name, pos, children);
        this.texture = texture;
        this.rect = rect;
        this.spriteConfig = spriteConfig ?? {};
    }
    /** The rectangle for the `Sprite` to be drawn in global space. */
    get globalRect() {
        return this.rect.translate(this.pos);
    }
    objectDraw(delta) {
        super.objectDraw(delta);
        new Sprite(this.texture, this.rect, this.spriteConfig).draw();
    }
}
