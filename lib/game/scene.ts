import { GameObject } from "./GameObject.js";

/** The root of the scene tree. */
export let sceneRoot: GameObject = new GameObject("Default Scene Root");

/** Sets the root of the scene tree to a `GameObject`. */
export async function makeSceneRoot(obj: GameObject): Promise<void> {
    await obj.preload();
    sceneRoot = obj;
    obj.ready();
}