import { Rect2 } from "../math/Rect2.js";
export declare class Texture {
    src: CanvasImageSource;
    partition?: Rect2;
    constructor(src: CanvasImageSource, partition?: Rect2);
    static loadFromURL(url: string, partition?: Rect2): Promise<Texture>;
}
