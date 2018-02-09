namespace GStats{
	export class TextureHook {
		
		public createdTextures:number = 0;
		public deletedTextures:number = 0;

		public isInit:boolean = false;
		private realGLCreateTexture:Function = function(){};
		private realGLDeleteTexture:Function = function(){};

		private gl:any;
		
		constructor(_gl?:any) {	

			if(_gl){
				
				if(_gl.__proto__.createTexture){
					this.gl = _gl;
					this.realGLCreateTexture = _gl.__proto__.createTexture;
					this.realGLDeleteTexture = _gl.__proto__.deleteTexture;

					//replace to new function
					_gl.__proto__.createTexture = this.fakeGLCreateTexture;
					_gl.__proto__.deleteTexture = this.fakeGLDeleteTexture;
					
					this.isInit = true;

					console.log("[TextureHook] GL was Hooked!");
				}

			} else {
				console.error("[TextureHook] GL can't be NULL");
			}
		}

		public get currentTextureCount():number{
			return (this.createdTextures - this.deletedTextures);
		}

		private fakeGLCreateTexture():void {
			this.createdTextures ++;
			return this.realGLCreateTexture.call(this.gl);
		}

		private fakeGLDeleteTexture(texture:any):void {
			this.deletedTextures ++;
			this.realGLDeleteTexture.call(this.gl, texture);
		}
		public reset():void{
			this.createdTextures = 0;
			this.deletedTextures = 0;
		}
		public release():void{

			if(this.isInit){
				
				this.gl.__proto__.createTexture = this.realGLCreateTexture;
				this.gl.__proto__.deleteTexture = this.realGLDeleteTexture;
				
				console.log("[TextureHook] Hook was removed!");
			}

			this.isInit = false;
		}
	}
}