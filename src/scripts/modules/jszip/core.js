/* jszip core js and filesystem */

var filesystem = {};



let init = () => {
    console.log( "filesystem (jszip) init called");
    initListeners();
}

let save = () => {
    console.log("gzip save called");
    // save implemented in parent because of shared memory
    
}

let load = () => {
    console.log("load called");
}

let exportgame = (obj) => {
    console.log("export called w obj:",obj);
    var zip = new JSZip();
    zip.folder('ibrpg')
        .file('index.html', "<body>test</body>")
        .file('ibrpg.js', 'var ibrpg=' + JSON.stringify(obj))
        .file('core.js', '"corejs"')

    zip.generateAsync({type: "base64"}).then(function(base64){
        var theLink = document.createElement("a");
        theLink.setAttribute("id", "theDLLink");
        theLink.setAttribute("href", "data:application/zip;base64," + base64);
        theLink.classList.add("dl-link");
        theLink.classList.add("hidden");
        theLink.setAttribute("download", obj.name + ".zip");
        theLink.appendChild(document.createTextNode("Click Here To Download"));
        //document.getElementsByTagName("body")[0].appendChild(theLink);
        document.getElementById('dlbutton').appendChild(theLink);
        theLink.click();
    }, function(err){
        //jQuery("#data_uri").text(err);
        console.error("error", err);
      });
}

let importgame = (file) => {
    console.log("import called in jszip,  file:", file);
    JSZip.loadAsync(file).then(function(zip){
        zip.forEach(function(relativePath, zipEntry){
            console.log("zipEntry.name", zipEntry.name);
            if (zipEntry.name.includes("ibrpg.js")) {
                zip.file(zipEntry.name).async("string").then(function(str) {
                  console.log("str:", str);
                  var jsonString = str.split('var ibrpg=')[1];
                  console.log("jsonString:", jsonString);
                  //ibrpg.world = JSON.parse(jsonString);
                  //ibrpg.cy.json(ibrpg.world.cy);
                  //ibrpg.displayWorld();
                  //return jsonString;
                  //set-game-from-json
                  var setGameFromJsonEvt = new CustomEvent("set-game-from-json", {
                      detail: jsonString
                  });
                  window.dispatchEvent(setGameFromJsonEvt);
                });
      
              }
        }
    );
});
};

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
