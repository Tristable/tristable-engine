import { GameObject } from "./GameObject.js";

export let sceneRoot: GameObject = new GameObject("Default Scene Root");

export async function makeSceneRoot(obj: GameObject): Promise<void> {
    await obj.preload();
    sceneRoot = obj;
    obj.ready();
}