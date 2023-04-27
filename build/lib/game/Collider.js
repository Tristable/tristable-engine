import { Object2D } from "./Object2D.js";
import { sceneRoot } from "./scene.js";
export class Collider extends Object2D {
    /** The AABB for the `Collider` to check collisions in. Position is the offset from the `globalPos` of the `SpriteObject`. */
    rect;
    constructor(name, rect, pos, children) {
        super(name, pos, children);
        this.rect = rect;
    }
    /** The AABB for the `Collider` to check collisions in global space. */
    get globalRect() {
        return this.rect.translate(this.globalPos);
    }
    /** Every `Collider` in the scene tree. */
    get allColliders() {
        return sceneRoot.allNodes.filter((v) => v instanceof Collider);
    }
    get maxDistInfo() {
        const data = this.allColliders.filter((v) => v.id != this.id).map((v) => this.globalRect.comparisonData(v.globalRect));
        const negx = Math.min(...data.map((v) => v.leftSpace));
        const posx = Math.min(...data.map((v) => v.rightSpace));
        const negy = Math.min(...data.map((v) => v.topSpace));
        const posy = Math.min(...data.map((v) => v.bottomSpace));
        return {
            negx,
            negy,
            posx,
            posy
        };
    }
}
