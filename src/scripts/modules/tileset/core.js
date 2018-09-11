/** Tileset code */

let tileset = {};
let view = {};

let panel = `
<div class='tileset panel' data-role='tileset'>
    <div class='tileset-pallette'>
        <canvas id='tileset-canvas' width='96' height='320'></canvas>
    </div>
    <div class='tileset-view'>
        <canvas id='tileset-view' width='320' height='320'></canvas>
    </div>
</div>
`;

let panelCSS = `
<style>
div[data-role=tileset] {
    display:flex;
    flex-direction: row;
    background-color: darkseagreen;
    color: midnightblue;
    width: 96vw;
    border-radius: 10px;
    padding: 4px;
}

div[data-role=tileset] .tileset-pallette {
    flex-grow: 1;
}
div[data-role=tileset] .tileset-view {
    flex-grow: 3;
}
#tileset-view {
    width: calc(32px * 10);
    height: calc(32px * 10);
}
</style>
`

let init = () => {
    console.log("tileset init called ");
    //initPallette();
    bindEvents();

}
let injectPanel = (obj) => {
    console.log('injectPanel called')
    obj.insertAdjacentHTML('beforeend', panel);
    obj.insertAdjacentHTML('beforebegin',panelCSS);
    initView();
}

let bindPanelEvents = () => {
    document.querySelector('[data-role=tileset]').addEventListener('click', (evt) => {
        console.log('plugin clicked!')
    });
}

let bindEvents = () => {

    window.addEventListener('tileset-trigger', (evt) => {
        console.log('tileset-trigger triggered');
        injectPanel(document.querySelector('.ibrpg .panels'));
        bindPanelEvents();
        // TODO reveal panel 
        var openTileSetEvt = new CustomEvent('reveal-panel', {
            detail: {
              type: 'tileset',
              data: {}
            }
          });
          window.dispatchEvent(openTileSetEvt);
    })
}

let initView = () => {
    console.log("initView called");
    kontra.init('tileset-view');
    panel = kontra.tileEngine({
        context: document.getElementById('tileset-canvas').getContext('2d'),
        tileWidth: 32,
        tileHeight: 32,
        width: 3,
        height: 10
    })

    view = kontra.tileEngine({
        // tile size
        tileWidth:32,
        tileHeight: 32,

        // map size in tiles
        width: 10,
        height: 10
    });
    let img = document.createElement('img');
    img.src = "/src/tilesets/dungeoncrawl/DungeonCrawl_ProjectUtumnoTileset.png";
    img.onload = function() {
    panel.addTilesets({
        image:img
    });


    var list = [];
    var lowEnd = 0;
    var highEnd = 320;
    for (var i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }

    panel.addLayers({
        name: 'picker',
        data: list
    })
    panel.render();

    view.addTilesets({
        image: img
    });

        
        // Add the following:
  view.addLayers({
    name: 'ground',
    // data: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,
    //         0,  0,  6,  7,  7,  8,  0,  0,  0,
    //         0,  6,  27, 24, 24, 25, 0,  0,  0,
    //         0,  23, 24, 24, 24, 26, 8,  0,  0,
    //         0,  23, 24, 24, 24, 24, 26, 8,  0,
    //         0,  23, 24, 24, 24, 24, 24, 25, 0,
    //         0,  40, 41, 41, 10, 24, 24, 25, 0,
    //         0,  0,  0,  0,  40, 41, 41, 42, 0,
    //         0,  0,  0,  0,  0,  0,  0,  0,  0 ]
    data: [ 
        0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
        50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
        60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
        70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
        80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
        90, 91, 92, 93, 94, 95, 96, 97, 98, 99
        ]
  });

  view.render();

      };
}


export default {
    init,
    tileset
};