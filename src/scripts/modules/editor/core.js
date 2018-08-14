/** Core Editor Functions  */
const ver = "0.02";

var storage = {};

var init = () => {
    console.log("core editor: init called");

    bindEvents();
    initLocalStorage();
}

var bindEvents = () => {
    console.log("bindEvents")

    document.querySelector("#add_node").addEventListener('click', (evt) => {
        console.log('add_node clicked!')
        var evtAddNode = new Event('cy-add-node');
        window.dispatchEvent(evtAddNode);
    });

    document.querySelector(".ibrpg").addEventListener('click', (evt) => {
        console.log("something clicked");

        console.log("evt target", evt.target)
        if(evt.target.dataset["type"] != "file" && evt.target.dataset["type"] != "view"){
        document.querySelector('.toolbar').querySelectorAll('ul li ul').forEach((itm, idx, coll) => {
            console.log("toolbar hide")
            itm.classList.remove('active');
        })
        }
    });

    document.querySelectorAll(".editor .toolbar > ul > li > span").forEach((itm, idx, coll) => {
        itm.addEventListener('click', (evt) => {
            console.log("evt ", evt);
            var targetEl = evt.target.parentNode.querySelector('ul');
            document.querySelector('.toolbar').querySelectorAll('ul li ul').forEach((itm, idx, coll) => {
                console.log("toolbar hide")
                itm.classList.remove('active');
            })

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

}

var handleNewGame = () => {
    console.log("handleNewGame called");
    //window.postMessage("file-new")
    var newGameEvent = new Event('file-new');
    window.dispatchEvent(newGameEvent);
    revealPanel('editor');

}

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



var initLocalStorage = () => {
    console.log("initLocalStorage called")
    var store = window.localStorage;
    if (store && store.getItem('ibrpg')) {
        storage.game = JSON.parse(store.getItem('ibrpg'));
    } else if (store) {
        store.setItem('ibrpg', JSON.stringify({
            name: 'default',
            ver: ver
        }));
        storage.game = JSON.parse(store.getItem('ibrpg'));
    }
    console.log("storage", storage)
    //storage.foo="blah"
}

export default {
    init,
    storage
};