export default class StatsJSAdapter {
    constructor(_hook, _stats) {
        this.hook = _hook;
        if (_stats) {
            this.stats = _stats;
        }
        else {
            this.stats = null;
            if (window.Stats) {
                this.stats = new (window.Stats)();
            }
        }
        if (this.stats) {
            this.dcPanel = this.stats.addPanel(new window.Stats.Panel("DC:", "#330570", "#A69700"));
            this.tcPanel = this.stats.addPanel(new window.Stats.Panel("TC:", "#A62500", "#00B454"));
            this.stats.showPanel(0);
        }
        else {
            console.error("Stats can't found in window, pass instance of Stats.js as second param");
        }
    }
    update() {
        if (this.stats) {
            if (this.hook) {
                this.dcPanel.update(this.hook.deltaDrawCalls, Math.max(50, this.hook.maxDeltaDrawCalls));
                this.tcPanel.update(this.hook.texturesCount, Math.max(20, this.hook.maxTextureCount));
            }
            this.stats.update();
        }
    }
    reset() {
        if (this.hook)
            this.hook.reset();
    }
}
//# sourceMappingURL=StatJSAdapter.js.map