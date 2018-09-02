/** Core Editor Functions  */
const ver = "0.02";

var storage = {};

var init = () => {
    console.log("core editor: init called");

    bindEvents();
    initLocalStorage();
    splashScreen();
}

var splashScreen = () => {
    console.log("init splashscreen called");
    var tempStorage = readFromStorage();
    console.log("tempStorage", tempStorage);
    var isStorageEmpty = Object.keys(tempStorage.cy).length === 0
    if(!isStorageEmpty){
        document.querySelector('[data-action=continue]').parentNode.classList.remove('hidden')
    }
}

var bindEvents = () => {
    console.log("editor core bindEvents");

    // add a cy node
    document.querySelector("#add_node").addEventListener('click', (evt) => {
        console.log('add_node clicked!')
        var evtAddNode = new Event('cy-add-node');
        window.dispatchEvent(evtAddNode);
    });

    // something else clicked
    document.querySelector(".ibrpg").addEventListener('click', (evt) => {
        console.log("something clicked");




        console.log("evt target", evt.target)
        switch (evt.target.dataset['type']) {
            case 'file-new':
                console.log("menu: file-new clicked");
                handleNewGame();
                break;
            case 'file-load':
                console.log("menu: file-load clicked");
                handleLoadGame();
                break;
            case 'file-save':
                console.log("menu: file-save clicked");
                handleSaveGame();
                break;
            case 'file-import':
                console.log("menu: file-import clicked");
                
                break;
            case 'file-export':
                console.log("menu: file-export clicked");
                handleExportGame();
                break;
            case 'view-preview':
                console.log("menu: view-preview clicked");
                break;
            default:
                console.log("something I don't know got clicked")
                break;
        }


        if (evt.target.dataset["type"] != "file" && evt.target.dataset["type"] != "view") {
            // document.querySelector('.toolbar').querySelectorAll('ul li ul').forEach((itm, idx, coll) => {
            //     console.log("toolbar hide")
            //     itm.classList.remove('active');
            // })
            hideMenuItems();
        }
    });

    // toolbar item clicked
    document.querySelectorAll(".editor .toolbar > ul > li > span").forEach((itm, idx, coll) => {
        itm.addEventListener('click', (evt) => {
            console.log("toolbar element evt ", evt);
            var targetEl = evt.target.parentNode.querySelector('ul');

            hideMenuItems();

            console.log("targetEl", targetEl.classList.contains('active'))
            if (targetEl.classList.contains('active')) {
                console.log(" toolbar hide toggle")
                targetEl.classList.remove('active');
            } else {
                console.log("toolbar show toggles");
                targetEl.classList.add('active');
            }

        })
    })

    // main menu buttons hover
    document.querySelectorAll("nav .nav").forEach((itm, idx, coll) => {
        itm.addEventListener("mouseover", function (evt) {
            evt.target.classList.add("throbbing");
            //evt.stopPropagation();
            itm.classList.add("hovering");
        });
        itm.addEventListener("mouseout", function (evt) {
            evt.target.classList.remove("throbbing");
            //evt.stopPropagation();
            itm.classList.remove("hovering");
        });
    });

    //start menu items click
    document.querySelectorAll(".nav button").forEach((itm, idx, coll) => {
        itm.addEventListener('click', (evt) => {
            console.log("nav button click: evt", {
                evt
            });
            console.log("data target", evt.target.dataset["action"])

            switch (evt.target.dataset['action']) {
                case 'new':
                    handleNewGame();
                    break;
                case 'continue':
                    handleContinueGame()
                    break;
                case 'load':
                    handleLoadGame();
                    
                    break;
                case 'import':
                    // handleImportGame() TODO
                    break;        
                default:
                    console.log('dunno what to do?')
                    break;
            }


        })
    });

    // listen for the import file event
    document.getElementById("file").addEventListener("change", function(evt) {
  
        var files = evt.target.files;
        for (var i = 0; i < files.length; i++) {
          console.log("file:", files[i]);
          //ibrpg.importWorld(files[i]);
          var importEvt = new CustomEvent('importit', {
              detail: files[i]
          });
          window.dispatchEvent(importEvt);
  
        }
      });
  
    // listen for the close window event on property windows
    document.querySelector('.prop-close').addEventListener('click', (evt) => {
        // you never "close" a dialog, you just go to another one. They all get closed.
        var revealEditorEvent = new CustomEvent('reveal-panel',{
            detail: {
                type: 'editor',
                data: {}
            }
        });
        window.dispatchEvent(revealEditorEvent);
    })
    
    // properties edit listeners
    document.getElementsByClassName('properties')[0].addEventListener('click', (evt)=> {
        console.log('property edit click ---- evt', evt);
        console.log('property key', evt.target.parentNode.dataset['key']);
        switch (evt.target.parentNode.dataset['key']) {
            case 'label':
            case 'id':
                console.log('prop edit key')
                var oldValue = evt.target.parentNode.dataset['value'];
                var newValue = window.prompt("New value: ", oldValue);
                evt.target.parentNode.dataset['value'] = newValue;
                evt.target.parentNode.querySelector('.prop-node-display').innerHTML = newValue;

                var setCyNodeKeyEvt = new CustomEvent('cy-set-key', {
                    detail: {
                        key: evt.target.parentNode.dataset['key'],
                        value: newValue,
                        id: evt.target.parentNode.dataset['room']
                    }
                });
                window.dispatchEvent(setCyNodeKeyEvt);
                
                break;
        
            default:
                break;
        }
    })


    window.addEventListener('update-ui', updateUI, false);
    window.addEventListener('set-game', setGame, true);
    window.addEventListener('reveal-panel', revealPanel, true);
}

