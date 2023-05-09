import { Vector2 } from "../math/Vector2.js";
import { currentCamera } from "./Camera.js";
import { ctx } from "./canvas.js";

/** The configuration to use when drawing a `DrawLine`. */
export interface DrawLineConfig {
    /** Whether or not the `DrawLine` will ignore the camera and use screen position instead of world position.
     * 
     * Default: `false`
     */
    ignoreCamera?: boolean;

    /** The color for the `DrawLine`.
     * 
     * Default: `"white"`
    */
    color?: string;

    /** The thickness of the `DrawRect`. 
     * 
     * Default: `1`
    */
    width?: number;
}

/** Sets nullish values to their defaults on a `DrawLineConfig` */
export function createDrawLineConfig(config: DrawLineConfig): Required<DrawLineConfig> {
    return {
        ignoreCamera: config.ignoreCamera ?? false,
        color: config.color ?? "white",
        width: config.width ?? 1
    };
}

export class DrawLine {
    /** The 2D points that the `DrawLine` will connect. */
    points: Vector2[];

    /** The `DrawLineConfig` to be used to draw the `DrawLine`. */
    config: Required<DrawLineConfig>;

    constructor(points: Vector2[], config: DrawLineConfig) {
        this.points = points;
        this.config = createDrawLineConfig(config);
    }

    /** Draws the `DrawLine`. */
    draw(): void {
        ctx.lineWidth = this.config.width * (this.config.ignoreCamera ? 1 : currentCamera.zoom);
        ctx.strokeStyle = this.config.color;
        ctx.beginPath();
        let started = false;
        for (const i of this.points) {
            const { x, y }: Vector2 = this.config.ignoreCamera ? i : currentCamera.toScreen(i);
            ctx[started ? "lineTo" : "moveTo"](x, y);
            started = true;
        }
        ctx.stroke();
    }
}