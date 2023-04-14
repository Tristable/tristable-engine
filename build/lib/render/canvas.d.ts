import { Vector2 } from "../math/Vector2.js";
export interface CanvasConfig {
    size: Vector2;
    bg?: string;
    offscreenBg?: string;
}
export declare const canvas: OffscreenCanvas;
export declare const ctx: OffscreenCanvasRenderingContext2D;
export declare const realCanvas: HTMLCanvasElement;
export declare const realCtx: CanvasRenderingContext2D;
export declare function configureCanvas(config: CanvasConfig): void;
export declare function updateCanvasStyle(config: CanvasConfig): void;
export declare function drawToScreen(): void;
