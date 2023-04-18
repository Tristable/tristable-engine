import { Object2D } from "./Object2D.js";
import { Sprite } from "../render/Sprite.js";
import { Rect2 } from "../math/Rect2.js";
/** A `GameObject` that renders a texture. Not to be confused with `Sprite`. */
export class SpriteObject extends Object2D {
    /** The texture for the `SpriteObject` to render. */
    texture;
    /** The display size for the `SpriteObject`. */
    size;
    /** The configuration for the resulting `Sprite`. */
    spriteConfig;
    constructor(name, texture, pos, size, spriteConfig, children) {
        super(name, pos, children);
        this.texture = texture;
        this.size = size;
        this.spriteConfig = spriteConfig ?? {};
    }
    /** The rectangle that the sprite is drawn inside. */
    set rect(rect) {
        this.pos = rect.pos;
        this.size = rect.size;
    }
    get rect() {
        return new Rect2(this.globalPos, this.size);
    }
    objectDraw(delta) {
        super.objectDraw(delta);
        new Sprite(this.texture, this.rect, this.spriteConfig).draw();
    }
}
