import { Vector2 } from "../math/Vector2.js";
import { Component } from "./Component.js";

export class Transform extends Component {
    pos: Vector2 = new Vector2();
}