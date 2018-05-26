/* Iitty Bitty RPG Editor */
/* global cytoscape */
const Constants ={
  WORLD: 'world'
}

let ibrpg = {
  env: {
    version: '0.01'
  },
  world: {
    name: '',
    ver: '0.01'
  },
  db: null,
  storage: null,
  cy: null,
  init: function() {
    console.log('-- init called!');
    //ibrpg.xx_showNodes();
    //ibrpg.xx_setUpIndexedDB();
    ibrpg.setUpLocalStorage();
    ibrpg.bindEvents();
    ibrpg.initCytoScapeModel();

  },
  initCytoScapeModel: function() {
    console.log('initCytoScapeModel called');
    ibrpg.cy = cytoscape({
      container: document.getElementById('grid'),
      group: 'nodes',
      elements: [
        // // nodes
        // { data: { id: 'a' } },
        // { data: { id: 'b' } },
        // { data: { id: 'c' } },
        // { data: { id: 'd' } },
        // { data: { id: 'e' } },
        // { data: { id: 'f' } },
        // // edges
        // {
        //   data: {
        //     id: 'ab',
        //     source: 'a',
        //     target: 'b'
        //   }
        // },
        // {
        //   data: {
        //     id: 'cd',
        //     source: 'c',
        //     target: 'd'
        //   }
        // },
        // {
        //   data: {
        //     id: 'ef',
        //     source: 'e',
        //     target: 'f'
        //   }
        // },
        // {
        //   data: {
        //     id: 'ac',
        //     source: 'a',
        //     target: 'c'
        //   }
        // },
        // {
        //   data: {
        //     id: 'be',
        //     source: 'b',
        //     target: 'e'
        //   }
        // }
      ],
      style: [{
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
    ibrpg.cy.ready(function() {
      console.log('cy.ready called');
      ibrpg.bindCyNodes();
    })
  },
  bindCyNodes: function() {
    console.log('bindCyNodes');
    ibrpg.cy.on('tap', 'node', function(evt) {
      var node = evt.target;
      console.log('tapped ' + node.id());
    });
  },
  setUpLocalStorage: function() {
    var storage = window.localStorage;
    if (storage && storage.getItem('ibrpg')) {
      ibrpg.storage = JSON.parse(storage.getItem('ibrpg'))
    }
    else if (storage) {
      storage.setItem('ibrpg', JSON.stringify({
        name: 'default',
        ver: ibrpg.env.version
      }));
      ibrpg.storage = JSON.parse(storage.getItem('ibrpg'));
    }
  },
  xx_setUpIndexedDB: function() {
    // In the following line, you should include the prefixes of implementations you want to test.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

    if (!window.indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB. Saving will not work in this version.");
    }

    // Let us open our database
    var request = window.indexedDB.open("IBRPGDatabase", 3);

    request.onerror = function(event) {
      // Do something with request.errorCode!
      console.error("-- request.onerror: ", event);
      console.error("-- request.onerror: ", request.errorCode);
    };
    request.onsuccess = function(event) {
      // Do something with request.result!
      console.info("-- request.onsuccess: ", event);
      console.info("-- request.onsuccess: ", request.result);
      ibrpg.db = event.target.result;

      ibrpg.db.onerror = function(event) {
        // Generic error handler for all errors targeted at this database's
        // requests!
        console.error("Database error: " + event.target.errorCode);
      };
    };

    // This event is only implemented in recent browsers   
    request.onupgradeneeded = function(event) {
      // Save the IDBDatabase interface 
      ibrpg.db = event.target.result;

      // Create an objectStore for this database
      var objectStore = ibrpg.db.createObjectStore("ibrpg", {
        name: "world name",
        version: "0.01"

      });
    };
  },
  bindEvents: function() {
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
    document.getElementsByClassName('toolbar').item(0).addEventListener('click', function(e) {
      console.log("-- toolbar click e:", e);
      console.log('-- e.target: ', e.target.getAttribute('id'));
      ibrpg.routeEvent({
        evt: e.target.getAttribute('id')
      });
    });

    document.getElementById("file").addEventListener("change", function(evt) {
      // var theContent = document.getElementById("contenttext");
      // console.log("theContent", theContent);
      // while (theContent.firstChild) {
      //     theContent.removeChild(theContent.firstChild);

      // }

      var files = evt.target.files;
      for (var i = 0; i < files.length; i++) {
        console.log("file:", files[i]);
        ibrpg.importWorld(files[i]);

      }
    });
    
    document.getElementById('prop-close').addEventListener('click', function(evt){
      ibrpg.concealProperties();
    })
  },
  routeEvent: function(obj) {
    console.log(obj.evt);
    switch (obj.evt) {
      case 'new':
        console.log('new world triggered');
        ibrpg.genNewWorld();
        break;
      case 'load':
        console.log('load an existing world');
        ibrpg.loadWorld();
        break;
      case 'save':
        console.log('save a world');
        ibrpg.saveWorld();
        break;
      case 'export':
        console.log('export a world');
        ibrpg.exportWorld();
        break;
      case 'import':
        console.log('export a world');
        //ibrpg.importWorld();
        break;
      case 'new-node':
        console.log('create a new node in the world');
        ibrpg.addNode();
        break;
      case 'properties':
        console.log('display the properties window');
        ibrpg.displayProperties(Constants.WORLD)
        break;
      default:
        // code
        console.log('something clicked but I don\'t know what it was');
    }
    ibrpg.displayWorld();
  },
  displayProperties: function(type){
    switch (type) {
      case Constants.WORLD:
        console.log('display properties of the world');
        ibrpg.loadProperties(type);
        document.querySelectorAll('.properties')[0].classList.add('prop-reveal');
        break;
      
      default:
        // code
    }
  },
  loadProperties: function(type){
    console.log('loadproperties, type:', type);
    var thePanel = document.querySelectorAll('.properties .prop-world')[0];
    var tName = ibrpg.world.name;
    thePanel.innerHTML = "";
    thePanel.innerHTML = `
    <div>
       <span>Name</span> : <b>${tName}</b>
    </div>
    `;
    
  },
  concealProperties: function(){
    console.log('conceal properties panel');
    document.querySelectorAll('.properties')[0].classList.remove('prop-reveal');
  },
  addNode: function() {
    console.log('addNode called');
    var randomName = 'room ' + Math.floor(Math.random() * 1000);
    ibrpg.cy.add({
      group: 'nodes',
      data: {
        room: randomName,
        id: randomName
      }
    });
    //ibrpg.cy.reset();
    //ibrpg.cy.fit();
    ibrpg.cy.center();
  },
  genNewWorld: function() {
    var worldTitle = prompt("What do you want to call your world?", "world" + Math.floor(Math.random() * 10000));
    ibrpg.world = {
      name: worldTitle,
      ver: ibrpg.env.version
    }
    console.log(ibrpg.world);
  },
  genCtyoModel: function() {
    console.log('generating cytoscape model for this world');

  },
  saveWorld: function() {
    if (ibrpg.world.name == '') {
      alert("your world has no name - please create or load a new world with a name");
    }
    else {
      ibrpg.storage = ibrpg.world;
      window.localStorage.setItem('ibrpg', JSON.stringify(ibrpg.storage));
      alert("world: [" + ibrpg.storage.name + "] saved");
    }
  },
  loadWorld: function() {
    var tempStorage = JSON.parse(window.localStorage.getItem('ibrpg'));

    if (confirm("Are you sure you want to load? It will destroy your current world")) {

      ibrpg.storage = tempStorage;
      ibrpg.world = ibrpg.storage;
      alert('world: [' + ibrpg.world.name + '] loaded');
    }



  },
  displayWorld: function() {
    console.log("displayworld called");
    document.getElementById('worldName').innerHTML = ibrpg.world.name;
  },
  exportWorld: function() {
    console.log("in exportworld");
    var zip = new JSZip();
    zip.folder('ibrpg')
      .file('index.html', '<html><head><title>' + ibrpg.world.name + '</title><script src="ibrpg.js"></script></head><body><h1>' + ibrpg.world.name + '</h1></body></html>')
      .file('ibrpg.js', 'var ibrpg=' + JSON.stringify(ibrpg.world));

    var promise = null;

    zip.generateAsync({ type: "base64" }).then(function(base64) {
      var theLink = document.createElement("a");
      theLink.setAttribute("id", "theDLLink");
      theLink.setAttribute("href", "data:application/zip;base64," + base64);
      theLink.classList.add("dl-link");
      theLink.classList.add("hidden");
      theLink.setAttribute("download", ibrpg.world.name + ".zip");
      theLink.appendChild(document.createTextNode("Click Here To Download"));
      //document.getElementsByTagName("body")[0].appendChild(theLink);
      document.getElementById('dlbutton').appendChild(theLink);
      theLink.click();
    }, function(err) {
      //jQuery("#data_uri").text(err);
      console.error("error", err);
    });
  },
  importWorld: function(file) {
    console.log("ibrpg.importWorld");
    JSZip.loadAsync(file).then(function(zip) {
      zip.forEach(function(relativePath, zipEntry) { // 2) print entries
        // $fileContent.append($("<li>", {
        //     text : zipEntry.name
        // }));
        console.log("zipEntry.name", zipEntry.name);


        // if(zipEntry.name.includes(".txt")){
        //     zip.file(zipEntry.name).async("string").then(function(str){
        //         console.log("str:",str);
        //         document.getElementById("contenttext").appendChild(document.createTextNode(str));
        //     });
        // }
        if (zipEntry.name.includes(".js")) {
          zip.file(zipEntry.name).async("string").then(function(str) {
            console.log("str:", str);
            jsonString = str.split('var ibrpg=')[1]
            ibrpg.world = JSON.parse(jsonString);
            ibrpg.displayWorld();
          });

        }

      });




    });
  },
  xx_showNodes: function() {
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
      style: [{
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
      });
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

window.addEventListener("load", function(e) {
  ibrpg.init();
})
