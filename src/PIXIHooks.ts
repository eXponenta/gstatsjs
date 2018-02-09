
namespace GStats{
	export class PIXIHooks extends BaseHooks {
		
		constructor(app:any) {
			super();

			if(!app){
				console.error("PIXI Application can't passed or NULL");
				return;
			}

			if(app.renderer instanceof PIXI.WebGLRenderer){
				
				this.glhook = new GLHook(app.renderer.gl);

			} else {
				console.error("[PIXI Hook]Canvas renderer is not allowed");
			}
		}

		public get textureSourcesCount():number{
			var count:number = Object.keys((PIXI as any).BaseTextureCache).length;
			this._maxBTCount = Math.max(this._maxBTCount, count);

			return count;
		}
	}
}

