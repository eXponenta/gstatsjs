
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scene: {
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var count = 0;
var thing = null;
var st = null;

var GLOBALTHIS = null;
var gindex = 0;

function create(){
  
  GLOBALTHIS = this;

  var _this = this;
  var spavn = function(){
     

     var rect = new Phaser.Geom.Rectangle(0, 0, 100, 100);

     var g = _this.add.graphics(
     {
        fillStyle : {color: 0xFF3300 * Math.random()},
        lineStyle: {
          width: 2,
          color: 0xFFFFFF * Math.random()}
     });

     g.fillRectShape(rect);
     g.generateTexture("TEX_" + gindex, 100, 100);
     
     var s = _this.add.sprite(Math.random() * 700, Math.random() * 500, "TEX_" + gindex);

     gindex ++;
     
     g.destroy();

     setTimeout(spavn , Math.random()*1000);
     
     setTimeout(function() {
      
      s.destroy(true,true);

     }, 3000);
  }
  setTimeout(spavn , Math.random()*1000)

  setTimeout(function(){
    var pixi_gstats = new GStats.PhaserHooks(game);
    st = new GStats.StatsJSAdapter(pixi_gstats);

    document.body.appendChild(st.stats.dom || st.stats.domElement);
  }, 1000);

  // let's create a moving shape
  thing = this.add.graphics(400,300);

}

function update() {

    count += 0.1;

/*
    thing.clear();
    thing.lineStyle(10, 0xff0000, 1);
    thing.beginFill(0xffFF00, 0.5);

    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);
    thing.lineTo( 120 + Math.cos(count) * 20, -100 + Math.sin(count)* 20);
    thing.lineTo( 120 + Math.sin(count) * 20, 100 + Math.cos(count)* 20);
    thing.lineTo( -120 + Math.cos(count)* 20, 100 + Math.sin(count)* 20);
    thing.lineTo( -120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);

    thing.rotation = count * 0.1;
*/
    if(st){
      st.update();
    }
}
