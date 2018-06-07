/* Preview world in a new window */
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
