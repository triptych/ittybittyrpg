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
    window.localStorage.setItem('ibrpg', JSON.stringify(editor.storage.game));
      alert("world: [" + editor.storage.game.name + "] saved");
})

window.addEventListener('loadit', function (e) {
    console.log('loadit called in parent js');
    if(!confirm("Are you sure you want to load? Your current progress will be lost.")){
        return;
    } else {
        // load to memory
        editor.storage.game = JSON.parse(window.localStorage.getItem('ibrpg'));
        // update cytoscape
        //ibrpg.cy.json(ibrpg.world.cy);
        cyto.loadCyJSON(editor.storage.game.cy);
        // update UI
        var evtUpdateUI = new Event('update-ui');
        window.dispatchEvent(evtUpdateUI);
    }
})