<h1 align="center">
  Tristable Engine
  <br>
  <a href="https://www.npmjs.com/package/tristable-engine">
    <img src="https://img.shields.io/bundlephobia/min/tristable-engine?label=minified%20size&logo=npm&style=for-the-badge">
  </a>
  <br>
  <a href="https://www.npmjs.com/package/tristable-engine">
    <img src="https://img.shields.io/npm/dt/tristable-engine?style=for-the-badge&logo=npm">
  </a>
  <br>
  <a href="https://www.npmjs.com/package/tristable-engine">
    <img src="https://img.shields.io/npm/v/tristable-engine?label=version&logo=npm&style=for-the-badge">
  </a>
  <br>
  <a href="https://tristable.github.io/tristable-engine">
    <img src="https://img.shields.io/badge/📖-Documentation-orange?style=for-the-badge">
  </a>
</h1>
<p align="center">
  A JavaScript/TypeScript game engine for making simple games.
</p>

# Usage

1. Create a TypeScript Vite project in the current directory
```cmd
npm init vite ./ -- --template vanilla-ts
```
2. Install `tristable-engine`
```cmd
npm i tristable-engine
```
3. Remove `src/counter.ts`, `src/style.css`, and `src/typescript.svg`

4. Write your game's code in `src/main.ts`
```ts
import * as tse from "tristable-engine";

// configures the game canvas
tse.configureCanvas({
    size: new tse.Vector2(1920, 1080),
    bg: "black"
});

// runs before the game starts
tse.onPreload(async () => {
    // load public/vite.svg as a 256x256 bitmap
    tse.loadTexture("vite", await tse.Texture.loadFromURL("vite.svg", new tse.Vector2(256, 256)));
});

// runs after preload
tse.onTreeSetup(() => {
    const viteLogo: tse.SpriteObject = new tse.SpriteObject(
        "viteLogo", // game object name
        tse.getTexture("vite")!, // texture
        tse.Rect2.xywh(-128, -128, 256, 256) // texture render rect
    );

    // add the vite logo to the scene
    tse.sceneRoot.addChild(viteLogo);
});

// start the game
await tse.init();
```
5. Serve your code locally
```
npx vite --open
```
