import { ctx } from "./canvas.js";
export class Sprite {
    texture;
    rect;
    config;
    constructor(texture, rect, config) {
        this.texture = texture;
        this.config = {
            ignoreCamera: config.ignoreCamera == undefined ? false : config.ignoreCamera,
            antialiasing: config.antialiasing == undefined ? false : config.antialiasing
        };
        this.rect = rect;
    }
    draw() {
        const { pos, size } = this.config.ignoreCamera ? this.rect : this.rect.screen;
        const { x, y } = pos;
        const { x: w, y: h } = size;
        ctx.imageSmoothingEnabled = this.config.antialiasing;
        if (this.texture.partition == undefined)
            return ctx.drawImage(this.texture.src, x, y, w, h);
        const { pos: partitionPos, size: partitionSize } = this.texture.partition;
        const { x: px, y: py } = partitionPos;
        const { x: pw, y: ph } = partitionSize;
        return ctx.drawImage(this.texture.src, px, py, pw, ph, x, y, w, h);
    }
}
