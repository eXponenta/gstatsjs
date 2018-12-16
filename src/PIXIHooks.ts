import BaseHooks from './BaseHooks';

export default class PIXIHooks extends BaseHooks {

	constructor(app:any) {
		super();

		if(!app){
			console.error("PIXI Application can't passed or NULL");
			return;
		}

		if(app.renderer instanceof PIXI.WebGLRenderer){

			this.attach(app.renderer.gl);

			var start_textures = app.renderer.textureManager._managedTextures;

			if(start_textures && this.texturehook){
				console.log("[PIXI Hooks] Collect used textures:", start_textures.length);
				for (var i = 0; i < start_textures.length; ++i) {
					var txr = start_textures[i];
					var gltextures = txr._glTextures;

					for (var j = 0; j < gltextures.length; ++j) {
						if(gltextures[j].gl === app.renderer.gl){

							this.texturehook.registerTexture(gltextures[j].texture);
						}
					}
				}
			}

		} else {
			console.error("[PIXI Hook]Canvas renderer is not allowed");
		}
	}

}
