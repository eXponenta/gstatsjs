import GLHook from './GLHook';
import TextureHook from './TextureHook';
export default class BaseHooks {
    constructor() {
        this._drawCalls = -1;
        this._maxDeltaDrawCalls = -1;
    }
    attach(gl) {
        this.glhook = new GLHook(gl);
        this.texturehook = new TextureHook(gl);
    }
    get drawCalls() {
        if (this.glhook && this.glhook.isInit) {
            return this.glhook.drawPasses;
        }
        return -1;
    }
    get maxDeltaDrawCalls() {
        return this._maxDeltaDrawCalls;
    }
    get deltaDrawCalls() {
        if (this._drawCalls == -1) {
            this._drawCalls = this.drawCalls;
            return 0;
        }
        var dc = this.drawCalls;
        var delta = dc - this._drawCalls;
        this._drawCalls = dc;
        this._maxDeltaDrawCalls = Math.max(this._maxDeltaDrawCalls, delta);
        return delta;
    }
    get maxTextureCount() {
        if (this.texturehook && this.texturehook.isInit)
            return this.texturehook.maxTexturesCount;
        return 0;
    }
    get texturesCount() {
        if (this.texturehook && this.texturehook.isInit)
            return this.texturehook.currentTextureCount;
        return 0;
    }
    reset() {
        this._maxDeltaDrawCalls = -1;
        this._drawCalls = -1;
        if (this.glhook)
            this.glhook.reset();
        if (this.texturehook)
            this.texturehook.reset();
    }
    release() {
        if (this.glhook)
            this.glhook.release();
        if (this.texturehook)
            this.texturehook.release();
    }
}
//# sourceMappingURL=BaseHooks.js.map