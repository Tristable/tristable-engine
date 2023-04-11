import { Vector2 } from "../tristable.js";
export interface DrawTextConfig {
    font: string;
    ignoreCamera?: boolean;
    fill?: string | false;
    stroke?: string | false;
    strokeWidth?: number;
}
export declare class DrawText {
    text: string;
    pos: Vector2;
    config: Required<DrawTextConfig>;
    constructor(text: string, pos: Vector2, config: DrawTextConfig);
    draw(): void;
}
