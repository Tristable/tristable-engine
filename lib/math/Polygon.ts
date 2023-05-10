import { Point, Vector2 } from "./Vector2.js";

/** A polygon which connects an array of points */
export interface RawPolygon {
    points: Point[];
}

/** A polygon which connects an array of points. Includes extra methods for math and utility. */
export class Polygon implements RawPolygon {
    /** The points that the `Polygon` will connect. */
    points: Vector2[];

    constructor(points: Vector2[] = []) {
        this.points = points;
    }

    /** Sets the points and size of the `Polygon` to another `Polygon`. */
    set(p: Polygon): Polygon {
        this.points = p.points;
        return this;
    }

    /** Translates the `Polygon` by a point. Creates a new `Polygon` and does not modify the original `Polygon`. */
    translate(v: Point): Polygon {
        return new Polygon(this.points.map((p) => p.add(v)));
    }

    /** Translates the `Polygon` by a point. Modifies the original `Polygon`. */
    translateAssign(v: Point): Polygon {
        for (const i of this.points) i.addAssign(v);
        return this;
    }

    /** Scales the `Polygon` by a scale factor. Creates a new `Polygon` and does not modify the original `Polygon`. */
    scale(f: number): Polygon {
        return new Polygon(this.points.map((p) => p.scale(f)));
    }

    /** Scales the `Polygon` by a scale factor. Modifies the original `Polygon`. */
    scaleAssign(f: number): Polygon {
        for (const i of this.points) i.scaleAssign(f);
        return this;
    }

    /** The center of the `Polygon`. */
    get center(): Vector2 {
        const xv: number[] = this.points.map((v) => v.x);
        const yv: number[] = this.points.map((v) => v.y);

        return new Vector2(
            (Math.max(...xv) + Math.min(...xv)) / 2,
            (Math.max(...yv) + Math.min(...yv)) / 2
        );
    }
}