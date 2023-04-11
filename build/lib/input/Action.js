export var ActionEventType;
(function (ActionEventType) {
    ActionEventType[ActionEventType["MouseButton"] = 0] = "MouseButton";
    ActionEventType[ActionEventType["MouseMovement"] = 1] = "MouseMovement";
    ActionEventType[ActionEventType["MouseWheel"] = 2] = "MouseWheel";
    ActionEventType[ActionEventType["Key"] = 3] = "Key";
})(ActionEventType || (ActionEventType = {}));
export var WheelDirection;
(function (WheelDirection) {
    WheelDirection[WheelDirection["Up"] = 0] = "Up";
    WheelDirection[WheelDirection["Down"] = 1] = "Down";
})(WheelDirection || (WheelDirection = {}));
export class Action {
    #events = new Set();
    addEvent(e) {
        this.#events.add(e);
        return this;
    }
    set events(iter) {
        this.#events = new Set(iter);
    }
    pressed(input) {
        let pressed = false;
        for (const i of this.#events) {
            const eventPressed = (() => {
                if (i.type == ActionEventType.MouseMovement)
                    return input.mouseDelta.distSquared != 0;
                if (i.type == ActionEventType.MouseButton)
                    return input.isMouseDown(i.button);
                if (i.type == ActionEventType.MouseWheel)
                    return i.direction == WheelDirection.Down ? input.scrollDelta > 0 : input.scrollDelta < 0;
                if (i.type == ActionEventType.Key)
                    return input.isKeyDown(i.code);
                return null;
            })();
            if (eventPressed == null)
                continue;
            pressed = pressed || (i.inverted ? !eventPressed : eventPressed);
        }
        return pressed;
    }
    justPressed(input) {
        let pressed = true;
        for (const i of this.events) {
            const eventPressed = (() => {
                if (i.type == ActionEventType.MouseMovement)
                    return input.mouseDelta.distSquared != 0;
                if (i.type == ActionEventType.MouseButton)
                    return input.isMouseJustPressed(i.button);
                if (i.type == ActionEventType.MouseWheel)
                    return input.scrollDelta != 0;
                if (i.type == ActionEventType.Key)
                    return input.isKeyJustPressed(i.code);
                return null;
            })();
            if (eventPressed == null)
                continue;
            pressed = pressed && (i.inverted ? !eventPressed : eventPressed);
        }
        return pressed;
    }
    static fromEventIter(iter) {
        const a = new Action();
        a.events = iter;
        return a;
    }
}
