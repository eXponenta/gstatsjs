import BaseHooks from './BaseHooks';
export default class StatsJSAdapter {
    stats: any;
    dcPanel?: any;
    tcPanel?: any;
    hook: BaseHooks;
    constructor(_hook: BaseHooks, _stats?: any);
    update(): void;
    reset(): void;
}
