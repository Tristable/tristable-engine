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
        const { pos, size }: Rect2 = this.config.ignoreCamera ? this.rect : this.rect.screen;
        const { x, y }: Vector2 = pos;
        const { x: w, y: h }: Vector2 = size;

        ctx.imageSmoothingEnabled = this.config.antialiasing;

        if (this.texture.partition == undefined) return ctx.drawImage(this.texture.src, x, y, w, h);

        const { pos: partitionPos, size: partitionSize }: Rect2 = this.texture.partition;
        const { x: px, y: py }: Vector2 = partitionPos;
        const { x: pw, y: ph }: Vector2 = partitionSize;
        return ctx.drawImage(this.texture.src, px, py, pw, ph, x, y, w, h);
    }
}