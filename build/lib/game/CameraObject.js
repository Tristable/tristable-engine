import { Object2D } from "./Object2D.js";
export class CameraObject extends Object2D {
    camera;
    constructor(name, camera, pos, children) {
        super(name, pos, children);
        this.camera = camera;
    }
    objectUpdate(delta) {
        super.objectUpdate(delta);
        this.camera.pos = this.globalPos;
    }
}
