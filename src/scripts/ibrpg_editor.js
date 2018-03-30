/* Iitty Bitty RPG Editor */
/* global cytoscape */

let ibrpg = {
    env: {},
    init: function(){
        console.log('init called!');
        ibrpg.xx_showNodes();
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


window.addEventListener("DOMContentLoaded", function(e){
    console.log("addEventListener:", e);
    ibrpg.init();
    // document.getElementById("dungeoncrawl").addEventListener("load", function(){
    //     console.log("crawl loaded")
    //     ibrpg.xx_timedUpdate();
    // });
});