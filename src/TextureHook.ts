namespace GStats{
	export class TextureHook {
		
		public createdTextures:Array<any> = new Array<any>();
		public deletedTextures:number = 0;

		public isInit:boolean = false;
		private realGLCreateTexture:Function = function(){};
		private realGLDeleteTexture:Function = function(){};

		private gl:any;
		
		constructor(_gl?:any) {	

			if(_gl ){
				
				if(_gl.__proto__.createTexture){
					this.gl = _gl;
					this.realGLCreateTexture = _gl.__proto__.createTexture;
					this.realGLDeleteTexture = _gl.__proto__.deleteTexture;

					//replace to new function
					_gl.__proto__.createTexture = this.fakeGLCreateTexture.bind(this);
					_gl.__proto__.deleteTexture = this.fakeGLDeleteTexture.bind(this);
					
					this.isInit = true;

					console.log("[TextureHook] GL was Hooked!");
				}

			} else {
				console.error("[TextureHook] GL can't be NULL");
			}
		}

		public get currentTextureCount():number{
			return (this.createdTextures.length - this.deletedTextures);
		}

		private fakeGLCreateTexture():any {
			
			var texture = this.realGLCreateTexture.call(this.gl);
			
			this.createdTextures.push(texture);// ++;
			console.log("created:", this.createdTextures.length);
			return texture;
		}

		private fakeGLDeleteTexture(texture:any):void {

			var index:number = this.createdTextures.indexOf(texture);
			if(index > -1)
			{
				this.createdTextures.slice(index, 1);
				this.deletedTextures ++;
				console.log("deleted:", this.deletedTextures);
			}

			this.realGLDeleteTexture.call(this.gl, texture);
		}
		public reset():void{
			this.createdTextures = new Array<any>();
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