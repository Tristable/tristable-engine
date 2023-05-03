import { sceneRoot } from "../game/scene.js";
import { getFPS, lastDelta, lastDeltas } from "./loop.js";

export interface DebugOptions {
    visibleColliders: boolean,
    alertErrors: boolean,
    alertWarnings: boolean,
    alertLogs: boolean
}

export const debug: DebugOptions = {
    visibleColliders: false,
    alertErrors: false,
    alertWarnings: false,
    alertLogs: false
};

addEventListener("error", (e: ErrorEvent) => {
    if (debug.alertErrors) alert(`at ${e.filename.match(/[^/]+$/g)?.[0]}:${e.lineno}:${e.colno}\n\n${e.message}`);
});

const consoleLog: typeof console.log = console.log;
const consoleWarn: typeof console.warn = console.warn;
const consoleError: typeof console.error = console.error;

console.log = (...m: any[]): void => {
    if (debug.alertLogs) alert(m.join(" "));
    else consoleLog(...m);
};

console.warn = (...m: any[]): void => {
    if (debug.alertWarnings) alert("Warning: " + m.join(" "));
    else consoleWarn(...m);
};

console.error = (...m: any[]): void => {
    if (debug.alertErrors) alert("Error: " + m.join(" "));
    else consoleError(...m);
};

export function launchDebugger(): Window | null {
    const win: Window | null = window.open("about:blank", "_blank", "popup, width=400, height=400");
    if (win == null) return alert("Failed to launch debugger. Maybe the popup was blocked?"), null;

    const b: HTMLElement = win.document.body;
    b.style.fontFamily = "monospace";

    const interval: number = setInterval(() => {
        b.innerHTML = "";
        b.innerHTML += document.hasFocus() ? "Window is focused<br>" : "Window is not focused<br>";
        b.innerHTML += `FPS (20 frame avg/max/min): ${getFPS().toFixed(3)}/${(1 / Math.min(...lastDeltas)).toFixed(3)}/${(1 / Math.max(...lastDeltas)).toFixed(3)}<br>`;
        b.innerHTML += `FPS (now): ${(1 / lastDelta).toFixed(3)}<br>`;
        b.innerHTML += `Game Objects: ${sceneRoot.allNodes.length}<br>`;
    }, 50 / 3);

    addEventListener("beforeunload", () => {
        clearInterval(interval);
        win.close();
    });

    return win;
}