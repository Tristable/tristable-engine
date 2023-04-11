import { currentCamera } from "../tristable.js";
import { ctx } from "./canvas.js";
export class DrawText {
    text;
    pos;
    config;
    constructor(text, pos, config) {
        this.text = text;
        this.pos = pos;
        this.config = {
            ignoreCamera: config.ignoreCamera == undefined ? false : config.ignoreCamera,
            fill: config.fill == undefined ? false : config.fill,
            stroke: config.stroke == undefined ? false : config.stroke,
            strokeWidth: config.strokeWidth == undefined ? 1 : config.strokeWidth,
            font: config.font
        };
    }
    draw() {
        const { x, y } = this.config.ignoreCamera ? this.pos : currentCamera.toScreen(this.pos);
        ctx.lineWidth = this.config.strokeWidth;
        ctx.font = this.config.font;
        ctx.translate(x, y);
        if (!this.config.ignoreCamera)
            ctx.scale(currentCamera.zoom, currentCamera.zoom);
        if (this.config.fill) {
            ctx.fillStyle = this.config.fill;
            ctx.fillText(this.text, 0, 0);
        }
        if (this.config.stroke) {
            ctx.strokeStyle = this.config.stroke;
            ctx.strokeText(this.text, 0, 0);
        }
        ctx.resetTransform();
    }
}
