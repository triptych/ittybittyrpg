/** Core Editor Functions  */

// var editor = {
//     init: function () {
//         console.log("core editor: init called");
//     }
// };

var init = function () {
    console.log("core editor: init called");

    bindEvents();
}

var bindEvents = function (){

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
    });

    document.querySelectorAll(".nav button").forEach((itm, idx, coll) => {
        itm.addEventListener('click', (evt)=> {
            console.log("nav button click: evt", {evt});
            document.querySelectorAll(".panels .panel").forEach((itm,idx,coll)=>{
                itm.classList.remove('visible')
                setTimeout(function(){
                    itm.classList.add('hidden');
                },1000);
            });
            setTimeout(function(){
                document.querySelectorAll(".panels .panel")[1].classList.remove('hidden');
                document.querySelectorAll(".panels .panel")[1].classList.add('visible');
            },1001);
            

        })
    })
}

export default { init };