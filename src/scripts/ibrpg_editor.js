/* Iitty Bitty RPG Editor */
/* global cytoscape */

let ibrpg = {
    env: {},
    init: function(){
        console.log('-- init called!');
         //ibrpg.xx_showNodes();
         ibrpg.bindEvents();
    },
    bindEvents: function(){
      console.log("-- bindEvents called.");
      var items = document.getElementsByClassName("tb-item");
      console.log("items:", items);
      console.log(items.length);
      // for(var i = 0; i < items.length; i++){
      //   //console.log(i)
      //   console.log("item id: ",items[i].id);
      // }
      // items.forEach(function(elem){
      //   console.log(elem);
      // });
      // Array.prototype.forEach.call(items, function(elem){
      //   console.log('elem')
      // });
      
      // bind toolbar events 
      document.getElementsByClassName('toolbar').item(0).addEventListener('click', function(e){
        console.log("-- toolbar click e:",e);
        console.log('-- e.target: ', e.target.getAttribute('id'));
        ibrpg.routeEvent({
          evt: e.target.getAttribute('id')
        })
      })
    },
    routeEvent: function(obj){
      console.log(obj.evt);
      switch (obj.evt) {
        case 'new':
          console.log('new world triggered')
          break;
        case 'load':
          console.log('load an existing world');
          break;
        case 'save':
          console.log('save a world');
          break;
        case 'export':
          console.log('export a world');
          break;
        case 'new-node':
          console.log('create a new node in the world');
          break;
        case 'properties':
          console.log('display the properties window');
        default:
          // code
          console.log('something clicked but I don\'t know what it was');
      }
    },
    xx_showNodes: function(){
        console.log('xx_showNodes:');
        var cy = cytoscape({
            container: document.getElementById('grid'),
            elements: [
              // nodes
              { data: { id: 'a' } },
              { data: { id: 'b' } },
              { data: { id: 'c' } },
              { data: { id: 'd' } },
              { data: { id: 'e' } },
              { data: { id: 'f' } },
              // edges
              {
                data: {
                  id: 'ab',
                  source: 'a',
                  target: 'b'
                }
              },
              {
                data: {
                  id: 'cd',
                  source: 'c',
                  target: 'd'
                }
              },
              {
                data: {
                  id: 'ef',
                  source: 'e',
                  target: 'f'
                }
              },
              {
                data: {
                  id: 'ac',
                  source: 'a',
                  target: 'c'
                }
              },
              {
                data: {
                  id: 'be',
                  source: 'b',
                  target: 'e'
                }
              }
            ],
            style: [
                {
                    selector: 'node',
                    style: {
                        shape: 'hexagon',
                        'background-color': 'red',
                        label: 'data(id)'
                    },
                    
                },
                {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
                ],
            layout: {
                 name: 'grid'
             }
                
        });
        
        // add nodes via js 
        for (var i = 0; i < 10; i++) {
            cy.add({
                data: { id: 'node' + i }
                }
            );
            var source = 'node' + i;
            cy.add({
                data: {
                    id: 'edge' + i,
                    source: source,
                    target: (i % 2 == 0 ? 'a' : 'b')
                }
            });
        }
        
        // // fix layout
        //cy.layout().run();
         
        cy.layout({
         name: 'grid'
        }).run();

    }
    
    
}


// window.addEventListener("DOMContentLoaded", function(e){
//     console.log("addEventListener:", e);
    
//     document.getElementById("dungeoncrawl").addEventListener("load", function(){
//         //console.log("crawl loaded")
//         //ibrpg.xx_timedUpdate();
//         //ibrpg.init();
//     });
// });

window.addEventListener("load", function(e){
  ibrpg.init();  
})