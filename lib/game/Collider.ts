import { Rect2, RectComparisonData } from "../math/Rect2.js";
import { Vector2 } from "../math/Vector2.js";
import { DrawRect } from "../render/DrawRect.js";
import { GameObject } from "./GameObject.js";
import { Object2D } from "./Object2D.js";
import { sceneRoot } from "./scene.js";
import { debug } from "../core/debug.js";

export interface MaximumDistanceInfo {
    negx: number;
    negy: number;
    posx: number;
    posy: number;
}

export class Collider extends Object2D {
    /** The AABB for the `Collider` to check collisions in. Position is the offset from the `globalPos` of the `SpriteObject`. */
    rect: Rect2;

    constructor(name: string, rect: Rect2, pos?: Vector2, children?: GameObject[]) {
        super(name, pos, children);
        this.rect = rect;
    }

    /** The AABB for the `Collider` to check collisions in global space. */
    get globalRect(): Rect2 {
        return this.rect.translate(this.globalPos);
    }

    /** Every `Collider` in the scene tree. */
    get allColliders(): Collider[] {
        return sceneRoot.allNodes.filter((v) => v instanceof Collider) as Collider[];
    }

    /** Returns the `MaximumDistanceInfo` for this collider, based on every `Collider` in the scene tree. */
    get maxDistInfo(): MaximumDistanceInfo {
        const data: RectComparisonData[] = this.allColliders.filter((v) => v.id != this.id).map((v) => this.globalRect.comparisonData(v.globalRect));

        const negx: number = Math.min(...data.map((v) => v.leftSpace));
        const posx: number = Math.min(...data.map((v) => v.rightSpace));
        const negy: number = Math.min(...data.map((v) => v.topSpace));
        const posy: number = Math.min(...data.map((v) => v.bottomSpace));

        return {
            negx,
            negy,
            posx,
            posy
        };
    }

    override objectDraw(delta: number): void {
        super.objectDraw(delta);
        if (debug.visibleColliders) new DrawRect(this.globalRect, {
            stroke: "blue",
            strokeWidth: 5
        }).draw();
    }
}