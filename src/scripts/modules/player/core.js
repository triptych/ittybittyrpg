/** ibrpg player code **/

export function buildScript(obj){
    return `
    const Constants = {
        DELAY: 10,
        WIDTH: 12,
        HEIGHT: 12,
        SPHEIGHT: 32,
        SPWIDTH: 32,
        RIGHT: 'right',
        LEFT: 'left',
        UP: 'up',
        DOWN: 'down',
        RANDOM: 'random'
    };
    
    let player = {
        cv: null,
        ctx: null,
        init: function(e){
            console.log("init called");
            console.log("ibrpg data:", ibrpg);
            player.initCanvas();
            //player.drawText(ibrpg.cy.elements.nodes[0].data.titleText);
            console.log("player dialog", ibrpg.cy.elements.nodes[0].data.dialog);
            
            player.drawText(ibrpg.cy.elements.nodes[0].data.dialog)
        },
        drawText: function(text){
            console.log("drawText:" , text);
            player.ctx.font="30px Verdana";
            // Create gradient
            var gradient=player.ctx.createLinearGradient(0,0,player.cv.width,0);
            gradient.addColorStop("0","magenta");
            gradient.addColorStop("0.5","blue");
            gradient.addColorStop("1.0","red");
            // Fill with gradient
            player.ctx.fillStyle=gradient;
            player.ctx.fillText(text,10,90);
            
        },
        initCanvas: function(){
            var ctx;
            var cv = player.cv = document.getElementById("ibrpg");
            cv.setAttribute("width", Constants.WIDTH * Constants.SPWIDTH + "px");
            cv.setAttribute("height", Constants.HEIGHT * Constants.SPHEIGHT + "px");
            ctx = player.ctx =cv.getContext("2d");
            player.clearCanvas();
            
        },
        clearCanvas: function(){
            var ctx = player.ctx;
            ctx.beginPath();
            ctx.rect(0,0,Constants.WIDTH * Constants.SPWIDTH, Constants.HEIGHT * Constants.SPHEIGHT);
            ctx.fillStyle = "black";
            ctx.fill();
        }
    }
    window.addEventListener("load", function(e) {
        player.init();
    });
`;
}
