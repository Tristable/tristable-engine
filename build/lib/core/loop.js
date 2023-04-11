import { drawToScreen } from "../render/canvas.js";
import { input } from "../input/InputManager.js";
import { sceneRoot } from "../game/scene.js";
export const updateLoopHandlers = new Set();
export const drawLoopHandlers = new Set();
let lastFrame = Date.now();
let lastDelta = 0;
export function startLoops() {
    setInterval(() => {
        const delta = (Date.now() - lastFrame) / 1000;
        lastFrame = Date.now();
        lastDelta = delta;
        sceneRoot.update(delta);
        for (const i of updateLoopHandlers)
            i(delta);
        sceneRoot.draw(delta);
        for (const i of drawLoopHandlers)
            i(delta);
        input.update();
        drawToScreen();
    }, 50 / 3);
}
export function onUpdate(f) {
    updateLoopHandlers.add(f);
}
export function onDraw(f) {
    drawLoopHandlers.add(f);
}
export function getFPS() {
    return 1 / lastDelta;
}
