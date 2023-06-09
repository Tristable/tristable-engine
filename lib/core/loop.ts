import { drawToScreen } from "../render/canvas.js";
import { input } from "../input/InputManager.js";
import { sceneRoot } from "../game/scene.js";

export const updateLoopHandlers: Set<(delta: number) => void> = new Set();
export const drawLoopHandlers: Set<(delta: number) => void> = new Set();

let lastFrame: number = Date.now();
export let lastDelta = 0;

export const lastDeltas: number[] = new Array(20).fill(.016);

export function startLoops(): void { 
    setInterval(() => {
        const delta: number = (Date.now() - lastFrame) / 1000;
        lastFrame = Date.now();
        lastDelta = delta;
        lastDeltas.shift();
        lastDeltas.push(delta);

        sceneRoot.update(delta);
        for (const i of updateLoopHandlers) i(delta);
        sceneRoot.draw(delta);
        for (const i of drawLoopHandlers) i(delta);
        input.update();
        drawToScreen();
    }, 50 / 3);
}

export function onUpdate(f: (delta: number) => void): void {
    updateLoopHandlers.add(f);
}

export function onDraw(f: (delta: number) => void): void {
    drawLoopHandlers.add(f);
}

export function getFPS(): number {
    return lastDeltas.length / lastDeltas.reduce((t, v) => t + v);
}