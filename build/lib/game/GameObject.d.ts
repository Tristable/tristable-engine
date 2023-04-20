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
    constructor(name: string, children?: GameObject[]);
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
    /** Built-in functionality of the `GameObject` called on preload.
     *
     * When extending `GameObject`, `super.objectPreload()` must be called when overriding this.
     */
    objectPreload(): Promise<void>;
    /** Calls everything that happens on preload. */
    preload(): Promise<void>;
    /** Built-in functionality of the `GameObject` called on ready.
     *
     * When extending `GameObject`, `super.objectReady()` must be called when overriding this.
     */
    objectReady(): void;
    /** Calls everything that happens on ready. */
    ready(): void;
    /** Built-in functionality of the `GameObject` called on update.
     *
     * When extending `GameObject`, `super.objectUpdate(delta)` must be called when overriding this.
     */
    objectUpdate(delta: number): void;
    /** Calls everything that happens on update. */
    update(delta: number): void;
    /** Built-in functionality of the `GameObject` called on draw.
     *
     * When extending `GameObject`, `super.objectDraw(delta)` must be called when overriding this.
     */
    objectDraw(delta: number): void;
    /** Calls everything that happens on draw. */
    draw(delta: number): void;
    /** Adds a child `GameObject` to this `GameObject`. */
    addChild(child: GameObject): Promise<void>;
    /** Gets a child by its index in the array of children. */
    getChildByIndex(idx: number): GameObject | null;
    /** Gets a child by its `id` property. */
    getChildByID(id: number): GameObject | null;
    /** Gets a child by its `name` property. */
    getChildByName(name: string): GameObject | null;
    /** Set to true when the `GameObject` is added. */
    set inSceneTree(value: true);
    removeChild(id: number): void;
    remove(): void;
}
