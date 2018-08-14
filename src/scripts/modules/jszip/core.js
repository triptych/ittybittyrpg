/* jszip core js and filesystem */

var filesystem = {};



let init = () => {
    console.log( "filesystem (jszip) init called");
    initListeners();
}

let save = () => {
    console.log("save called")
}

let load = () => {
    console.log("load called");
}

let exportgame = () => {
    console.log("export called");
}

let importgame = () => {
    console.log("import called");
}

let newgame = (e) => {
    console.log("newgame called with e:", e);
}

let initListeners = () => {
    console.log("initListeners called");
    window.addEventListener('file-new', newgame, false);
}

export default {
    init,
    save,
    load,
    exportgame,
    importgame,
    newgame,
    filesystem
}
