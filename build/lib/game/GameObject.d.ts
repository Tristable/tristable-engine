/** A blank game object that can be added to the scene tree. */
export declare class GameObject {
    #private;
    /** The next `id` available for a `GameObject` */
    static nextFreeID: number;
    /** A map of `GameObject`s and their `id`s. */
    static cache: Map<number, GameObject>;
    /** The numerical ID of a `GameObject`. */
    id: number;
    /** The name of a `GameObject`. */
    name: string;
    /** The parent of a `GameObject` in the scene tree. If the object has no parent or is not in the scene tree, this value is `null` */
    parent: GameObject | null;
    constructor(name: string);
    /** Adds a function to be called on preload. If the object is added to the scene after the game loads, it will be called right before the object is added. */
    onPreload(f: () => void | Promise<void>): void;
    /** Adds a function to be called on ready. If the object is added to the scene after the game loads, it will be called right after the object is added. */
    onReady(f: () => void): void;
    /** Adds a function to be called on update. */
    onUpdate(f: (delta: number) => void): void;
    /** Adds a function to be called on draw. */
    onDraw(f: (delta: number) => void): void;
    /** Gets a `GameObject` from `GameObject.cache` by its `id`. Returns `null` if the object is not found. */
    static getGameObjectByID(id: number): GameObject | null;
    objectPreload(): Promise<void>;
    preload(): Promise<void>;
    objectReady(): void;
    ready(): void;
    objectUpdate(delta: number): void;
    update(delta: number): void;
    objectDraw(delta: number): void;
    draw(delta: number): void;
    addChild(child: GameObject): Promise<void>;
    getChildByIndex(idx: number): GameObject | null;
    getChildByID(id: number): GameObject | null;
    getChildByName(name: string): GameObject | null;
}
