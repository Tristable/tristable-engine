/** A blank game object that can be added to the scene tree. */
export class GameObject {
    /** The next `id` available for a `GameObject` */
    static nextFreeID = 0;

    /** A map of `GameObject`s and their `id`s. */
    static cache: Map<number, GameObject> = new Map();

    /** The numerical ID of a `GameObject`. */
    id: number;

    /** The name of a `GameObject`. */
    name: string;

    /** The parent of a `GameObject` in the scene tree. If the object has no parent or is not in the scene tree, this value is `null` */
    parent: GameObject | null = null;

    #children: GameObject[] = [];
    #preloadHandlers: Set<() => void | Promise<void>> = new Set();
    #readyHandlers: Set<() => void> = new Set();
    #updateHandlers: Set<(delta: number) => void> = new Set();
    #drawHandlers: Set<(delta: number) => void> = new Set();

    constructor(name: string, children?: GameObject[]) {
        this.name = name;
        this.id = GameObject.nextFreeID++;
        GameObject.cache.set(this.id, this);
        if (children != undefined) for (const i of children) this.addChild(i);
    }

    /** Adds a function to be called on preload. If the object is added to the scene after the game loads, it will be called right before the object is added. */
    onPreload(f: () => void | Promise<void>): void {
        this.#preloadHandlers.add(f);
    }

    /** Adds a function to be called on ready. If the object is added to the scene after the game loads, it will be called right after the object is added. */
    onReady(f: () => void): void {
        this.#readyHandlers.add(f);
    }

    /** Adds a function to be called on update. */
    onUpdate(f: (delta: number) => void): void {
        this.#updateHandlers.add(f);
    }

    /** Adds a function to be called on draw. */
    onDraw(f: (delta: number) => void): void {
        this.#drawHandlers.add(f);
    }

    /** Gets a `GameObject` from `GameObject.cache` by its `id`. Returns `null` if the object is not found. */
    static getGameObjectByID(id: number): GameObject | null {
        return GameObject.cache.get(id) ?? null;
    }

    /** Built-in functionality of the `GameObject` called on preload.
     * 
     * When extending `GameObject`, `super.objectPreload()` must be called when overriding this.
     */
    async objectPreload(): Promise<void> {}

    /** Calls everything that happens on preload. */
    async preload(): Promise<void> {
        await this.objectPreload();
        for (const i of this.#children) await i.preload();
        for (const i of this.#preloadHandlers) await i();
    }

    /** Built-in functionality of the `GameObject` called on ready.
     * 
     * When extending `GameObject`, `super.objectReady()` must be called when overriding this.
     */
    objectReady(): void {}

    /** Calls everything that happens on ready. */
    ready(): void {
        this.objectReady();
        for (const i of this.#children) i.ready();
        for (const i of this.#readyHandlers) i();
    }

    /** Built-in functionality of the `GameObject` called on update.
     * 
     * When extending `GameObject`, `super.objectUpdate(delta)` must be called when overriding this.
     */
    objectUpdate(delta: number): void {}

    /** Calls everything that happens on update. */
    update(delta: number): void {
        this.objectUpdate(delta);
        for (const i of this.#children) i.update(delta);
        for (const i of this.#updateHandlers) i(delta);
    }
    
    /** Built-in functionality of the `GameObject` called on draw.
     * 
     * When extending `GameObject`, `super.objectDraw(delta)` must be called when overriding this.
     */
    objectDraw(delta: number): void {}

    /** Calls everything that happens on draw. */
    draw(delta: number): void {
        this.objectDraw(delta);
        for (const i of this.#children) i.draw(delta);
        for (const i of this.#drawHandlers) i(delta);
    }

    /** Adds a child `GameObject` to this `GameObject`. */
    async addChild(child: GameObject): Promise<void> {
        child.parent = this;
        await child.preload();
        this.#children.push(child);
        child.ready();
    }

    /** Gets a child by its index in the array of children. */
    getChildByIndex(idx: number): GameObject | null {
        return this.#children[idx] ?? null;
    }

    /** Gets a child by its `id` property. */
    getChildByID(id: number): GameObject | null {
        return this.#children.find((v) => v.id == id) ?? null;
    }

    /** Gets a child by its `name` property. */
    getChildByName(name: string): GameObject | null {
        return this.#children.find((v) => v.name == name) ?? null;
    }
}