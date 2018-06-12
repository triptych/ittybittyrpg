// /** ibrpg player code **/
// /*global title */
// export var ibrpg_player = `
//     <div>
//       <h1></h1>
//     </div>
//     <script>
//     console.log="player code!";
//     (function init(){
//         document.getElementsByTagName("h1").inn
//     })()
//     </script>
// `;

export function buildScript(obj){
    return `
    let player = {
        init: function(e){
            console.log("init called");
            console.log("ibrpg data:", ibrpg);
        }
    }
    window.addEventListener("load", function(e) {
        player.init();
    });
`;
}
