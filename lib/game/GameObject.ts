import { TristableError } from "../core/TristableError.js";
import { Collider } from "./Collider.js";

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
    #inSceneTree = false;

    constructor(name: string, children?: GameObject[]) {
        this.name = name;
        this.id = GameObject.nextFreeID++;
        GameObject.cache.set(this.id, this);
        if (children != undefined) for (const i of children) this.addChild(i);
    }

    /** Adds a function to be called on preload. If the object is added to the scene after the game loads, it will be called right before the object is added. */
    onPreload(f: () => void | Promise<void>): this {
        this.#preloadHandlers.add(f);
        return this;
    }

    /** Adds a function to be called on ready. If the object is added to the scene after the game loads, it will be called right after the object is added. */
    onReady(f: () => void): this {
        this.#readyHandlers.add(f);
        return this;
    }

    /** Adds a function to be called on update. */
    onUpdate(f: (delta: number) => void): this {
        this.#updateHandlers.add(f);
        return this;
    }

    /** Adds a function to be called on draw. */
    onDraw(f: (delta: number) => void): this {
        this.#drawHandlers.add(f);
        return this;
    }

    /** Gets a `GameObject` from `GameObject.cache` by its `id`. Returns `null` if the object is not found. */
    static getGameObjectByID<T extends GameObject>(id: number): T | null {
        return GameObject.cache.get(id) as T ?? null;
    }

    /** Built-in functionality of the `GameObject` called on preload.
     * 
     * When extending `GameObject`, `super.objectPreload()` must be called when overriding this.
     */
    async objectPreload(): Promise<void> {}

    /** Calls everything that happens on preload. */
    async preload(): Promise<void> {
        await this.objectPreload();
        for (const i of this.#preloadHandlers) await i();
        for (const i of this.#children) await i.preload();
    }

    /** Built-in functionality of the `GameObject` called on ready.
     * 
     * When extending `GameObject`, `super.objectReady()` must be called when overriding this.
     */
    objectReady(): void {
        this.inSceneTree = true;
    }

    /** Calls everything that happens on ready. */
    ready(): void {
        this.objectReady();
        for (const i of this.#readyHandlers) i();
        for (const i of this.#children) i.ready();
    }

    /** Built-in functionality of the `GameObject` called on update.
     * 
     * When extending `GameObject`, `super.objectUpdate(delta)` must be called when overriding this.
     */
    objectUpdate(delta: number): void {}

    /** Calls everything that happens on update. */
    update(delta: number): void {
        this.objectUpdate(delta);
        for (const i of this.#updateHandlers) i(delta);
        for (const i of this.#children) i.update(delta);
    }
    
    /** Built-in functionality of the `GameObject` called on draw.
     * 
     * When extending `GameObject`, `super.objectDraw(delta)` must be called when overriding this.
     */
    objectDraw(delta: number): void {}

    /** Calls everything that happens on draw. */
    draw(delta: number): void {
        this.objectDraw(delta);
        for (const i of this.#drawHandlers) i(delta);
        for (const i of this.#children) i.draw(delta);
    }

    /** Adds a child `GameObject` to this `GameObject`. */
    async addChild(child: GameObject): Promise<void> {
        child.parent = this;
        await child.preload();
        this.#children.push(child);
        if (this.#inSceneTree) child.ready();
    }

    /** Gets a child by its index in the array of children. */
    getChildByIndex<T extends GameObject>(idx: number): T | null {
        return this.#children[idx] as T ?? null;
    }

    /** Gets a child by its `id` property. */
    getChildByID<T extends GameObject>(id: number): T | null {
        return this.#children.find((v) => v.id == id) as T ?? null;
    }

    /** Gets a child by its `name` property. */
    getChildByName<T extends GameObject>(name: string): T | null {
        return this.#children.find((v) => v.name == name) as T ?? null;
    }

    /** Set to true when the `GameObject` is added. */
    set inSceneTree(value: true) {
        this.#inSceneTree = value;
    }

    /** Removes a child from the scene tree.*/
    removeChild(id: number): void {
        this.#children.splice(this.#children.findIndex((v) => v.id == id), 1);
    }

    /** Removes the `GameObject` from the scene tree. The `GameObject` must have a parent. */
    remove(): void {
        if (this.parent == undefined) throw new TristableError("Cannot remove a GameObject without a parent.");
        this.parent.removeChild(this.id);
    }

    /** A list of the `GameObject` and every descendant of the `GameObject` */
    get allNodes(): GameObject[] {
        const res: GameObject[] = [
            this
        ];

        for (const i of this.#children) res.push(...i.allNodes);

        return res;
    }

    /** The direct chilren of this `GameObject` in the scene tree. */
    get children(): GameObject[] {
        return this.#children;
    }
}