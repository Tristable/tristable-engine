import { Rect2 } from "../math/Rect2.js";
import { Point, Vector2 } from "../math/Vector2.js";
import { TristableError } from "../core/TristableError.js";

/** A texture that can be rendered. */
export class Texture {
    /** The `ImageBitmap` for the `Texture` to use. */
    src: ImageBitmap;
    
    /** The portion of the `ImageBitmap` for the `Texture` to use. Usually used for getting a single texture from a spritesheet. */
    partition?: Rect2;

    constructor(src: ImageBitmap, partition?: Rect2) {
        this.src = src;
        this.partition = partition;
    }

    static async createFromSource(source: ImageBitmapSource, partition?: Rect2, fallback?: Texture): Promise<Texture> {
        return new Texture(await (fallback != undefined ? createImageBitmap(source).catch(() => fallback.src) : createImageBitmap(source)), partition);
    }

    /** Loads a single texture from a URL or file path. */
    static loadFromURL(url: string, partition?: Rect2, fallback?: Texture): Promise<Texture> {
        return new Promise((r: (v: Texture) => void, rj: (r: any) => void) => {
            const src: HTMLImageElement = new Image();
            src.src = url;
            src.addEventListener("load", () => Texture.createFromSource(src, partition, fallback).then(r).catch(rj));
            src.addEventListener("error", (e: ErrorEvent) => {
                if (!fallback) {
                    rj(e);
                    throw new TristableError(`Failed to load image from ${url}`);
                }
                console.warn(`Failed to load image from ${url}`);
                r(fallback);
            });
        });
    }

    /** Repeats `source` across a texture of size `size` every `repeatSize` units. `source` is scaled to `repeatSize`. */
    static createTiled(source: Texture, size: Vector2, repeatSize: Vector2): Promise<Texture> {
        const oc: OffscreenCanvas = new OffscreenCanvas(size.x, size.y);
        const c: OffscreenCanvasRenderingContext2D = oc.getContext("2d")!;

        console.log(Math.ceil(size.x / repeatSize.x) * Math.ceil(size.y / repeatSize.y));

        for (let x = 0; x < size.x / repeatSize.x; x++) {
            for (let y = 0; y < size.y / repeatSize.y; y++) {
                if (source.partition == undefined) {
                    c.drawImage(source.src, x * repeatSize.x, y * repeatSize.y, repeatSize.x, repeatSize.y);
                    continue;
                }

                const { pos: { x: px, y: py }, size: { x: pw, y: ph } }: Rect2 = source.partition;
                c.drawImage(source.src, px, py, pw, ph, x * repeatSize.x, y * repeatSize.y, repeatSize.x, repeatSize.y);
            }
        }

        return Texture.createFromSource(oc);
    }

    /** Loads multiple textures from a single source URL or file path. */
    static loadSpritesheetFromURL(url: string, partitions: Map<string, Rect2>, fallback?: Texture): Promise<Map<string, Texture>> {
        return new Promise((r: (v: Map<string, Texture>) => void, rj: (r: any) => void) => {
            const src = new Image();
            src.src = url;
            src.addEventListener("load", () => {
                const textures: Map<string, Texture> = new Map();
                const promises: Promise<void>[] = [];
                for (const [k, v] of partitions) promises.push((Texture.createFromSource(src, v, fallback).then((t) => textures.set(k, t), undefined) as Promise<void>).catch(rj));
                Promise.all(promises).then(() => r(textures));
            });
            src.addEventListener("error", (e: ErrorEvent) => {
                if (!fallback) {
                    rj(e);
                    throw new TristableError(`Failed to load image from ${url}`);
                }
                console.warn(`Failed to load image from ${url}`);
                const textures: Map<string, Texture> = new Map();
                for (const [k] of partitions) textures.set(k, fallback);
                r(textures);
            });
        });
    }

    /** Loads multiple textures of the same size from a single source URL or file path. */
    static loadEvenSpritesheetFromURL(url: string, partitionSize: Vector2, partitionPositions: Map<string, Vector2>, fallback?: Texture): Promise<Map<string, Texture>> {
        const partitions: Map<string, Rect2> = new Map();
        for (const [k, v] of partitionPositions) partitions.set(k, new Rect2(v, partitionSize));
        return Texture.loadSpritesheetFromURL(url, partitions, fallback);
    }

    /** Creates an empty bitmap `Texture` with a certain size. */
    static async generateEmpty(size: Point): Promise<Texture> {
        return await Texture.createFromSource(new OffscreenCanvas(size.x, size.y));
    }

    /** Creates a solid color bitmap `Texture` with a certain size and color. */
    static async solidColor(size: Point, color: string): Promise<Texture> {
        const ca: OffscreenCanvas = new OffscreenCanvas(size.x, size.y);
        const c: OffscreenCanvasRenderingContext2D = ca.getContext("2d")!;
        c.fillStyle = color;
        c.fillRect(0, 0, size.x, size.y);
        return Texture.createFromSource(ca);
    }
}