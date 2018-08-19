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
import cytoscape from './modules/cytoscape/core.js';
import filesystem from './modules/jszip/core.js';


window.addEventListener("load", function (e) {
    editor.init();
    cytoscape.init();
    filesystem.init();
    //console.log("editor", editor);
});