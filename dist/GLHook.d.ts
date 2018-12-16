export default class GLHook {
    drawPasses: number;
    isInit: boolean;
    private realGLDrawElements;
    private gl;
    constructor(_gl?: any);
    private fakeGLdrawElements;
    reset(): void;
    release(): void;
}
