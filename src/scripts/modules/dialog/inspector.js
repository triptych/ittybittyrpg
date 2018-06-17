/**
 * ibrpg dialog inspector -- to embed in the editor module 
 */ 

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
        <textarea class="dialog data">
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
    document.querySelector(".popup").addEventListener("click",listeners );
}

var unbindEvents = function(){
    document.querySelector(".popup").removeEventListener("click", listeners); 
}
var showProperties = function (){
    console.log("dialog: show properties called ");
    //document.body.appendChild(editDialogWindow);
    let popupwin = document.createRange().createContextualFragment(editDialogWindow);
    document.body.appendChild(popupwin);
    bindEvents();
}

var updateValues = function () {
    console.log("dialog: update values");
}

export default {init, showProperties, updateValues}