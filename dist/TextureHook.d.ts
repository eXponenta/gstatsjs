export default class TextureHook {
    createdTextures: Array<any>;
    maxTexturesCount: number;
    isInit: boolean;
    private realGLCreateTexture;
    private realGLDeleteTexture;
    private gl;
    constructor(_gl?: any);
    readonly currentTextureCount: number;
    registerTexture(texture: any): void;
    private fakeGLCreateTexture;
    private fakeGLDeleteTexture;
    reset(): void;
    release(): void;
}
