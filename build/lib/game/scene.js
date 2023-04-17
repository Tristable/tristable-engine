import { GameObject } from "./GameObject.js";
/** The root of the scene tree. */
export let sceneRoot = new GameObject("Default Scene Root");
/** Sets the root of the scene tree to a `GameObject`. */
export async function makeSceneRoot(obj) {
    await obj.preload();
    sceneRoot = obj;
    obj.ready();
}
