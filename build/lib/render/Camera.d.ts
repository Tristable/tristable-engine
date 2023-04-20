import { Vector2 } from "../math/Vector2.js";
export declare class Camera {
    #private;
    pos: Vector2;
    zmin: number;
    zmax: number;
    constructor(zmin: number, zmax: number, current?: boolean);
    get id(): number;
    static get default(): Camera;
    set zoom(z: number);
    get zoom(): number;
    set(cam: Camera): Camera;
    set current(current: boolean);
    get current(): boolean;
    toScreen(v: Vector2): Vector2;
    toWorld(v: Vector2): Vector2;
}
export declare let currentCamera: Camera;
