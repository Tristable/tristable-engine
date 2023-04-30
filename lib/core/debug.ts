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