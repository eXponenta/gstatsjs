namespace GStats{
	export class PIXIHooks extends BaseHooks {
		
		constructor(app:any) {
			super();

			if(!app){
				console.error("PIXI Application can't passed or NULL");
				return;
			}

			if(app.renderer instanceof PIXI.WebGLRenderer){
				
				this.attach(app.renderer.gl);

			} else {
				console.error("[PIXI Hook]Canvas renderer is not allowed");
			}
		}

	}
}

