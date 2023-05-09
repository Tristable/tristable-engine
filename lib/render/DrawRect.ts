import { Rect2 } from "../math/Rect2.js";
import { Vector2 } from "../math/Vector2.js";
import { currentCamera } from "./Camera.js";
import { ctx } from "./canvas.js";

/** The configuration to use when drawing a `DrawRect`. */
export interface DrawRectConfig {
    /** Whether or not the `DrawRect` will ignore the camera and use screen position instead of world position.
     * 
     * Default: `false`
     */
    ignoreCamera?: boolean;

    /** The color for the `DrawRect` to fill the rectangle with. A value of `false` is no fill. 
     * 
     * Default: `false`
    */
    fill?: string | false;

    /** The color for the `DrawRect` to outline the rectangle with. A value of `false` is no stroke. 
     * 
     * Default: `false`
    */
    stroke?: string | false;

    /** The width of the outline of the `DrawRect`. 
     * 
     * Default: `1`
    */
    strokeWidth?: number;

    /** The rotation in radians of the `DrawRect`. 
     * 
     * Default: `0`
    */
    rotation?: number;
}

/** Sets nullish values to their defaults on a `DrawRectConfig` */
export function createDrawRectConfig(config: DrawRectConfig): Required<DrawRectConfig> {
    return {
        ignoreCamera: config.ignoreCamera ?? false,
        fill: config.fill ?? false,
        stroke: config.stroke ?? false,
        strokeWidth: config.strokeWidth ?? 1,
        rotation: config.rotation ?? 0
    };
}

/** A drawable rectangle. */
export class DrawRect {
    /** The `Rect2` to be used to draw the `DrawRect`. */
    rect: Rect2;

    /** The `DrawRectConfig` to be used to draw the `DrawRect`. */
    config: Required<DrawRectConfig>;

    constructor(rect: Rect2, config: DrawRectConfig) {
        this.rect = rect;
        this.config = createDrawRectConfig(config);
    }

    /** Draws the `DrawRect`. */
    draw(): void {
        const { pos, size }: Rect2 = this.config.ignoreCamera ? this.rect : this.rect.screen;
        const { x, y }: Vector2 = pos;
        const { x: w, y: h }: Vector2 = size;
        ctx.lineWidth = this.config.strokeWidth * (this.config.ignoreCamera ? 1 : currentCamera.zoom);

        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate(this.config.rotation);
        ctx.translate(-x - w / 2, -y - h / 2);

        if (this.config.fill) {
            ctx.fillStyle = this.config.fill;
            ctx.fillRect(x, y, w, h);
        }

        if (this.config.stroke) {
            ctx.strokeStyle = this.config.stroke;
            ctx.strokeRect(x, y, w, h);
        }
        
        ctx.resetTransform();
    }
}