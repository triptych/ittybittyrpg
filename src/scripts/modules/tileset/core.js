/** Tileset code */

let tileset = {};
let view = {};

let panel = `
<div class='tileset panel' data-role='tileset'>
    <div class='tileset-pallette'>
        <canvas id='tileset-canvas'></canvas>
    </div>
    <div class='tileset-view'>
        <canvas id='tileset-view'></canvas>
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
    view = kontra.tileEngine({
        // tile size
        tileWidth:16,
        tileHeight: 16,

        // map size in tiles
        width: 9,
        height: 9
    });
    let img = document.createElement('img');
    img.src = "/src/tilesets/16x16tinyrpg/basictiles.png";
    img.onload = function() {
        view.addTilesets({
          image: img
        });
        // Add the following:
  view.addLayers({
    name: 'ground',
    data: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,
            0,  0,  6,  7,  7,  8,  0,  0,  0,
            0,  6,  27, 24, 24, 25, 0,  0,  0,
            0,  23, 24, 24, 24, 26, 8,  0,  0,
            0,  23, 24, 24, 24, 24, 26, 8,  0,
            0,  23, 24, 24, 24, 24, 24, 25, 0,
            0,  40, 41, 41, 10, 24, 24, 25, 0,
            0,  0,  0,  0,  40, 41, 41, 42, 0,
            0,  0,  0,  0,  0,  0,  0,  0,  0 ]

  });

  view.render();

      };
}


export default {
    init,
    tileset
};