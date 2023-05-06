import { Vector2 } from "../math/Vector2.js";
import { GameObject } from "./GameObject.js";
import { MovingObject } from "./MovingObject.js";

/** The environment for `PhysicsObject`s to use. */
export interface PhysicsEnvironment {
    /** The gravity to be applied to the y velocity of the `PhysicsObject` every update.
     * 
     * Default: 2400
     */
    gravity: number;

    /** The friction to be applied to the x velocity of the `PhysicsObject` when touching the ground.
     * 
     * Default: 0
    */
    friction: number;

    /** The air resistance to be applied to the x velocity of the `PhysicsObject` every update.
     * 
     * Default: 1000
    */
    airResistance: number;
}

export class PhysicsObject extends MovingObject {
    /** The `PhysicsEnvironment` for this `PhysicsObject` to use. */
    env: PhysicsEnvironment;

    /** The amount that the `PhysicsObject`'s x velocity will increase each frame. */
    acceleration = 0;

    /** The maximum absolute x velocity of the `PhysicsObject`. */
    maximumVelocity: number;

    constructor(name: string, env: Partial<PhysicsEnvironment> = {}, maximumVelocity = Infinity, pos?: Vector2, children?: GameObject[]) {
        super(name, true, pos, children);
        this.env = {
            gravity: env.gravity ?? 2400,
            friction: env.friction ?? 0,
            airResistance: env.airResistance ?? 1000
        };
        this.maximumVelocity = maximumVelocity;
    }

    override objectUpdate(delta: number): void {
        super.objectUpdate(delta);

        const wall: boolean = this.onWall;
        const floor: boolean = this.onFloor;
        const ceil: boolean = this.onCeil;

        if (!wall) {
            this.velocity.x += this.acceleration * delta;
            if (this.velocity.x > 0) this.velocity.x -= Math.min((this.env.airResistance + (floor ? this.env.friction : 0)) * delta, this.velocity.x);
            if (this.velocity.x < 0) this.velocity.x += Math.min((this.env.airResistance + (floor ? this.env.friction : 0)) * delta, -this.velocity.x);
            if (Math.abs(this.velocity.x) > this.maximumVelocity) this.velocity.x = this.velocity.x < 0 ? -this.maximumVelocity : this.maximumVelocity;
        } else this.velocity.x = 0;
        
        this.velocity.y += this.env.gravity * delta;
        if ((floor && this.velocity.y > 0) || (ceil && this.velocity.y < 0)) this.velocity.y = 0;
    }
}