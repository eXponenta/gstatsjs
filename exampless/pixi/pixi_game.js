
var app = new PIXI.Application(800, 600, { antialias: true });

document.body.appendChild(app.view);

var pixi_gstats = new GStats.PIXIHooks(app);
var st = new GStats.StatsJSAdapter(pixi_gstats);

document.body.appendChild(st.stats.dom || st.stats.domElement);

app.stage.interactive = true;


var spavn = function(){
   
   console.log("spavn:");
   
   var g = new PIXI.Graphics();

   g.beginFill(0xFF3300 * Math.random());
   g.lineStyle(2, 0xFFFFFF * Math.random(), 1);
   g.drawRect(Math.random() * 500, Math.random() * 700, 100, 100);
   g.cacheAsBitmap = true;
   app.stage.addChild(g);
   
   setTimeout(spavn ,1000);// Math.random()*1000 + 300);

   setTimeout(function() {

   	console.log("destroy:");
   	g.destroy();
   }, 1000);//Math.random()*1000 + 400);
}

setTimeout(spavn , Math.random()*1000 + 300)

// let's create a moving shape
var thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = 800/2;
thing.y = 600/2;

var count = 0;

app.ticker.add(function() {

    count += 0.1;

    thing.clear();
    thing.lineStyle(10, 0xff0000, 1);
    thing.beginFill(0xffFF00, 0.5);

    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);
    thing.lineTo( 120 + Math.cos(count) * 20, -100 + Math.sin(count)* 20);
    thing.lineTo( 120 + Math.sin(count) * 20, 100 + Math.cos(count)* 20);
    thing.lineTo( -120 + Math.cos(count)* 20, 100 + Math.sin(count)* 20);
    thing.lineTo( -120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);

    thing.rotation = count * 0.1;

    st.update();
});
