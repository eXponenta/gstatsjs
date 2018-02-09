namespace GStats{
	export class PhaserHooks extends BaseHooks {
		
		constructor(game:any) {
			super();

			if(!game){
				console.error("[Phaser Hooks]Phaser Game can't passed or NULL");
				return;
			}

			if(game.renderer instanceof PIXI.WebGLRenderer){
				
				this.attach(game.renderer.gl);

			} else {
				console.error("[Phaser Hooks]Canvas renderer is not allowed");
			}
		}
	}
}

