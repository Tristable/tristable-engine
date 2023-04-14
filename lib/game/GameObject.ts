import { Component } from "./Component.js";

export class GameObject {
    static nextFreeID = 0;
    static cache: Map<number, GameObject> = new Map();

    id: number;
    name: string;
    parent: GameObject | null = null;
    #components: Set<Component> = new Set();
    #children: GameObject[] = [];

    preloadHandlers: Set<() => void | Promise<void>> = new Set();
    readyHandlers: Set<() => void> = new Set();
    updateHandlers: Set<(delta: number) => void> = new Set();
    drawHandlers: Set<(delta: number) => void> = new Set();

    constructor(name: string) {
        this.name = name;
        this.id = GameObject.nextFreeID++;
        GameObject.cache.set(this.id, this);
    }

    addComponent(component: Component): void {
        this.#components.add(component);
    }

    onPreload(f: () => void | Promise<void>): void {
        this.preloadHandlers.add(f);
    }

    onReady(f: () => void): void {
        this.readyHandlers.add(f);
    }

    onUpdate(f: (delta: number) => void): void {
        this.updateHandlers.add(f);
    }

    onDraw(f: (delta: number) => void): void {
        this.drawHandlers.add(f);
    }

    static getGameObjectByID(id: number): GameObject | null {
        return GameObject.cache.get(id) ?? null;
    }

    async preload(): Promise<void> {
        for (const i of this.#components) if (i.executeBeforeObject) await i.onPreload();
        for (const i of this.preloadHandlers) await i();
        for (const i of this.#components) if (!i.executeBeforeObject) await i.onPreload();
    }

    ready(): void {
        for (const i of this.#components) if (i.executeBeforeObject) i.onReady();
        for (const i of this.readyHandlers) i();
        for (const i of this.#components) if (!i.executeBeforeObject) i.onReady();
    }

    update(delta: number): void {
        for (const i of this.#components) if (i.executeBeforeObject) i.onUpdate(delta);
        for (const i of this.updateHandlers) i(delta);
        for (const i of this.#components) if (!i.executeBeforeObject) i.onUpdate(delta);
    }

    draw(delta: number): void {
        for (const i of this.#components) if (i.executeBeforeObject) i.onDraw(delta);
        for (const i of this.drawHandlers) i(delta);
        for (const i of this.#components) if (!i.executeBeforeObject) i.onDraw(delta);
    }

    async addChild(child: GameObject): Promise<void> {
        child.parent = this;
        await child.preload();
        this.#children.push(child);
        child.ready();
    }

    getChildByIndex(idx: number): GameObject | null {
        return this.#children[idx] ?? null;
    }

    getChildByID(id: number): GameObject | null {
        return this.#children.find((v) => v.id == id) ?? null;
    }

    getChildByName(name: string): GameObject | null {
        return this.#children.find((v) => v.name == name) ?? null;
    }
}