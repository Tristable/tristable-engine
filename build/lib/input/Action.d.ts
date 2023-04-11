import { InputManager } from "./InputManager.js";
export declare enum ActionEventType {
    MouseButton = 0,
    MouseMovement = 1,
    MouseWheel = 2,
    Key = 3
}
export declare enum WheelDirection {
    Up = 0,
    Down = 1
}
export interface ActionEventBase {
    inverted?: boolean;
}
export interface MouseButtonActionEvent extends ActionEventBase {
    type: ActionEventType.MouseButton;
    button: number;
}
export interface MouseMovementActionEvent extends ActionEventBase {
    type: ActionEventType.MouseMovement;
}
export interface MouseWheelActionEvent extends ActionEventBase {
    type: ActionEventType.MouseWheel;
    direction: WheelDirection;
}
export interface KeyActionEvent extends ActionEventBase {
    type: ActionEventType.Key;
    code: string;
}
export declare type ActionEvent = MouseButtonActionEvent | MouseMovementActionEvent | MouseWheelActionEvent | KeyActionEvent;
export declare class Action {
    #private;
    addEvent(e: ActionEvent): Action;
    set events(iter: Iterable<ActionEvent>);
    pressed(input: InputManager): boolean;
    justPressed(input: InputManager): boolean;
    static fromEventIter(iter: Iterable<ActionEvent>): Action;
}
