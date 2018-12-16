export default class GLHook {
    constructor(_gl) {
        this.drawPasses = 0;
        this.isInit = false;
        this.realGLDrawElements = function () { };
        if (_gl) {
            if (_gl.__proto__.drawElements) {
                this.gl = _gl;
                this.realGLDrawElements = _gl.__proto__.drawElements;
                //replace to new function
                _gl.__proto__.drawElements = this.fakeGLdrawElements.bind(this);
                this.isInit = true;
                console.log("[GLHook] GL was Hooked!");
            }
        }
        else {
            console.error("[GLHook] GL can't be NULL");
        }
    }
    fakeGLdrawElements(mode, count, type, offset) {
        this.drawPasses++;
        this.realGLDrawElements.call(this.gl, mode, count, type, offset);
    }
    reset() {
        this.drawPasses = 0;
    }
    release() {
        if (this.isInit) {
            this.gl.__proto__.drawElements = this.realGLDrawElements;
            console.log("[GLHook] Hook was removed!");
        }
        this.isInit = false;
    }
}
//# sourceMappingURL=GLHook.js.map