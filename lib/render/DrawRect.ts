import { Rect2 } from "../math/Rect2.js";
import { Vector2 } from "../math/Vector2.js";
import { ctx } from "./canvas.js";

export interface DrawRectConfig {
    ignoreCamera?: boolean;
    fill?: string | false;
    stroke?: string | false;
    strokeWidth?: number;
}

export class DrawRect {
    rect: Rect2;
    config: Required<DrawRectConfig>;

    constructor(rect: Rect2, config: DrawRectConfig) {
        this.rect = rect;
        this.config = {
            ignoreCamera: config.ignoreCamera == undefined ? false : config.ignoreCamera,
            fill: config.fill == undefined ? false : config.fill,
            stroke: config.stroke == undefined ? false : config.stroke,
            strokeWidth: config.strokeWidth == undefined ? 1 : config.strokeWidth
        };
    }

    draw(): void {
        const { pos, size }: Rect2 = this.config.ignoreCamera ? this.rect : this.rect.screen;
        const { x, y }: Vector2 = pos;
        const { x: w, y: h }: Vector2 = size;
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