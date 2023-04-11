export const preloadHandlers: Set<() => void | Promise<void>> = new Set();

export function onPreload(f: () => void | Promise<void>): void {
    preloadHandlers.add(f);
}