// pass new game request to jzip core via events
var handleNewGame = () => {
    console.log("handleNewGame called");
    //window.postMessage("file-new")

    var newGameEvent = new Event('file-new');
    window.dispatchEvent(newGameEvent);

    //revealPanel('editor');
    var revealEditorEvent = new CustomEvent('reveal-panel',{
        detail: {
            type: 'editor',
            data: {}
        }
    });
    window.dispatchEvent(revealEditorEvent);

}

var handleSaveGame = () => {
    console.log("handleSaveGame called");

    var saveGameEvent = new Event('saveit');
    window.dispatchEvent(saveGameEvent);
    //console.log(this);
    //console.log(storage);

    
}

var handleContinueGame = () => {
    console.log("handleContinueGame called ");
    var continueGameEvent = new Event('continueit');
    window.dispatchEvent(continueGameEvent);
    var revealEditorEvent = new CustomEvent('reveal-panel',{
        detail: {
            type: 'editor',
            data: {}
        }
    });
    window.dispatchEvent(revealEditorEvent);
}

var handleLoadGame = () => {
    console.log("handleLoadGame called");
    var loadGameEvent = new Event('loadit');
    window.dispatchEvent(loadGameEvent);
    //revealPanel('editor');
    var revealEditorEvent = new CustomEvent('reveal-panel',{
        detail: {
            type: 'editor',
            data: {}
        }
    });
    window.dispatchEvent(revealEditorEvent);
}

var handleExportGame = () => {
    console.log("handleExportGame called");
    var exportGameEvent = new Event('exportit');
    window.dispatchEvent(exportGameEvent);
}

var setGame = (evt) => {
    //set-game
    console.log("editor core setGame called with data:", evt.detail);
    storage.game = evt.detail;
}

// generic panel reveal code
var revealPanel = (panelobj) => {
    console.log('revealPanel called with panelobj:', panelobj);
    document.querySelectorAll(".panels .panel").forEach((itm, idx, coll) => {
        itm.classList.remove('visible')
        setTimeout(function () {
            itm.classList.add('hidden');
        }, 1000);
    });

    switch (panelobj.detail.type) {
        case 'editor':
            console.log('editor setup?')
            setTimeout(function(){
                var resetcy = new Event('cy-force-reset'); 
                window.dispatchEvent(resetcy);
            },1005);
            break;
        case 'properties':
            console.log('properties setup?');
            let id = panelobj.detail.data.target.id();
            let label = panelobj.detail.data.target.data('label');

            document.getElementById('prop-node-name').innerHTML = id;
            document.getElementById('prop-node-label').innerHTML = label;

            document.querySelector('[data-key=id]').dataset.value = id;
            document.querySelector('[data-key=id]').dataset.room =  id;

            document.querySelector('[data-key=label]').dataset.value = label;
            document.querySelector('[data-key=label]').dataset.room =  id;


            // var nodes = `<option value='-1'>choose a node</option>`;
            // var edges = ``;
            // console.log("panelobj: ", panelobj);
            // console.log("nodes: id", panelobj.detail.data.cy.nodes());
            // console.log("filer on node: ", panelobj.detail.data.cy.filter("node"));
            // panelobj.detail.data.cy.nodes().each(function(itm,idx,coll){
            //     console.log("ele id:", itm.id());
                
            //     nodes += `<option value='${itm.id()}'>${itm.id()}</option>`;
            // });

            // panelobj.detail.data.cy.edges().each(function(itm, idx, coll){
            //     console.log("ele id:", itm.id());
            //     console.log("edge obj:", itm);
            //     edges += `<li> 
            //     Edge [${itm.id()}] 
            //     from [${itm.data('source')}] 
            //     to [${itm.data('target')}] -- 
            //     (<span class='del-edge' data-edge='${itm.id()}'>Delete</span>)</li>`;
            // });

            break;
        default:
            break;
    }    
    setTimeout(function () {
        // document.querySelectorAll(".panels .panel"+ "." + panelname)[1].classList.remove('hidden');
        // document.querySelectorAll(".panels .panel"+"." + panelname)[1].classList.add('visible');
        console.log('in revealpanel panelobj.type:', panelobj.type);
        var panel = document.querySelector('[data-role=' + panelobj.detail.type + ']');
        console.log('in revealpanel panel:',panel);
        panel.classList.remove('hidden');
        panel.classList.add('visible');
    }, 1001);
}

// hide dropdown menu items (usually when clicked away)
var hideMenuItems = () => {
    console.log("hideMenuItems called");
    document.querySelector('.toolbar').querySelectorAll('ul li ul').forEach((itm, idx, coll) => {
        console.log("toolbar hide")
        itm.classList.remove('active');
    })
}

var updateUI = () => {
    console.log("updateUI called storage:", storage);
    var gameName = storage.game.name;
    console.log("game name : ", gameName);
    document.querySelector('#game_name').innerHTML = gameName;
    
}


var initLocalStorage = () => {
    console.log("initLocalStorage called")
    var store = window.localStorage;
    if (store && store.getItem('ibrpg')) {
        storage.game = JSON.parse(store.getItem('ibrpg'));
    } else if (store) {
        store.setItem('ibrpg', JSON.stringify({
            name: 'default',
            ver: ver,
            cy: {}
        }));
        storage.game = JSON.parse(store.getItem('ibrpg'));
    }
    console.log("storage", storage)
    //storage.foo="blah"
}

var readFromStorage = () => {
    console.log("read from memory storage called")
    return storage.game;
}

var writeToStorage = (data) => {
    console.log("trying to write to memory storage, data", data); 
    storage.game = data;
    var store = window.localStorage;
    if(store) {
        store.setItem('ibrpg', JSON.stringify(storage.game));
    }
}

export default {
    init,
    storage
};