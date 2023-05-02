import { Rect2 } from "../math/Rect2.js";
import { Vector2 } from "../math/Vector2.js";
import { Texture } from "./Texture.js";
import { ctx } from "./canvas.js";

/** The configuration to use when drawing a `Sprite`. */
export interface SpriteConfig {
    /** Whether or not the `Sprite` will ignore the camera and use screen position instead of world position.
     * 
     * Default: `false`
     */
    ignoreCamera?: boolean;

    /** Whether or not the `Sprite` will be antialiased.
     * 
     * Default: `false`
     */
    antialiasing?: boolean;

    /** The rotation in radians of the `Sprite`. 
     * 
     * Default: `0`
    */
    rotation?: number;
}

/** Sets nullish values to their defaults on a `SpriteConfig` */
export function createSpriteConfig(config: SpriteConfig): Required<SpriteConfig> {
    return {
        ignoreCamera: config.ignoreCamera ?? false,
        antialiasing: config.antialiasing ?? false,
        rotation: config.rotation ?? 0
    };
}

export class Sprite {
    texture: Texture;
    rect: Rect2;
    config: Required<SpriteConfig>;

    constructor(texture: Texture, rect: Rect2, config: SpriteConfig) {
        this.texture = texture;
        this.config = createSpriteConfig(config);
        this.rect = rect;
    }

    draw(): void {
        const { pos: { x, y }, size: { x: w, y: h } }: Rect2 = this.config.ignoreCamera ? this.rect : this.rect.screen;

        ctx.imageSmoothingEnabled = this.config.antialiasing;
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate(this.config.rotation);
        ctx.translate(-x - w / 2, -y - h / 2);

        if (this.texture.partition == undefined) return ctx.drawImage(this.texture.src, x, y, w, h), ctx.resetTransform();

        const { pos: { x: px, y: py }, size: { x: pw, y: ph } }: Rect2 = this.texture.partition;
        ctx.drawImage(this.texture.src, px, py, pw, ph, x, y, w, h);

        ctx.resetTransform();
    }
}