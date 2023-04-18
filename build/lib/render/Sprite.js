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
        const { pos: { x, y }, size: { x: w, y: h } } = this.config.ignoreCamera ? this.rect : this.rect.screen;
        ctx.imageSmoothingEnabled = this.config.antialiasing;
        if (this.texture.partition == undefined)
            return ctx.drawImage(this.texture.src, x, y, w, h);
        const { pos: { x: px, y: py }, size: { x: pw, y: ph } } = this.texture.partition;
        return ctx.drawImage(this.texture.src, px, py, pw, ph, x, y, w, h);
    }
}
