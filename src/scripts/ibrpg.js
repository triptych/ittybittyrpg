/* IttyBittyRPG Editor v 0.02 */
/* global cytoscape */
/* global JSZip */
'use strict';

/* world constants */
const Constants = {
    WORLD: 'world',
    ROOM: 'room',
    VERSION: '0.02'
}

import editor from './modules/editor/core.js';
import cyto from './modules/cytoscape/core.js';
import filesystem from './modules/jszip/core.js';


window.addEventListener("load", function (e) {
    editor.init();
    cyto.init();
    filesystem.init();
    //console.log("editor", editor);
});

window.addEventListener('saveit', function (e) {
    console.log("saveit")
    editor.storage.game = {
        name : document.getElementById('game_name').innerHTML,
        ver : Constants.VERSION ,
        cy: cyto.getCyJSON()
    }
    window.localStorage.setItem('ibrpg', JSON.stringify(editor.storage));
      alert("world: [" + editor.storage.game.name + "] saved");
})