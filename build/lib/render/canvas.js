export const canvas = new OffscreenCanvas(1920, 1080);
export const ctx = canvas.getContext("2d");
export const realCanvas = document.createElement("canvas");
export const realCtx = realCanvas.getContext("2d");
realCanvas.style.position = "absolute";
realCanvas.style.left = "50%";
realCanvas.style.top = "50%";
realCanvas.style.transform = "translate(-50%, -50%)";
realCanvas.style.maxWidth = "100%";
realCanvas.style.maxHeight = "100%";
realCanvas.style.width = "auto";
realCanvas.style.height = "auto";
realCanvas.style.objectFit = "contain";
realCanvas.style.backgroundColor = "black";
realCanvas.addEventListener("contextmenu", (e) => e.preventDefault());
export function configureCanvas(config) {
    updateCanvasStyle(config);
}
export function updateCanvasStyle(config) {
    canvas.width = config.size.x;
    canvas.height = config.size.y;
    realCanvas.width = config.size.x;
    realCanvas.height = config.size.y;
    if (config.bg != undefined)
        realCanvas.style.background = config.bg;
    if (config.offscreenBg != undefined)
        document.documentElement.style.background = config.offscreenBg;
}
export function drawToScreen() {
    realCtx.clearRect(0, 0, realCanvas.width, realCanvas.height);
    realCtx.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
