/** A blank game object that can be added to the scene tree. */
class GameObject {
    /** The next `id` available for a `GameObject` */
    static nextFreeID = 0;
    /** A map of `GameObject`s and their `id`s. */
    static cache = new Map();
    /** The numerical ID of a `GameObject`. */
    id;
    /** The name of a `GameObject`. */
    name;
    /** The parent of a `GameObject` in the scene tree. If the object has no parent or is not in the scene tree, this value is `null` */
    parent = null;
    #children = [];
    #preloadHandlers = new Set();
    #readyHandlers = new Set();
    #updateHandlers = new Set();
    #drawHandlers = new Set();
    constructor(name) {
        this.name = name;
        this.id = GameObject.nextFreeID++;
        GameObject.cache.set(this.id, this);
    }
    /** Adds a function to be called on preload. If the object is added to the scene after the game loads, it will be called right before the object is added. */
    onPreload(f) {
        this.#preloadHandlers.add(f);
    }
    /** Adds a function to be called on ready. If the object is added to the scene after the game loads, it will be called right after the object is added. */
    onReady(f) {
        this.#readyHandlers.add(f);
    }
    /** Adds a function to be called on update. */
    onUpdate(f) {
        this.#updateHandlers.add(f);
    }
    /** Adds a function to be called on draw. */
    onDraw(f) {
        this.#drawHandlers.add(f);
    }
    /** Gets a `GameObject` from `GameObject.cache` by its `id`. Returns `null` if the object is not found. */
    static getGameObjectByID(id) {
        return GameObject.cache.get(id) ?? null;
    }
    async objectPreload() { }
    async preload() {
        await this.objectPreload();
        for (const i of this.#children)
            await i.preload();
        for (const i of this.#preloadHandlers)
            await i();
    }
    objectReady() { }
    ready() {
        this.objectReady();
        for (const i of this.#children)
            i.ready();
        for (const i of this.#readyHandlers)
            i();
    }
    objectUpdate(delta) { }
    update(delta) {
        this.objectUpdate(delta);
        for (const i of this.#children)
            i.update(delta);
        for (const i of this.#updateHandlers)
            i(delta);
    }
    objectDraw(delta) { }
    draw(delta) {
        this.objectDraw(delta);
        for (const i of this.#children)
            i.draw(delta);
        for (const i of this.#drawHandlers)
            i(delta);
    }
    async addChild(child) {
        child.parent = this;
        await child.preload();
        this.#children.push(child);
        child.ready();
    }
    getChildByIndex(idx) {
        return this.#children[idx] ?? null;
    }
    getChildByID(id) {
        return this.#children.find((v) => v.id == id) ?? null;
    }
    getChildByName(name) {
        return this.#children.find((v) => v.name == name) ?? null;
    }
}
export { GameObject };
