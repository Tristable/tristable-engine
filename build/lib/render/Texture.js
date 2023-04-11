export class Texture {
    src;
    partition;
    constructor(src, partition) {
        this.src = src;
        this.partition = partition;
    }
    static loadFromURL(url, partition) {
        return new Promise((r, rj) => {
            const src = new Image();
            src.src = url;
            src.addEventListener("load", () => r(new Texture(src, partition)));
            src.addEventListener("error", (e) => {
                console.warn(`Failed to load image from ${url}`);
                rj(e);
            });
        });
    }
}
