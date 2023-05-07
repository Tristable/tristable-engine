import { DrawText, DrawTextConfig, createDrawTextConfig } from "../render/DrawText.js";
import { Vector2 } from "../math/Vector2.js";
import { Object2D } from "./Object2D.js";
import { GameObject } from "./GameObject.js";

/** A `GameObject` that renders a `DrawText`. */
export class TextObject extends Object2D {
    /** The configuration for the resulting `DrawText`. */
    textConfig: Required<DrawTextConfig>;

    /** The text to be rendered by the `TextObject`. */
    text: string;

    constructor(name: string, text: string, pos?: Vector2, textConfig?: DrawTextConfig, children?: GameObject[]) {
        super(name, pos, children);
        this.text = text;
        this.textConfig = createDrawTextConfig(textConfig ?? {});
    }

    override objectDraw(delta: number): void {
        super.objectDraw(delta);
        new DrawText(this.text, this.globalPos, this.textConfig).draw();
    }
}