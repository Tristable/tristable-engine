# Usage with [Vite](https://vitejs.dev)

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
    tse.loadTexture("vite", await tse.Texture.loadFromURL("typescript.svg", new tse.Vector2(256, 256)));
});

// runs after preload
tse.onTreeSetup(() => {
    const viteLogo: tse.SpriteObject = new tse.SpriteObject(
        "viteLogo", // game object name
        tse.getTexture("vite")!, // texture
        tse.Rect2.xywh(-128, -128, 256, 256) // texture render rect
    );

    // make the Vite logo rotate
    viteLogo.onUpdate((delta: number) => {
        viteLogo.spriteConfig.rotation += delta;
    });

    // add the Vite logo to the scene
    tse.sceneRoot.addChild(viteLogo);
});

// start the game
await tse.init();
```
5. Serve your code locally
```
npx vite --open
```