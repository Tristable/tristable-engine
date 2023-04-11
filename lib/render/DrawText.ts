import { Vector2, currentCamera } from "../tristable.js";
import { ctx } from "./canvas.js";

export interface DrawTextConfig {
    font: string;
    ignoreCamera?: boolean;
    fill?: string | false;
    stroke?: string | false;
    strokeWidth?: number;
}

export class DrawText {
    text: string;
    pos: Vector2;
    config: Required<DrawTextConfig>;

    constructor(text: string, pos: Vector2, config: DrawTextConfig) {
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

    draw(): void {
        const { x, y }: Vector2 = this.config.ignoreCamera ? this.pos : currentCamera.toScreen(this.pos);
        ctx.lineWidth = this.config.strokeWidth;
        ctx.font = this.config.font;

        ctx.translate(x, y);
        if (!this.config.ignoreCamera) ctx.scale(currentCamera.zoom, currentCamera.zoom);

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