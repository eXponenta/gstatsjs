export default class TextureHook {
    constructor(_gl) {
        this.createdTextures = new Array();
        this.maxTexturesCount = 0;
        this.isInit = false;
        this.realGLCreateTexture = function () { };
        this.realGLDeleteTexture = function () { };
        if (_gl) {
            if (_gl.__proto__.createTexture) {
                this.gl = _gl;
                this.realGLCreateTexture = _gl.__proto__.createTexture;
                this.realGLDeleteTexture = _gl.__proto__.deleteTexture;
                //replace to new function
                _gl.__proto__.createTexture = this.fakeGLCreateTexture.bind(this);
                _gl.__proto__.deleteTexture = this.fakeGLDeleteTexture.bind(this);
                this.isInit = true;
                console.log("[TextureHook] GL was Hooked!");
            }
        }
        else {
            console.error("[TextureHook] GL can't be NULL");
        }
    }
    get currentTextureCount() {
        return this.createdTextures.length;
    }
    registerTexture(texture) {
        this.createdTextures.push(texture); // ++;
        this.maxTexturesCount = Math.max(this.createdTextures.length, this.maxTexturesCount);
    }
    fakeGLCreateTexture() {
        var texture = this.realGLCreateTexture.call(this.gl);
        this.registerTexture(texture);
        return texture;
    }
    fakeGLDeleteTexture(texture) {
        var index = this.createdTextures.indexOf(texture);
        if (index > -1) {
            this.createdTextures.splice(index, 1);
        }
        this.realGLDeleteTexture.call(this.gl, texture);
    }
    reset() {
        this.createdTextures = new Array();
        this.maxTexturesCount = 0;
    }
    release() {
        if (this.isInit) {
            this.gl.__proto__.createTexture = this.realGLCreateTexture;
            this.gl.__proto__.deleteTexture = this.realGLDeleteTexture;
            console.log("[TextureHook] Hook was removed!");
        }
        this.isInit = false;
    }
}
//# sourceMappingURL=TextureHook.js.map