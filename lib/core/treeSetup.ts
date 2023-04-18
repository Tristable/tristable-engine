export const treeSetupHandlers: Set<() => void> = new Set();

export function onTreeSetup(f: () => void): void {
    treeSetupHandlers.add(f);
}