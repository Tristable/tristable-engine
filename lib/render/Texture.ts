import { Rect2 } from "../math/Rect2.js";

export class Texture {
    src: CanvasImageSource;
    partition?: Rect2;

    constructor(src: CanvasImageSource, partition?: Rect2) {
        this.src = src;
        this.partition = partition;
    }

    static loadFromURL(url: string, partition?: Rect2): Promise<Texture> {
        return new Promise((r: (v: Texture) => void, rj: (r: any) => void) => {
            const src = new Image();
            src.src = url;
            src.addEventListener("load", () => r(new Texture(src, partition)));
            src.addEventListener("error", (e: ErrorEvent) => {
                console.warn(`Failed to load image from ${url}`);
                rj(e);
            });
        });
    }
}