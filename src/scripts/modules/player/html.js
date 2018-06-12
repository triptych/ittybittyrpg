/* ibrpg player html */
export function buildCode(obj){
    return `
<script src='ibrpg.js'></script>
<script src='core.js'></script> 
<div>
    <h1>${obj.world.name}</h1>  
    <div class="game">
        <canvas id="ibrpg"></canvas>
    </div>
</div>
`;
}