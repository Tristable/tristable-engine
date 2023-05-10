import { Vector2 } from "../math/Vector2.js";
import { Polygon } from "../math/Polygon.js";
import { currentCamera } from "./Camera.js";
import { ctx } from "./canvas.js";

/** The configuration to use when drawing a `DrawPolygon`. */
export interface DrawPolygonConfig {
    /** Whether or not the `DrawPolygon` will ignore the camera and use screen position instead of world position.
     * 
     * Default: `false`
     */
    ignoreCamera?: boolean;

    /** The color for the `DrawPolygon` to fill the polygon with. A value of `false` is no fill. 
     * 
     * Default: `false`
    */
    fill?: string | false;

    /** The color for the `DrawPolygon` to outline the polygon with. A value of `false` is no stroke. 
     * 
     * Default: `false`
    */
    stroke?: string | false;

    /** The width of the outline of the `DrawPolygon`. 
     * 
     * Default: `1`
    */
    strokeWidth?: number;

    /** The rotation in radians of the `DrawPolygon`. 
     * 
     * Default: `0`
    */
    rotation?: number;
}

/** Sets nullish values to their defaults on a `DrawPolygonConfig` */
export function createDrawPolygonConfig(config: DrawPolygonConfig): Required<DrawPolygonConfig> {
    return {
        ignoreCamera: config.ignoreCamera ?? false,
        fill: config.fill ?? false,
        stroke: config.stroke ?? false,
        strokeWidth: config.strokeWidth ?? 1,
        rotation: config.rotation ?? 0
    };
}

export class DrawPolygon {
    /** The `Polygon` to be used to draw the `PolygonRect`. */
    poly: Polygon;

    /** The `DrawPolygonConfig` to be used to draw the `DrawPolygon`. */
    config: Required<DrawPolygonConfig>;

    constructor(poly: Polygon, config: DrawPolygonConfig) {
        this.poly = poly;
        this.config = createDrawPolygonConfig(config);
    }

    /** Draws the `DrawPolygon`. */
    draw(): void {
        const { x: cx, y: cy } = this.config.ignoreCamera ? this.poly.center : currentCamera.toScreen(this.poly.center);
        ctx.translate(cx, cy);
        ctx.rotate(this.config.rotation);
        ctx.translate(-cx, -cy);

        ctx.lineWidth = this.config.strokeWidth * (this.config.ignoreCamera ? 1 : currentCamera.zoom);
        
        ctx.beginPath();
        let started = false;
        for (const i of this.poly.points) {
            const { x, y }: Vector2 = this.config.ignoreCamera ? i : currentCamera.toScreen(i);
            ctx[started ? "lineTo" : "moveTo"](x, y);
            started = true;
        }
        ctx.closePath();

        if (this.config.fill) {
            ctx.fillStyle = this.config.fill;
            ctx.fill();
        }

        if (this.config.stroke) {
            ctx.strokeStyle = this.config.stroke;
            ctx.stroke();
        }

        ctx.resetTransform();
    }
}