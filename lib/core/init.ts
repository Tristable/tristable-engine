import { realCanvas } from "../render/canvas.js";
import { sceneRoot } from "../game/scene.js";
import { startLoops } from "./loop.js";
import { preloadHandlers } from "./preload.js";

export async function init(): Promise<void> {
    await sceneRoot.preload();
    for (const i of preloadHandlers) await i();

    document.body.appendChild(realCanvas);

    sceneRoot.ready();
    startLoops();
}