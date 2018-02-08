import GLHook from "GLHook"

class BaseHooks {

	protected _maxBTCount:number = 0;
	protected _drawCalls:number = -1;
	protected glhook?:GLHook;

	constructor() {
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

	public get maxTextureSourcesCount():number {
		return this._maxBTCount;
	}

	public get textureSourcesCount():number{
		return 0;
	}

	public release(){
		if(this.glhook)
			this.glhook.release();
	}
}

export default BaseHooks;