/* jszip core js and filesystem */

var filesystem = {};



let init = () => {
    console.log( "filesystem (jszip) init called");
    initListeners();
}

let save = () => {
    console.log("gzip save called");

    
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
    // prompt for game name
    var game_name = window.prompt("Name of your new world?", 'world'+Math.floor(Math.random()*10000));
    var world = {
        name: game_name,
        ver: "0.02",
        cy: {}
    }
    //  ibrpg.cy.elements().remove();
    var evtRemove = new Event('cy-elements-remove');
    var evtSetGame = new CustomEvent('set-game', {
        detail:world
    });
    var evtUpdateUI = new Event('update-ui');
    window.dispatchEvent(evtRemove);
    window.dispatchEvent(evtSetGame);
    window.dispatchEvent(evtUpdateUI);

}

let initListeners = () => {
    console.log("initListeners called");
    window.addEventListener('file-new', newgame, false);
    window.addEventListener('file-save', save, false);
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
