import { Rect2 } from "../math/Rect2.js";
export interface DrawRectConfig {
    ignoreCamera?: boolean;
    fill?: string | false;
    stroke?: string | false;
    strokeWidth?: number;
}
export declare class DrawRect {
    rect: Rect2;
    config: Required<DrawRectConfig>;
    constructor(rect: Rect2, config: DrawRectConfig);
    draw(): void;
}
