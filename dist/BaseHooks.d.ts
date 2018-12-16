import GLHook from './GLHook';
import TextureHook from './TextureHook';
export default class BaseHooks {
    protected _drawCalls: number;
    protected _maxDeltaDrawCalls: number;
    protected glhook?: GLHook;
    protected texturehook?: TextureHook;
    constructor();
    attach(gl: any): void;
    readonly drawCalls: number;
    readonly maxDeltaDrawCalls: number;
    readonly deltaDrawCalls: number;
    readonly maxTextureCount: number;
    readonly texturesCount: number;
    reset(): void;
    release(): void;
}
