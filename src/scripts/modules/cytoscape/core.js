// /* ibrpg cytoscape model methods */
// let cy = null;

// function initCytoScapeModel () {
//     console.log('initCytoScapeModel module  called');
//     cy = cytoscape({
//       container: document.getElementById('grid'),
//       group: 'nodes',
//       elements: [],
//       style: [{
//           selector: 'node',
//           style: {
//             shape: 'hexagon',
//             'background-color': 'tan',
//             label: 'data(id)'
//           },

//         },
//         {
//           selector: 'edge',
//           style: {
//             'width': 3,
//             'line-color': '#ccc',
//             'target-arrow-color': '#ccc',
//             'target-arrow-shape': 'triangle'
//           }
//         }
//       ],
//       layout: {
//         name: 'grid'
//       }

//     });
//     cy.ready(function() {
//       console.log('cy.ready called');
//       ibrpg.bindCyNodes();
//     })
//   }

// function bindCyNodes () {
// console.log('bindCyNodes');
// cy.on('tap', 'node', function(evt) {
//     var node = evt.target;
//     console.log('tapped ' + node.id());
// });
// cy.on('taphold', 'node', function(evt) {
//     var node = evt.target;
//     console.log('taphold ' + node.id());
//     ibrpg.displayProperties({
//     context: Constants.ROOM,
//     target: node
//     })
// })
// }  

/* ibrpg cytoscape methods */

let cy = {};

let init = () => {
  console.log("cytoscape init called;");
  initCytoScapeModel();
}

let initCytoScapeModel = () => {
  cy = cytoscape({
    container: document.getElementById('grid'),
    group: 'nodes',
    elements: [],
    style: [{
        selector: 'node',
        style: {
          shape: 'hexagon',
          'background-color': 'tan',
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
  console.log(cy);

  cy.ready(function() {
    console.log('cy.ready called');
    bindCyNodes();
  })
};

let bindCyNodes = () => {
  console.log('bindCyNodes');
  cy.on('tap', 'node', function(evt) {
    var node = evt.target;
    console.log('tapped ' + node.id());
  });
  cy.on('taphold', 'node', function(evt) {
    var node = evt.target;
    console.log('taphold ' + node.id());
    // ibrpg.displayProperties({
    //   context: Constants.ROOM,
    //   target: node
    // });
  })
}

export default {
  init,
  cy
};