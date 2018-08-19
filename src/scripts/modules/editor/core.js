/** Core Editor Functions  */
const ver = "0.02";

var storage = {};

var init = () => {
    console.log("core editor: init called");

    bindEvents();
    initLocalStorage();
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
            console.log("evt ", evt);
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

                default:
                    console.log('dunno what to do?')
                    break;
            }


        })
    });

    window.addEventListener('update-ui', updateUI, false);
    window.addEventListener('set-game', setGame,true);
}

// pass new game request to jzip core via events
var handleNewGame = () => {
    console.log("handleNewGame called");
    //window.postMessage("file-new")

    var newGameEvent = new Event('file-new');
    window.dispatchEvent(newGameEvent);

    revealPanel('editor');

}

var setGame = (evt) => {
    //set-game
    console.log("editor core setGame called with data:", evt.detail);
    storage.game = evt.detail;
}

// generic panel reveal code
var revealPanel = (panelname) => {
    document.querySelectorAll(".panels .panel").forEach((itm, idx, coll) => {
        itm.classList.remove('visible')
        setTimeout(function () {
            itm.classList.add('hidden');
        }, 1000);
    });
    setTimeout(function () {
        // document.querySelectorAll(".panels .panel"+ "." + panelname)[1].classList.remove('hidden');
        // document.querySelectorAll(".panels .panel"+"." + panelname)[1].classList.add('visible');
        var panel = document.querySelector('[data-role=' + panelname + ']')
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
    console.log("updateUI called");
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