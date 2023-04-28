import { Rect2 } from "../math/Rect2.js";
import { TristableError } from "../core/TristableError.js";
/** A texture that can be rendered. */
export class Texture {
    /** The `CanvasImageSource` for the `Texture` to use. */
    src;
    /** The portion of the `CanvasImageSource` for the `Texture` to use. Usually used for getting a single texture from a spritesheet. */
    partition;
    constructor(src, partition) {
        this.src = src;
        this.partition = partition;
    }
    /** Loads a single texture from a URL or file path. */
    static loadFromURL(url, partition, fallback) {
        return new Promise((r, rj) => {
            const src = new Image();
            src.src = url;
            src.addEventListener("load", () => r(new Texture(src, partition)));
            src.addEventListener("error", (e) => {
                if (!fallback) {
                    rj(e);
                    throw new TristableError(`Failed to load image from ${url}`);
                }
                console.warn(`Failed to load image from ${url}`);
                r(fallback);
            });
        });
    }
    /** Loads multiple textures from a single source URL or file path. */
    static loadSpritesheetFromURL(url, partitions, fallback) {
        return new Promise((r, rj) => {
            const src = new Image();
            src.src = url;
            src.addEventListener("load", () => {
                const textures = new Map();
                for (const [k, v] of partitions)
                    textures.set(k, new Texture(src, v));
                r(textures);
            });
            src.addEventListener("error", (e) => {
                if (!fallback) {
                    rj(e);
                    throw new TristableError(`Failed to load image from ${url}`);
                }
                console.warn(`Failed to load image from ${url}`);
                const textures = new Map();
                for (const [k] of partitions)
                    textures.set(k, fallback);
                r(textures);
            });
        });
    }
    /** Loads multiple textures of the same size from a single source URL or file path. */
    static loadEvenSpritesheetFromURL(url, partitionSize, partitionPositions, fallback) {
        const partitions = new Map();
        for (const [k, v] of partitionPositions)
            partitions.set(k, new Rect2(v, partitionSize));
        return Texture.loadSpritesheetFromURL(url, partitions, fallback);
    }
    /** Creates an empty bitmap `Texture` with a certain size. */
    static generateEmpty(size) {
        return new Texture(new OffscreenCanvas(size.x, size.y));
    }
    /** Creates a solid color bitmap `Texture` with a certain size and color. */
    static solidColor(size, color) {
        const ca = new OffscreenCanvas(size.x, size.y);
        const c = ca.getContext("2d");
        c.fillStyle = color;
        c.fillRect(0, 0, size.x, size.y);
        return new Texture(ca);
    }
}
