export const treeSetupHandlers = new Set();
export function onTreeSetup(f) {
    treeSetupHandlers.add(f);
}
