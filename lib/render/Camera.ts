import { Vector2 } from "../math/Vector2.js";
import { canvas } from "./canvas.js";

export class Camera {
    #zoom = 1;
    pos: Vector2 = new Vector2();
    zmin: number;
    zmax: number;
    #id: number = Math.random();

    constructor(zmin: number, zmax: number, current?: boolean) {
        this.zmin = zmin;
        this.zmax = zmax;
        if (current) this.current = true;
    }

    get id(): number {
        return this.#id;
    }

    static get default(): Camera {
        return new Camera(.2, 5);
    }

    set zoom(z: number) {
        this.#zoom = Math.min(Math.max(this.zmin, z), this.zmax);
    }

    get zoom(): number {
        return Math.min(Math.max(this.zmin, this.#zoom), this.zmax);
    }

    set(cam: Camera): Camera {
        this.zoom = cam.zoom;
        this.zmin = cam.zmin;
        this.zmax = cam.zmax;
        this.pos = cam.pos;
        return this;
    }

    set current(current: boolean) {
        if (current) currentCamera = this;
        else currentCamera = Camera.default;
    }

    get current(): boolean {
        return currentCamera.id == this.id;
    }

    toScreen(v: Vector2): Vector2 {
        return v.sub(this.pos).scale(this.zoom).add(new Vector2(canvas.width / 2, canvas.height / 2));
    }

    toWorld(v: Vector2): Vector2 {
        return v.sub(new Vector2(canvas.width / 2, canvas.height / 2)).scale(1 / this.zoom).add(this.pos);
    }
}

export let currentCamera: Camera = Camera.default;