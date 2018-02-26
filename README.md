# gstatsjs
Graphics statistics (Texture count, DrawPasses) for WebGL applications. Capability with [stats.js](https://github.com/mrdoob/stats.js)

# Remarks

Due to [bug of cacheAsBitmap on Graphics on PIXIv4](https://github.com/pixijs/pixi.js/issues/4692),  TextureCounter incorrectly gets the number of textures.

# Examples
[PIXI Stats.js example](./exampless/pixi) - show PIXI game Draw Calls and Textures Count statistics by [Stas.js](https://github.com/mrdoob/stats.js/). 

[Phaser 2 CE Stats.js example](./exampless/phaser2ce) - show Phaser 2 CE game Draw Calls and Textures Count statistics by [Stas.js](https://github.com/mrdoob/stats.js/).

Textures amount for Phaser is relative value, and may be negative.

[Phaser 3 Stats.js example](./exampless/phaser3) - show Phaser 3 Textures Count statistics by [Stas.js](https://github.com/mrdoob/stats.js/).

How i can destroy sprite in Phaser 3 with its texture ? 

Currently DC can't work, becouse Phaser 3 use DrawArrays for rendering WebGL. 
Textures amount for Phaser3 is relative value, and may be negative.

# Using
### PIXI & Stats.js

```javascript
var app = new PIXI.Application (options);
var pixiHooks = new GStats.PIXIHooks(app);
var stats = new GStats.StatsJSAdapter(pixiHooks);
document.body.appendChild(stats.stats.dom || stats.stats.domElement);
app.ticker.add(stats.update);
```

### Phaser 2/3 & Stats.js
```javascript
var game = new Phaser.Game(options);
var phaserHooks = new GStats.PhaserHooks(game);
var stats = new GStats.StatsJSAdapter(phaserHooks);
document.body.appendChild(stats.stats.dom || stats.stats.domElement);

//or other update function
function update() {
    stats.update();
}
```

### PIXI/Phaser & Show stats in app context
coming soon...
### Raw WebGL & Stats.js 
```javascript
var gl = // WebGL2RenderingContext;
var baseHooks = new GStats.BaseHooks();
    baseHooks.attach(gl);
var stats = new GStats.StatsJSAdapter(baseHooks);

document.body.appendChild(stats.stats.dom || stats.stats.domElement);

//or other update function
function update() {
    stats.update();
}
```

### TypeScript

Go to  [gstats.d.ts](https://github.com/eXponenta/gstatsjs/blob/master/dist/gstats.d.ts)