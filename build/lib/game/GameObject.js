export class GameObject {
    static nextFreeID = 0;
    static cache = new Map();
    id;
    name;
    parent = null;
    #components = new Set();
    #children = [];
    preloadHandlers = new Set();
    readyHandlers = new Set();
    updateHandlers = new Set();
    drawHandlers = new Set();
    constructor(name) {
        this.name = name;
        this.id = GameObject.nextFreeID++;
        GameObject.cache.set(this.id, this);
    }
    addComponent(component) {
        this.#components.add(component);
    }
    onPreload(f) {
        this.preloadHandlers.add(f);
    }
    onReady(f) {
        this.readyHandlers.add(f);
    }
    onUpdate(f) {
        this.updateHandlers.add(f);
    }
    onDraw(f) {
        this.drawHandlers.add(f);
    }
    static getGameObjectByID(id) {
        return GameObject.cache.get(id) ?? null;
    }
    async preload() {
        for (const i of this.#components)
            if (i.executeBeforeObject)
                await i.onPreload();
        for (const i of this.preloadHandlers)
            await i();
        for (const i of this.#components)
            if (!i.executeBeforeObject)
                await i.onPreload();
    }
    ready() {
        for (const i of this.#components)
            if (i.executeBeforeObject)
                i.onReady();
        for (const i of this.readyHandlers)
            i();
        for (const i of this.#components)
            if (!i.executeBeforeObject)
                i.onReady();
    }
    update(delta) {
        for (const i of this.#components)
            if (i.executeBeforeObject)
                i.onUpdate(delta);
        for (const i of this.updateHandlers)
            i(delta);
        for (const i of this.#components)
            if (!i.executeBeforeObject)
                i.onUpdate(delta);
    }
    draw(delta) {
        for (const i of this.#components)
            if (i.executeBeforeObject)
                i.onDraw(delta);
        for (const i of this.drawHandlers)
            i(delta);
        for (const i of this.#components)
            if (!i.executeBeforeObject)
                i.onDraw(delta);
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
