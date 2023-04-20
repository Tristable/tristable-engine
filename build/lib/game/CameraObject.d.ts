import { Camera } from "../render/Camera.js";
import { Object2D } from "./Object2D.js";
import { Vector2 } from "../math/Vector2.js";
import { GameObject } from "./GameObject.js";
export declare class CameraObject extends Object2D {
    camera: Camera;
    constructor(name: string, camera: Camera, pos?: Vector2, children?: GameObject[]);
    objectUpdate(delta: number): void;
}
