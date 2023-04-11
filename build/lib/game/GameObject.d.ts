import { Component } from "./Component.js";
export declare class GameObject {
    #private;
    static nextFreeID: number;
    static cache: Map<number, GameObject>;
    id: number;
    name: string;
    parent: GameObject | null;
    preloadHandlers: Set<() => void | Promise<void>>;
    readyHandlers: Set<() => void>;
    updateHandlers: Set<(delta: number) => void>;
    drawHandlers: Set<(delta: number) => void>;
    constructor(name: string);
    addComponent(component: Component): void;
    onPreload(f: () => void | Promise<void>): void;
    onReady(f: () => void): void;
    onUpdate(f: (delta: number) => void): void;
    onDraw(f: (delta: number) => void): void;
    static getGameObjectByID(id: number): GameObject | null;
    preload(): Promise<void>;
    ready(): void;
    update(delta: number): void;
    draw(delta: number): void;
    addChild(child: GameObject): Promise<void>;
    getChildByIndex(idx: number): GameObject | null;
    getChildByID(id: number): GameObject | null;
    getChildByName(name: string): GameObject | null;
}
