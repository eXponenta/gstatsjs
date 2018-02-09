namespace GStats{
	export class StatJSAdapter {
		public stats:any;
		public dcPanel?:any;
		public tcPanel?:any;
		public hook:BaseHooks;

		constructor(_hook:BaseHooks, _stats?:any) {
			
			this.hook = _hook;

			if(_stats){
			
				this.stats = _stats;
			
			}else {
				
				if((window as any).Stats){
					this.stats = new ((window as any).Stats)();
				}

				this.stats = null;
			}

			if(this.stats){
				this.dcPanel =  this.stats.addPanel(new (window as any).Stats.Panel("DC:", "#330570","#A69700"));
				this.tcPanel =  this.stats.addPanel(new (window as any).Stats.Panel("TC:", "#A62500","#00B454"));
			}
		}


		update():void{
			if(this.stats){
				this.stats.update();

				if(this.hook){

					this.dcPanel.update(this.hook.deltaDrawCalls, this.hook.maxDeltaDrawCalls);
					this.tcPanel.update(this.hook.texturesCount, this.hook.maxTextureCount);

				}
			}
		}

		reset():void{
			if(this.hook)
				this.hook.reset();
		}
	}
}