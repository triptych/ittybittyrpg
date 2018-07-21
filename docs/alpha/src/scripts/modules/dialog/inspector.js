/**
 * ibrpg dialog inspector -- to embed in the editor module 
 */ 
var game = {
    obj:{}
};
var store = {};

var data = {
    name: "default",
    characters: [
        {"name": "Joe Character"},
        {"name": "Jill Character"},
        {"name": "Narrator"}
    ],
    text: "some default text"
};

var editDialogWindow = `
    <div class="popup popup-reveal">
        <div class="close" id='pop-close'>X</div>
        <h2>Dialog text</h2>
        <textarea class="dialog-data">
        </textarea>
        <div><button class="dialog-save" data-room="">Save</button></div>
    </div>
`;

var init = function (){
    console.log ("dialog: module init called.");
    console.log ("data:", data);
    console.log ("store:", store);
    
}

var listeners = function (evt) {
    
        switch (evt.target.classList[0]) {
            case 'close': 
                console.log("close clicked in popup");
                unbindEvents();
                document.querySelector(".popup").parentNode.removeChild(document.querySelector(".popup"));
                break;
            case 'dialog-save':
                console.log("clicked save on popup");
                updateValues(evt.target.dataset.room); 
                break;   
            default:
                console.log("dunno what you clicked in the popup")
        }
    
}
var bindEvents = function() {
    console.log("dialog: bindEvents");
    document.querySelector(".popup").addEventListener("click",listeners );
}

var unbindEvents = function(){
    console.log("dialog: unbindEvents");
    document.querySelector(".popup").removeEventListener("click", listeners); 
}
var showProperties = function (obj){
    console.log("dialog: show properties called ");
    console.log("dialog: passed in obj", obj);
    //document.body.appendChild(editDialogWindow);
    let popupwin = document.createRange().createContextualFragment(editDialogWindow);
    document.body.appendChild(popupwin);
    bindEvents();

    game.obj = obj;
    // if(game.obj.ibrpg.cy.elements("#"+game.obj.target.dataset['room']).data('dialog')){
    //     data.text = game.obj.ibrpg.cy.elements("#"+game.obj.target.dataset['room']).data('dialog').text;
    //     console.log(" --- data.text -- ",data.text);
    // } else {
    //     data.text = "some default text";
    // }
    // if(data.text === ){
    //     data.text = game.obj.ibrpg.cy.elements("#"+game.obj.target.dataset['room']).data('dialog').text;

    // }
    //document.querySelector('.popup .dialog-data').value = data.text;

    var key = obj.target.dataset['room'];
    if (!store[key]) {
        store[key] = {
            id: key,
            text: "placeholder text"
        }
    }
    console.log("dialog: store",store);
    var cyText = game.obj.ibrpg.cy.$('#'+key).data("dialog");
    console.log("dialog: cyText:", cyText);
    if( cyText != undefined    ){
        store[key].text = game.obj.ibrpg.cy.$('#'+key).data("dialog");
    }

    document.querySelector('.popup .dialog-data').value = store[key].text;
    document.querySelector('.popup .dialog-save').dataset.room = key;
}

var updateValues = function (room) {
    // console.log("dialog: update values");
    // console.log("dialog: game.obj", game.obj);
    // console.log("dialog: game.obj.target.dataset", game.obj.target.dataset);
    // data.text = document.querySelector('.popup .dialog-data').value;
    // console.log("data.text:" ,data.text);
    // console.log("selector:", "#"+game.obj.target.dataset['room'] );
    // var newData = Object.assign({},data);
    // game.obj.ibrpg.cy.$("#"+game.obj.target.dataset['room']).data('dialog',newData);
    // console.log("objects to update",game.obj.ibrpg.cy.$("#"+game.obj.target.dataset['room']).length)

    console.log("dialog: updateValues called");
    console.log("dialog: room", room);
    //console.log("dialog: data.text before:", data.text);
    //data.text = document.querySelector('.popup .dialog-data').value;
    //console.log("dialog: data.text after:", data.text);
    store[room].text = document.querySelector('.popup .dialog-data').value;
    console.log("dialog: store[room].text", store[room].text);
    console.log("dialog: game.obj.ibrpg.cy.$('#'+room)" , game.obj.ibrpg.cy.$('#'+room))
    game.obj.ibrpg.cy.$('#'+room).data("dialog", store[room].text);
};

export default {init, showProperties, updateValues}