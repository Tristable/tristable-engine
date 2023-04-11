const textures = new Map();
export function loadTexture(name, texture) {
    textures.set(name, texture);
}
export function getTexture(name) {
    return textures.get(name) ?? null;
}
