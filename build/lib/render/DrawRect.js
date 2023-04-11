import { ctx } from "./canvas.js";
export class DrawRect {
    rect;
    config;
    constructor(rect, config) {
        this.rect = rect;
        this.config = {
            ignoreCamera: config.ignoreCamera == undefined ? false : config.ignoreCamera,
            fill: config.fill == undefined ? false : config.fill,
            stroke: config.stroke == undefined ? false : config.stroke,
            strokeWidth: config.strokeWidth == undefined ? 1 : config.strokeWidth
        };
    }
    draw() {
        const { pos, size } = this.config.ignoreCamera ? this.rect : this.rect.screen;
        const { x, y } = pos;
        const { x: w, y: h } = size;
        ctx.lineWidth = this.config.strokeWidth;
        if (this.config.fill) {
            ctx.fillStyle = this.config.fill;
            ctx.fillRect(x, y, w, h);
        }
        if (this.config.stroke) {
            ctx.strokeStyle = this.config.stroke;
            ctx.strokeRect(x, y, w, h);
        }
    }
}
