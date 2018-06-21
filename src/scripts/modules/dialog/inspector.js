/**
 * ibrpg dialog inspector -- to embed in the editor module 
 */ 
var game = {
    obj:null
};
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
        ${data.text}
        </textarea>
        <div><button class="dialog-save">Save</button></div>
    </div>
`;

var init = function (){
    console.log ("dialog: module init called.");
    console.log ("data:", data);
    
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
                updateValues(); 
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
    
    game.obj = obj;
    if(game.obj.ibrpg.cy.elements("#"+game.obj.target.dataset['room']).data('dialog')){
        data.text = game.obj.ibrpg.cy.elements("#"+game.obj.target.dataset['room']).data('dialog').text;
        console.log(" --- data.text -- ",data.text);
    } else {
        data.text = "some default text";
    }
    // if(data.text === ){
    //     data.text = game.obj.ibrpg.cy.elements("#"+game.obj.target.dataset['room']).data('dialog').text;

    // }
    document.querySelector('.popup .dialog-data').value = data.text;

    bindEvents();
}

var updateValues = function () {
    console.log("dialog: update values");
    console.log("dialog: game.obj", game.obj);
    console.log("dialog: game.obj.target.dataset", game.obj.target.dataset);
    data.text = document.querySelector('.popup .dialog-data').value;
    console.log("data.text:" ,data.text);
    console.log("selector:", "#"+game.obj.target.dataset['room'] );

    game.obj.ibrpg.cy.$("#"+game.obj.target.dataset['room']).data('dialog',data);
}

export default {init, showProperties, updateValues}