import { Texture } from "../render/Texture.js";

const textures: Map<string, Texture> = new Map();

export function loadTexture(name: string, texture: Texture): void {
    textures.set(name, texture);
}

export function getTexture(name: string): Texture | null {
    return textures.get(name) ?? null;
}