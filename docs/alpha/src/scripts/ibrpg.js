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

// init stuff when page is loaded -- components
window.addEventListener("load", function (e) {
    editor.init();
    cyto.init();
    filesystem.init();
    //console.log("editor", editor);
});

// listen for save custom event
window.addEventListener('saveit', function (e) {
    console.log("saveit")
    editor.storage.game = {
        name : document.getElementById('game_name').innerHTML,
        ver : Constants.VERSION ,
        cy: cyto.getCyJSON()
    }
    window.localStorage.setItem('ibrpg', JSON.stringify(editor.storage.game));
      alert("world: [" + editor.storage.game.name + "] saved");
});

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
});

window.addEventListener('continueit', (e) => {
    // load to memory
    editor.storage.game = JSON.parse(window.localStorage.getItem('ibrpg'));
    // update cytoscape
    //ibrpg.cy.json(ibrpg.world.cy);
    cyto.loadCyJSON(editor.storage.game.cy);
    // update UI
    var evtUpdateUI = new Event('update-ui');
    window.dispatchEvent(evtUpdateUI);
});

window.addEventListener('exportit', function (e) {
    console.log("exportit called in parent js");
    filesystem.exportgame(editor.storage.game);
});

window.addEventListener('importit', function (e){
    console.log("importit called in parent js e",e);
    filesystem.importgame(e.detail);
    //editor.storage.game = JSON.parse(jsonString);
});

window.addEventListener('set-game-from-json', function(e){
    console.log('set-game-from-json called');
    editor.storage.game = JSON.parse(e.detail);
    cyto.loadCyJSON(editor.storage.game.cy);
        // update UI
        var evtUpdateUI = new Event('update-ui');
        window.dispatchEvent(evtUpdateUI);
})