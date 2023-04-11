import * as tse from "./lib/tristable.js";
tse.configureCanvas({
    size: new tse.Vector2(1920, 1080)
});
tse.input.addAction("lmb", tse.Action.fromEventIter([
    {
        type: tse.ActionEventType.MouseButton,
        button: 0
    }
]));
tse.input.addAction("down", tse.Action.fromEventIter([
    {
        type: tse.ActionEventType.Key,
        code: "KeyS"
    }
]));
tse.input.addAction("up", tse.Action.fromEventIter([
    {
        type: tse.ActionEventType.Key,
        code: "KeyW"
    }
]));
tse.input.addAction("left", tse.Action.fromEventIter([
    {
        type: tse.ActionEventType.Key,
        code: "KeyA"
    }
]));
tse.input.addAction("right", tse.Action.fromEventIter([
    {
        type: tse.ActionEventType.Key,
        code: "KeyD"
    }
]));
tse.input.addAction("wheelup", tse.Action.fromEventIter([
    {
        type: tse.ActionEventType.MouseWheel,
        direction: tse.WheelDirection.Up
    }
]));
tse.input.addAction("wheeldown", tse.Action.fromEventIter([
    {
        type: tse.ActionEventType.MouseWheel,
        direction: tse.WheelDirection.Down
    }
]));
const camera = tse.Camera.default;
camera.current = true;
tse.onUpdate((delta) => {
    if (tse.input.isActionPressed("wheelup"))
        camera.zoom *= 1.15;
    if (tse.input.isActionPressed("wheeldown"))
        camera.zoom /= 1.15;
    const vel = tse.input.getVector("left", "right", "up", "down", 500 * delta);
});
tse.onDraw((delta) => {
});
tse.init();
