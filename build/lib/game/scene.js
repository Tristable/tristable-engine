import { GameObject } from "./GameObject.js";
export let sceneRoot = new GameObject("Default Scene Root");
export async function makeSceneRoot(obj) {
    await obj.preload();
    sceneRoot = obj;
    obj.ready();
}
