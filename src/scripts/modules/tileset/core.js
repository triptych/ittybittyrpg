/** Tileset code */

let tileset = {};

let panel = `
<div class='tileset panel' data-role='tileset'>
    <div class='tileset-pallette'>[pallette]</div>
    <div class='tileset-view'>[tileset]</div>
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
    //injectPanel(domObj);
    bindEvents();
}
let injectPanel = (obj) => {
    console.log('injectPanel called')
    obj.insertAdjacentHTML('beforeend', panel);
    obj.insertAdjacentHTML('beforebegin',panelCSS);
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


export default {
    init,
    tileset
};