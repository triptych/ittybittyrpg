/** Core Editor Functions  */
const ver = "0.02";

var editor = {};
var storage = {};

var init = () =>  {
    console.log("core editor: init called");

    bindEvents();
    initLocalStorage();
}

var bindEvents = () => {
    console.log("bindEvents")
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