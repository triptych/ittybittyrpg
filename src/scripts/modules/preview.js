/* Preview world in a new window */
/**
 * Pass in to preview the ibrpg object from main
 * create a window and populate it with ibrpg data
 */
 
 
export default function (obj){
    console.log(" preview world called obj:",obj);
    obj.preview = window.open("","preview");
    //ibrpg.preview.document.body.innerHTML = "Hello world";
    var title = obj.world.name;
    var outPut = `
    <div>
      <h1>${title}</h1>
    </div>
    `;
    
    
    
    obj.preview.document.body.innerHTML = outPut;
  }
