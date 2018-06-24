/** Core Editor Functions  */

// var editor = {
//     init: function () {
//         console.log("core editor: init called");
//     }
// };

var init = function () {
    console.log("core editor: init called;")
    bindEvents();
}

var bindEvents = function (){
    // document.querySelectorAll("nav .nav").addEventListener("mouseover", function (evt){
    //     evt.target.classList.add("hovering");
    // });
    // document.querySelectorAll("nav .nav").addEventListener("mouseout", function (evt){
    //     evt.target.classList.remove("hovering");
    // });
    document.querySelectorAll("nav .nav").forEach((itm, idx, coll) => {
        itm.addEventListener("mouseover", function(evt){
            evt.target.classList.add("throbbing");
            //evt.stopPropagation();
            itm.classList.add("hovering");
        });
        itm.addEventListener("mouseout", function(evt){
            evt.target.classList.remove("throbbing");
            //evt.stopPropagation();
            itm.classList.remove("hovering");
        }); 
    })
}

export default { init };