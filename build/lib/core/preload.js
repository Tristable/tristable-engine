export const preloadHandlers = new Set();
export function onPreload(f) {
    preloadHandlers.add(f);
}
