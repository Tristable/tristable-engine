export declare const updateLoopHandlers: Set<(delta: number) => void>;
export declare const drawLoopHandlers: Set<(delta: number) => void>;
export declare function startLoops(): void;
export declare function onUpdate(f: (delta: number) => void): void;
export declare function onDraw(f: (delta: number) => void): void;
export declare function getFPS(): number;
