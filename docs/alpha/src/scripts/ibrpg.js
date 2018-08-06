/* IttyBittyRPG Editor v 0.02 */
/* global cytoscape */
/* global JSZip */
'use strict';

/* world constants */
const Constants = {
    WORLD: 'world',
    ROOM: 'room'
}

import editor from './modules/editor/core.js';


window.addEventListener("load", function (e) {
    editor.init();
    //console.log("editor", editor);
});