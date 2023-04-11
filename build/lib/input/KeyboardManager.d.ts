export declare class KeyboardManager {
    #private;
    down: Set<string>;
    justPressed: Set<string>;
    constructor();
    isKeyDown(code: string): boolean;
    isKeyJustPressed(code: string): boolean;
    update(): void;
    updateJustPressed(): void;
}
