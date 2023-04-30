import { InputManager } from "./InputManager.js";

export enum ActionEventType {
    MouseButton,
    MouseMovement,
    MouseWheel,
    Key
}

export enum WheelDirection {
    Up,
    Down
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
    direction: WheelDirection
}

export interface KeyActionEvent extends ActionEventBase {
    type: ActionEventType.Key;
    code: string;
}

export type ActionEvent = MouseButtonActionEvent | MouseMovementActionEvent | MouseWheelActionEvent | KeyActionEvent;

export class Action {
    #events: Set<ActionEvent> = new Set();

    addEvent(e: ActionEvent): Action {
        this.#events.add(e);
        return this;
    }

    set events(iter: Iterable<ActionEvent>) {
        this.#events = new Set(iter);
    }

    pressed(input: InputManager): boolean {
        let pressed = false;

        for (const i of this.#events) {
            const eventPressed: boolean | null = ((): boolean | null => {
                if (i.type == ActionEventType.MouseMovement) return input.mouseDelta.distSquared != 0;
                if (i.type == ActionEventType.MouseButton) return input.isMouseDown(i.button);
                if (i.type == ActionEventType.MouseWheel) return i.direction == WheelDirection.Down ? input.scrollDelta > 0 : input.scrollDelta < 0;
                if (i.type == ActionEventType.Key) return input.isKeyDown(i.code);
                return null;
            })();

            if (eventPressed == null) continue;

            pressed = pressed || (i.inverted ? !eventPressed : eventPressed);
        }
        
        return pressed;
    }

    justPressed(input: InputManager): boolean {
        let pressed = false;

        for (const i of this.#events) {
            const eventPressed: boolean | null = ((): boolean | null => {
                if (i.type == ActionEventType.MouseMovement) return input.mouseDelta.distSquared != 0;
                if (i.type == ActionEventType.MouseButton) return input.isMouseJustPressed(i.button);
                if (i.type == ActionEventType.MouseWheel) return input.scrollDelta != 0;
                if (i.type == ActionEventType.Key) return input.isKeyJustPressed(i.code);
                return null;
            })();

            if (eventPressed == null) continue;

            pressed = pressed || (i.inverted ? !eventPressed : eventPressed);
        }
        
        return pressed;
    }

    static fromEventIter(iter: Iterable<ActionEvent>): Action {
        const a: Action = new Action();
        a.events = iter;
        return a;
    }
}