import { Rect2 } from "../math/Rect2.js";
import { Vector2 } from "../math/Vector2.js";
import { Texture } from "./Texture.js";
import { ctx } from "./canvas.js";

export interface SpriteConfig {
    ignoreCamera?: boolean;
    antialiasing?: boolean;
}

export class Sprite {
    texture: Texture;
    rect: Rect2;
    config: Required<SpriteConfig>;

    constructor(texture: Texture, rect: Rect2, config: SpriteConfig) {
        this.texture = texture;
        this.config = {
            ignoreCamera: config.ignoreCamera == undefined ? false : config.ignoreCamera,
            antialiasing: config.antialiasing == undefined ? false : config.antialiasing
        };
        this.rect = rect;
    }

    draw(): void {
        const { pos: { x, y }, size: { x: w, y: h } }: Rect2 = this.config.ignoreCamera ? this.rect : this.rect.screen;

        ctx.imageSmoothingEnabled = this.config.antialiasing;

        if (this.texture.partition == undefined) return ctx.drawImage(this.texture.src, x, y, w, h);

        const { pos: { x: px, y: py }, size: { x: pw, y: ph } }: Rect2 = this.texture.partition;
        return ctx.drawImage(this.texture.src, px, py, pw, ph, x, y, w, h);
    }
}