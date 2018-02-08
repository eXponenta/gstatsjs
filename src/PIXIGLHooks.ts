class PIXIHooks {
	
	private _maxBTCount:number = 0;
	private _drawCalls:number = -1;
	private glhook?:GLHook;

	constructor(app?:any) {

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

	public get drawCalls(): number {
		
		if(this.glhook){
			return this.glhook.drawPasses;
		}
		return -1;
	}

	public get deltaDrawCalls():number{
		if(this._drawCalls == -1){
			this._drawCalls == this.drawCalls;
			return 0;
		}

		var dc:number = this.drawCalls;
		var delta:number = dc - this._drawCalls;
		this._drawCalls = dc;

		return delta;
	}

	public get maxBaseTextureCount():number {
		return this._maxBTCount;
	}

	public get baseTextureCount():number{

		var count:number = Object.keys(PIXI.BaseTextureCache).length;
		this._maxBTCount = Math.max(this._maxBTCount, count);

		return count;
	}

	public release(){
		if(this.glhook)
			this.glhook.release();
	}
}