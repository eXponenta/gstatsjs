# gstatsjs
Graphics statistics (Texture count, DrawPasses) for WebGL applications. Capability with [stats.js](https://github.com/mrdoob/stats.js)

# Examples
[### PIXI ###](./exampless/pixi)

# Using
### PIXI & Stats.js

```javascript
var app = new PIXI.Application (options);
var pixiHooks = new GStats.PIXIHooks(app);
var stats = new GStats.StatsJSAdapter(pixiHooks);
document.body.appendChild(stats.stats.dom || stats.stats.domElement);
app.ticker.add(stats.update);
```

### Phaser & Stats.js
```javascript
var game = new Phaser.Game(options);
var phaserHooks = new GStats.PhaserHooks(game);
var stats = new GStats.StatsJSAdapter(pixiHooks);
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