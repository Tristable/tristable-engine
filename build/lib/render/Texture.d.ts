import { Rect2 } from "../math/Rect2.js";
import { Point, Vector2 } from "../math/Vector2.js";
/** A texture that can be rendered. */
export declare class Texture {
    /** The `CanvasImageSource` for the `Texture` to use. */
    src: CanvasImageSource;
    /** The portion of the `CanvasImageSource` for the `Texture` to use. Usually used for getting a single texture from a spritesheet. */
    partition?: Rect2;
    constructor(src: CanvasImageSource, partition?: Rect2);
    /** Loads a single texture from a URL or file path. */
    static loadFromURL(url: string, partition?: Rect2, fallback?: Texture): Promise<Texture>;
    /** Loads multiple textures from a single source URL or file path. */
    static loadSpritesheetFromURL(url: string, partitions: Map<string, Rect2>, fallback?: Texture): Promise<Map<string, Texture>>;
    /** Loads multiple textures of the same size from a single source URL or file path. */
    static loadEvenSpritesheetFromURL(url: string, partitionSize: Vector2, partitionPositions: Map<string, Vector2>, fallback?: Texture): Promise<Map<string, Texture>>;
    /** Creates an empty bitmap `Texture` with a certain size. */
    static generateEmpty(size: Point): Texture;
    /** Creates a solid color bitmap `Texture` with a certain size and color. */
    static solidColor(size: Point, color: string): Texture;
}
