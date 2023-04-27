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
    /** The configuration for the resulting `Sprite`. */
    spriteConfig: SpriteConfig;
    /** The rectangle for the `Sprite` to be drawn in. Position is the offset from the `globalPos` of the `SpriteObject`. */
    rect: Rect2;
    constructor(name: string, texture: Texture, rect: Rect2, pos?: Vector2, spriteConfig?: SpriteConfig, children?: GameObject[]);
    /** The rectangle for the `Sprite` to be drawn in global space. */
    get globalRect(): Rect2;
    objectDraw(delta: number): void;
}
