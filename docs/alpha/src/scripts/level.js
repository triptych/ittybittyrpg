if(!levels){
    var levels = [];
    console.log("add level");
}

levels.push({
    name: "firstOne",
    tileDef: {
      "w" : {
          type: "dungeoncrawl",
          name: "wall",
          xOffset: 4,
          yOffset: 16,
          collision: true
      },
      "f" : {
          type: "dungeoncrawl",
          name: "floor",
          xOffset: 0,
          yOffset: 16,
          collision: false
      }
    },
    monsters: {
        // "monster_1" : {
        //     type: "dungeoncrawl",
        //     name: "monster",
        //     xOffset: 0,
        //     yOffset: 5,
        //     hp: 10,
        //     pos: {
        //         x: 5,
        //         y: 5
        //     }
        // }  
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
          }
      },
      character: {
        xOffset: 1,
        yOffset: 2,
        type: "dungeoncrawl",
        name: "character",
        pos: {
            x: 1,
            y: 1
        }
      },
      map:`w,w,w,w,w,w,w,w,w,w,w,w,
           w,f,f,f,f,f,w,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,w,f,f,f,f,f,f,f,f,w,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,f,f,f,f,f,w,
           w,f,f,f,f,f,w,f,f,f,f,w,
           w,w,w,w,w,w,w,w,w,w,w,w`
    })
