declare namespace GStats {
    class BaseHooks {
        protected _maxBTCount: number;
        protected _drawCalls: number;
        protected glhook?: GStats.GLHook;
        constructor();
        readonly drawCalls: number;
        readonly deltaDrawCalls: number;
        readonly maxTextureSourcesCount: number;
        readonly textureSourcesCount: number;
        release(): void;
    }
}
declare namespace GStats {
    class GLHook {
        drawPasses: number;
        isInit: boolean;
        private realGLDrawElements;
        private gl;
        constructor(_gl?: any);
        private fakeGLdrawElements(mode, count, type, offset);
        release(): void;
    }
}
declare namespace GStats {
    class PIXIHooks extends BaseHooks {
        constructor(app: any);
        readonly textureSourcesCount: number;
    }
}
