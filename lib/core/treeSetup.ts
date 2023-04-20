export const treeSetupHandlers: Set<() => void | Promise<void>> = new Set();

export function onTreeSetup(f: () => void | Promise<void>): void {
    treeSetupHandlers.add(f);
}