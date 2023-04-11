export declare class Component {
    executeBeforeObject: boolean;
    onPreload(): void | Promise<void>;
    onReady(): void;
    onUpdate(delta: number): void;
    onDraw(delta: number): void;
}
