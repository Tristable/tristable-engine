export class Component {
    executeBeforeObject = true;

    onPreload(): void | Promise<void> {}
    onReady(): void {}
    onUpdate(delta: number): void {}
    onDraw(delta: number): void {}
}