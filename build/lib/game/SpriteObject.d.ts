import { Texture } from "../render/Texture.js";
import { Vector2 } from "../math/Vector2.js";
import { Object2D } from "./Object2D.js";
import { SpriteConfig } from "../render/Sprite.js";
import { Rect2 } from "../math/Rect2.js";
import { GameObject } from "./GameObject.js";
/** A `GameObject` that renders a texture. Not to be confused with `Sprite`. */
export declare class SpriteObject extends Object2D {
    /** The texture for the `SpriteObject` to render. */
    texture: Texture;
    /** The display size for the `SpriteObject`. */
    size: Vector2;
    /** The configuration for the resulting `Sprite`. */
    spriteConfig: SpriteConfig;
    constructor(name: string, texture: Texture, pos: Vector2, size: Vector2, spriteConfig?: SpriteConfig, children?: GameObject[]);
    /** The rectangle that the sprite is drawn inside. */
    set rect(rect: Rect2);
    get rect(): Rect2;
    objectDraw(delta: number): void;
}
