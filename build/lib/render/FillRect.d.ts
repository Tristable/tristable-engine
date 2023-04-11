import { Rectangle } from "../math/Rect2.js";
export declare class FillRect {
    rect: Rectangle;
    ignoreCamera: boolean;
    constructor(rect: Rectangle, ignoreCamera?: boolean);
    draw(): any;
}
