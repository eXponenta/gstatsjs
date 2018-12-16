import BaseHooks from './BaseHooks';
export default class PhaserHooks extends BaseHooks {
    constructor(game) {
        super();
        if (!game) {
            console.error("[Phaser Hooks]Phaser Game can't passed or NULL");
            return;
        }
        var _w = window;
        if (_w.Phaser) {
            var version = _w.Phaser.VERSION;
            if (version.startsWith("3")) {
                if (game.renderer.gl && game.renderer.gl instanceof WebGLRenderingContext) {
                    this.attach(game.renderer.gl);
                }
                else {
                    console.error("[Phaser 3 Hooks]Canvas renderer is not allowed");
                }
            }
            else {
                if (game.renderer instanceof PIXI.WebGLRenderer) {
                    this.attach(game.renderer.gl);
                }
                else {
                    console.error("[Phaser 2 Hooks]Canvas renderer is not allowed");
                }
            }
        }
        else {
            console.error("[Phaser Hooks] THIS HOOK ONLY FOR PHASER 2CE or PHASER 3!!!!");
        }
    }
}
//# sourceMappingURL=PhaserHooks.js.map