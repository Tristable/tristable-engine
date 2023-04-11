import { Vector2 } from "../math/Vector2.js";
import { canvas } from "./canvas.js";
export class Camera {
    #zoom = 1;
    pos = new Vector2();
    zmin;
    zmax;
    #id = Math.random();
    constructor(zmin, zmax) {
        this.zmin = zmin;
        this.zmax = zmax;
    }
    get id() {
        return this.#id;
    }
    static get default() {
        return new Camera(.2, 5);
    }
    set zoom(z) {
        this.#zoom = Math.min(Math.max(this.zmin, z), this.zmax);
    }
    get zoom() {
        return Math.min(Math.max(this.zmin, this.#zoom), this.zmax);
    }
    set(cam) {
        this.zoom = cam.zoom;
        this.zmin = cam.zmin;
        this.zmax = cam.zmax;
        this.pos = cam.pos;
        return this;
    }
    set current(current) {
        if (current)
            currentCamera = this;
        else
            currentCamera = Camera.default;
    }
    get current() {
        return currentCamera.id == this.id;
    }
    toScreen(v) {
        return v.sub(this.pos).scale(this.zoom).add(new Vector2(canvas.width / 2, canvas.height / 2));
    }
    toWorld(v) {
        return v.sub(new Vector2(canvas.width / 2, canvas.height / 2)).scale(1 / this.zoom).add(this.pos);
    }
}
export let currentCamera = Camera.default;
