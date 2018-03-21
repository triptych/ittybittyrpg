/* Itty Bitty RPG (engine) v 0.01 March 3, 2018 */
const Constants = {
    DELAY: 10,
    WIDTH: 12,
    HEIGHT: 12,
    SPHEIGHT: 32,
    SPWIDTH: 32,
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
    RANDOM: 'random'
    
}
var ibrpg = {
    init: function(){
        // console.log("hello world");
        // console.log("this", this);
        
        this.initCanvas();
        this.xx_renderOneTile();
    },
    state: {
        version: "0.01",
        title: "Itty Bitty RPG",
        delay: Constants.DELAY
    },
    datastore: {
        cv: null,
        ctx: null,
        img: null,
        delay: 0
    },
    world: {
      title: "testlevel",
    //   width: Constants.WIDTH,
    //   height: Constants.HEIGHT,
    //   spriteHeight: Constants.SPHEIGHT,
    //   spriteWidth: Constants.SPWIDTH,
      tileDef: {
          "w" : {
              type: "dungeoncrawl",
              name: "wall",
              xOffset: 0,
              yOffset: 14,
              collision: true
          },
          "f" : {
              type: "dungeoncrawl",
              name: "floor",
              xOffset: 0,
              yOffset: 15,
              collision: false
          }
      },
      monsters: {
        "monster_1" : {
            type: "dungeoncrawl",
            name: "monster",
            xOffset: 0,
            yOffset: 5,
            hp: 10,
            pos: {
                x: 5,
                y: 5
            }
        }  
      },
      events: {
          "popupText": {
              name: "event",
              pos: {
                  x: 10,
                  y: 8
              },
              action: {
                  call: "dialog",
                  param: "Welcome to Itty Bitty RPG!"
              }
          },
          'loadNewLevel': {
              name: 'event',
              pos: {
                  x:10,
                  y:10
              },
              action: {
                  call: "loadLevel",
                  param: ''
              }
          }
      },
      character: {
        xOffset: 1,
        yOffset: 2,
        type: "dungeoncrawl",
        name: "character",
        pos: {
            x: 2,
            y: 2
        }
      },
      map:`w,w,w,w,w,w,w,w,w,w,w,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,w,f,w,
           w,f,f,f,f,f,f,f,f,w,w,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,w,w,w,w,w,w,w,w,w,w,w`
    },
    initCanvas: function(){
        var ds = this.datastore;
        var ctx;
        //.log("ds:", ds);
        ds.cv = document.getElementById("ittybittyrpg");
        ds.cv.setAttribute("width", Constants.WIDTH * Constants.SPWIDTH + "px");
        ds.cv.setAttribute("height", Constants.HEIGHT * Constants.SPHEIGHT + "px");
        //console.log("dom canvas",ds.cv)
        ctx = ds.ctx = ds.cv.getContext("2d");
        //console.log(ds.ctx);
        /**
        ctx.beginPath();
        ctx.rect(20, 20, 150, 100);
        ctx.fillStyle = "red";
        ctx.fill();
        
        ctx.beginPath();
        ctx.rect(40, 40, 150, 100);
        ctx.fillStyle = "blue";
        ctx.fill();
        **/
        /** initially fill with black **/
        // ctx.beginPath();
        // ctx.rect(0,0,12*32,12*32);
        // ctx.fillStyle = "black";
        // ctx.fill();
        this.clearCanvas();
    },
    clearCanvas: function(){
        var ctx = this.datastore.ctx;
        ctx.beginPath();
        ctx.rect(0,0,Constants.WIDTH * Constants.SPWIDTH, Constants.HEIGHT * Constants.SPHEIGHT);
        ctx.fillStyle = "black";
        ctx.fill();
        
    },
    xx_renderOneTile: function(){
        //console.log("in xx_renderOneTile");
        var tileset = document.getElementById("dungeon");
        //console.log("tileset:", tileset);
        var ds = this.datastore;
        ds.ctx.drawImage(tileset, 0, 0, Constants.SPHEIGHT, Constants.SPWIDTH);
    },
    xx_renderLayer: function(){
        var tileset = document.getElementById("dungeoncrawl");
        //console.log("tileset", tileset)
        var ds = this.datastore;
        var dgcHeightInTiles = 64;
        var dgcWidthInTiles = 48;
        var randomX = Math.floor(Math.random() * dgcWidthInTiles) * Constants.SPWIDTH;
        var randomY = Math.floor(Math.random() * dgcHeightInTiles) * Constants.SPHEIGHT;
        //console.log("randomx", randomX)
        //console.log("randomY", randomY)
        this.initCanvas();
        for(var i=0; i<12; i++){
            for(var j=0; j<12; j++){
                ds.ctx.drawImage(tileset, Math.floor(Math.random() * dgcWidthInTiles) * Constants.SPWIDTH ,Math.floor(Math.random() * dgcHeightInTiles) * Constants.SPHEIGHT, 32,32, i*32, j*32, 32,32);
                //console.log()
            }
        }
        
    },
    xx_checkCollision: function(oldXoffset,oldYoffset,newXoffset,newYoffset){
        var isCollision = false;
        var mapArr = this.world.map.split(",");
        const tileDef = ibrpg.world.tileDef[mapArr[(newYoffset*Constants.WIDTH) + newXoffset].trim()];
        
        
        console.log("tileDef tile:", tileDef);
        isCollision = tileDef.collision;
        
        return isCollision;
    },
    xx_timedUpdate: function(){
        //console.log("timedUpdate")
        ibrpg.datastore.interval = window.setInterval(function(){
            ibrpg.xx_renderLayer();
            ibrpg.datastore.delay = ibrpg.datastore.delay + 1;
            if(ibrpg.datastore.delay >= ibrpg.state.delay){
                window.clearInterval(ibrpg.datastore.interval);
                ibrpg.renderWorld();
            }
            
        }, 200);
        // ibrpg.xx_renderLayer();
        // window.requestAnimationFrame(ibrpg.xx_timedUpdate)
    },
    xx_renderMons: function(){
        var ds = this.datastore;
        var ctx = ds.ctx;
        var monsters = this.world.monsters;
        
        for (const monster in monsters) {
            if(monsters.hasOwnProperty(monster)){
                console.log(monster);
                console.log(monsters[monster]);
                this.moveActor(monsters[monster], Constants.RANDOM);
                this.renderActor(monsters[monster]);
            }
        }
    },
    renderWorld: function(){
        ibrpg.xx_renderLevel();
        ibrpg.xx_renderMons();
        ibrpg.xx_renderChar();
        ibrpg.xx_checkEvent();
        
    },
    xx_checkEvent: function(){
        console.log("In xx_checkEvent");
        var charPos = this.world.character.pos;
        var events = this.world.events;
        for(var evt in events){
            console.log("--- event check ",events[evt].pos);
            console.log("--- event check ", charPos);
            if(events[evt].pos.x == charPos.x && events[evt].pos.y == charPos.y){
                console.log(events[evt].name);
                switch(events[evt].action.call){
                    case 'dialog': 
                        this.xx_renderText(events[evt].action.param);
                        break;
                    case 'loadLevel': 
                        this.xx_loadLevel();
                        break;
                }
            }
        }
    },
    renderActor: function(actorObj){
        console.log("renderActor, actorObj:", actorObj);
        var ds = this.datastore;
        var ctx = ds.ctx;
        var tileset = document.getElementById(actorObj.type);
        ctx.drawImage(tileset, 
            actorObj.xOffset * Constants.SPWIDTH,
            actorObj.yOffset * Constants.SPHEIGHT,
            Constants.SPWIDTH,
            Constants.SPHEIGHT,
            actorObj.pos.x * Constants.SPWIDTH,
            actorObj.pos.y * Constants.SPWIDTH,
            Constants.SPWIDTH,
            Constants.SPHEIGHT);
        
    },
    moveActor: function(actorObj, dir){
        console.log("moveActor, actorObj:", actorObj);
        console.log("moveActor, dir:", dir);
        
        var dirArr = [Constants.RIGHT, Constants.LEFT, Constants.UP, Constants.DOWN]; 
        if(dir == Constants.RANDOM){
          dir = dirArr[Math.floor(Math.random()*dirArr.length)];  
        }
        
        
        var actorPos = actorObj.pos;
        switch(dir){
            case Constants.RIGHT:
                // code
                if(!ibrpg.xx_checkCollision(actorPos.x,
                    actorPos.y, actorPos.x+1, actorPos.y)){
                    actorPos.x+=1;
                }
                break;
           case Constants.LEFT:
               if(!ibrpg.xx_checkCollision(actorPos.x,
                    actorPos.y, actorPos.x-1, actorPos.y)){
                    actorPos.x-=1;
                }
                break;
            case Constants.UP:
               if(!ibrpg.xx_checkCollision(actorPos.x,
                    actorPos.y, actorPos.x, actorPos.y-1)){
                    actorPos.y-=1;
                }
                break;
            case Constants.DOWN:
               if(!ibrpg.xx_checkCollision(actorPos.x,
                    actorPos.y, actorPos.x, actorPos.y+1)){
                    actorPos.y+=1;
                }
                break;    
        }
        

    },
    xx_renderChar: function(){
        var ds = this.datastore;
        var ctx = ds.ctx;
        var char = this.world.character;
        
        var tileset = document.getElementById(char.type); 
        ctx.drawImage(tileset, 
            char.xOffset * Constants.SPWIDTH,
            char.yOffset * Constants.SPHEIGHT,
            Constants.SPWIDTH,
            Constants.SPHEIGHT,
            char.pos.x * Constants.SPWIDTH,
            char.pos.y * Constants.SPWIDTH,
            Constants.SPWIDTH,
            Constants.SPHEIGHT);
        
    },
    xx_renderText: function(txt){
        console.log("renderText:", txt);
        var ds = this.datastore;
        var ctx = ds.ctx;
        
        ctx.fillStyle = "#292929";
        // ctx.font = "2em 'Open Sans' sans-serif"
        ctx.font = '1em sans-serif';
        ctx.fillRect(0,6 * Constants.SPHEIGHT,Constants.WIDTH * Constants.SPWIDTH, Constants.HEIGHT * Constants.SPHEIGHT);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(txt, 1 * Constants.SPWIDTH, 7 * Constants.SPHEIGHT)
        
    },
    xx_loadLevel: function(){
      var script = document.createElement("script");
      script.onload = function(){
          console.log("--- Level Loaded ---");
          ibrpg.world = levels[levels.length-1];
          ibrpg.renderWorld();
      }
      script.src='scripts/level.js';
      document.getElementsByTagName('head')[0].appendChild(script);
      
    },
    xx_renderLevel: function(){
        // assuming level is loaded
        var ds = this.datastore;
        var ctx = ds.ctx;
        var tileset = document.getElementById("dungeoncrawl");
        var mapArr = this.world.map.split(",");
        var tileDef = this.world.tileDef;
        console.log("mapArr:", mapArr);
        
        for(var i = 0; i < Constants.WIDTH; i++){
            for(var j = 0; j < Constants.HEIGHT; j++){
              ctx.drawImage(tileset, 
                tileDef[mapArr[(i*Constants.WIDTH) + j].trim()].xOffset * Constants.SPWIDTH, 
                tileDef[mapArr[(i*Constants.HEIGHT) + j].trim()].yOffset * Constants.SPHEIGHT,
                Constants.SPWIDTH,
                Constants.SPHEIGHT,
                j * Constants.SPWIDTH,
                i * Constants.SPHEIGHT,
                Constants.SPWIDTH,
                Constants.SPHEIGHT)
               
            }
        }
        
    }
}


