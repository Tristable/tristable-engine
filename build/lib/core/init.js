import { realCanvas } from "../render/canvas.js";
import { sceneRoot } from "../game/scene.js";
import { startLoops } from "./loop.js";
import { preloadHandlers } from "./preload.js";
import { treeSetupHandlers } from "./treeSetup.js";
/** Initializes Tristable Engine and starts the game. */
export async function init() {
    await sceneRoot.preload();
    for (const i of preloadHandlers)
        await i();
    document.body.appendChild(realCanvas);
    for (const i of treeSetupHandlers)
        i();
    sceneRoot.ready();
    startLoops();
}
