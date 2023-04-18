import { Texture } from "../render/Texture.js";
import { Vector2 } from "../math/Vector2.js";
import { Object2D } from "./Object2D.js";
import { Sprite, SpriteConfig } from "../render/Sprite.js";
import { Rect2 } from "../math/Rect2.js";
import { GameObject } from "./GameObject.js";

/** A `GameObject` that renders a texture. Not to be confused with `Sprite`. */
export class SpriteObject extends Object2D {
    /** The texture for the `SpriteObject` to render. */
    texture: Texture;
    
    /** The display size for the `SpriteObject`. */
    size: Vector2;

    /** The configuration for the resulting `Sprite`. */
    spriteConfig: SpriteConfig;

    constructor(name: string, texture: Texture, pos: Vector2, size: Vector2, spriteConfig?: SpriteConfig, children?: GameObject[]) {
        super(name, pos, children);
        this.texture = texture;
        this.size = size;
        this.spriteConfig = spriteConfig ?? {};
    }

    /** The rectangle that the sprite is drawn inside. */
    set rect(rect: Rect2) {
        this.pos = rect.pos;
        this.size = rect.size;
    }

    get rect(): Rect2 {
        return new Rect2(this.globalPos, this.size);
    }

    override objectDraw(delta: number): void {
        super.objectDraw(delta);
        new Sprite(this.texture, this.rect, this.spriteConfig).draw();
    }
}