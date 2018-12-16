import BaseHooks from './BaseHooks';

export default class StatsJSAdapter {
	public stats:any;
	public dcPanel?:any;
	public tcPanel?:any;
	public hook:BaseHooks;

	constructor(_hook:BaseHooks, _stats?:any) {

		this.hook = _hook;

		if(_stats){

			this.stats = _stats;

		}else {

			this.stats = null;
			if((window as any).Stats){
				this.stats = new ((window as any).Stats)();
			}

		}

		if(this.stats){
			this.dcPanel =  this.stats.addPanel(new (window as any).Stats.Panel("DC:", "#330570","#A69700"));
			this.tcPanel =  this.stats.addPanel(new (window as any).Stats.Panel("TC:", "#A62500","#00B454"));
			this.stats.showPanel(0);
		} else {
			console.error("Stats can't found in window, pass instance of Stats.js as second param");
		}
	}


	update():void{
		if(this.stats){

			if(this.hook){

				this.dcPanel.update(this.hook.deltaDrawCalls, Math.max(50, this.hook.maxDeltaDrawCalls) );
				this.tcPanel.update(this.hook.texturesCount, Math.max(20, this.hook.maxTextureCount) );

			}

			this.stats.update();
		}
	}

	reset():void{
		if(this.hook)
			this.hook.reset();
	}
}
