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
  initCytoScapeListeners();
}
let initCytoScapeListeners = () => {
  console.log('initCytoscapeListeners');
  window.addEventListener('cy-add-node', addNode, false);
  window.addEventListener('cy-elements-remove', removeElements, false);
  window.addEventListener('cy-set-key', setKey, true);
  window.addEventListener('cy-force-reset', resetCy, false);
};
let resetCy = () => {
  console.log('resetCy called ');
  
  var tempJson = cy.json();
  init();
  //cy.destroy();
  cy.json(tempJson);
  //cy.forceRender();
}

let setKey = (obj) => {
  console.log("setKey called, obj",  obj)
  cy.getElementById(obj.detail.id).data(obj.detail.key, obj.detail.value);
  console.log(" ***** cy element:", cy.getElementById(obj.detail.id))

}

let removeElements = () => {
  console.log("cytoscape - remove elements called");
  cy.elements().remove();
}

let addNode = () => {
  console.log('addNode called');
  var randomName = 'room-' + Math.floor(Math.random() * 1000);
  cy.add({
    group: 'nodes',
    data: {
      room: randomName,
      id: randomName,
      label: 'untitled room'
    }
  });
  cy.center();
}

let getCyJSON = () => {
  return cy.json();
}

let loadCyJSON = (obj) => {
  cy.json(obj);
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
          'background-color': 'lightblue',
          label: 'data(label)'
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
    console.log('cy.ready called -------------');
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
    var openProperties = new CustomEvent('reveal-panel', {
      detail: {
        type: 'properties',
        data: {
          context: 'room',
          target: node,
          cy: cy
        }
      }
    });
    window.dispatchEvent(openProperties);
  })
}

export default {
  init,
  cy,
  getCyJSON,
  loadCyJSON
};