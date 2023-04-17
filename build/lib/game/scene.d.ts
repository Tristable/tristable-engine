import { GameObject } from "./GameObject.js";
/** The root of the scene tree. */
export declare let sceneRoot: GameObject;
/** Sets the root of the scene tree to a `GameObject`. */
export declare function makeSceneRoot(obj: GameObject): Promise<void>;
