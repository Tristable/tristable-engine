import { Point, Vector2 } from "../math/Vector2.js";
import { ctx } from "./canvas.js";
import { currentCamera } from "./Camera.js";

/** The configuration to use when drawing a `DrawText`. */
export interface DrawTextConfig {
    /** The font and size to draw text with.
     * 
     * Default: `"16px arial"`
     */
    font?: string;
    ignoreCamera?: boolean;
    fill?: string | false;
    stroke?: string | false;
    strokeWidth?: number;
    rotation?: number;
    centered?: boolean;
}

/** Sets nullish values to their defaults on a `DrawRectConfig` */
export function createDrawTextConfig(config: DrawTextConfig): Required<DrawTextConfig> {
    return {
        font: config.font ?? "16px arial",
        ignoreCamera: config.ignoreCamera ?? false,
        fill: config.fill ?? false,
        stroke: config.stroke ?? false,
        strokeWidth: config.strokeWidth ?? 1,
        rotation: config.rotation ?? 0,
        centered: config.centered ?? false
    };
}

/** A drawable string of text. */
export class DrawText {
    /** The text to be drawn by the `DrawText`. */
    text: string;
    
    /** The position of the top-left corner of the `DrawText`. */
    pos: Vector2;

    /** The `DrawTextConfig` to be used to draw the `DrawText`. */
    config: Required<DrawTextConfig>;

    constructor(text: string, pos: Vector2, config: DrawTextConfig) {
        this.text = text;
        this.pos = pos;
        this.config = createDrawTextConfig(config);
    }

    /** Draws the `DrawText`. */
    draw(): void {
        const { x, y }: Vector2 = this.config.ignoreCamera ? this.pos : currentCamera.toScreen(this.pos);
        ctx.textBaseline = this.config.centered ? "middle" : "top";
        ctx.textAlign = this.config.centered ? "center" : "left";
        ctx.lineWidth = this.config.strokeWidth;
        ctx.font = this.config.font;

        const metrics: TextMetrics = ctx.measureText(this.text);
        const w: number = metrics.width;
        const h: number = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const cameraScale: number = this.config.ignoreCamera ? 1 : currentCamera.zoom;
        ctx.translate(x, y);
        ctx.rotate(this.config.rotation);
        ctx.scale(cameraScale, cameraScale);

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