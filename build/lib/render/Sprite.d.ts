import { Rect2 } from "../math/Rect2.js";
import { Texture } from "./Texture.js";
export interface SpriteConfig {
    ignoreCamera?: boolean;
    antialiasing?: boolean;
}
export declare class Sprite {
    texture: Texture;
    rect: Rect2;
    config: Required<SpriteConfig>;
    constructor(texture: Texture, rect: Rect2, config: SpriteConfig);
    draw(): void;
}