window.addEventListener("DOMContentLoaded", function(e){
    console.log("addEventListener:", e);
    ibrpg.init();
    document.getElementById("dungeoncrawl").addEventListener("load", function(){
        console.log("crawl loaded")
        ibrpg.xx_timedUpdate();
    });
});

// window.addEventListener("click", function(e){
//     console.log("addEventListener", e);
//     //ibrpg.xx_renderOneTile();
//     ibrpg.xx_renderLayer();
// });

window.addEventListener("keydown", function(e){
    console.log("keydown");
    const keyName = event.key;
    const keyCode = event.keyCode;
    console.log('keydown event\n\n' + 'key: ' + keyName);
    console.log('keydown event\n\n' + 'keyCode: ' + keyCode);
    var char = ibrpg.world.character;
    var charPos = ibrpg.world.character.pos; 
    

    
    if(keyName == "ArrowRight"){
        // if(!ibrpg.xx_checkCollision(charPos.x,
        //     charPos.y, charPos.x+1, charPos.y)){
        //     ibrpg.world.character.pos.x+=1;
        // }
        ibrpg.moveActor(char, Constants.RIGHT);
        
    }
    if(keyName == "ArrowLeft"){
        // ibrpg.world.character.pos.x-=1;
        // if(!ibrpg.xx_checkCollision(charPos.x,
        //     charPos.y, charPos.x-1, charPos.y)){
        //     ibrpg.world.character.pos.x-=1;
        // }
        ibrpg.moveActor(char, Constants.LEFT);
    }
    if(keyName == "ArrowUp"){
        // ibrpg.world.character.pos.y-=1;
        // if(!ibrpg.xx_checkCollision(charPos.x,
        //     charPos.y, charPos.x, charPos.y-1)){
        //     ibrpg.world.character.pos.y-=1;
        // }
        ibrpg.moveActor(char, Constants.UP);
    }
    if(keyName == "ArrowDown"){
        // ibrpg.world.character.pos.y+=1;
        // if(!ibrpg.xx_checkCollision(charPos.x,
        //     charPos.y, charPos.x, charPos.y+1)){
        //     ibrpg.world.character.pos.y+=1;
        // }
        ibrpg.moveActor(char, Constants.DOWN);
        
    }
    
    ibrpg.renderWorld();
   
    if(keyName == 't'){
        ibrpg.xx_renderText("Welcome to Itty Bitty RPG");
    }
    
    if(keyName == 'l'){
        ibrpg.xx_loadLevel();
    }
    
    e.preventDefault();
});

