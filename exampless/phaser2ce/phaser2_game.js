
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example',
 { create: create, update: update });

var count = 0;
var thing = null;
var st = null;

function create(){
  
  var spavn = function(){
     
     var g = game.add.graphics(0,0);

     g.beginFill(0xFF3300 * Math.random());
     g.lineStyle(2, 0xFFFFFF * Math.random(), 1);
     g.drawRect(0,0, 100, 100);

     var s = game.add.sprite(Math.random() * 700, Math.random() * 500, g.generateTexture());

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
  thing = game.add.graphics(400,300);
 
}

function update() {

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

    if(st){
      st.update();
    }
}
