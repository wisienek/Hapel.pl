//script inteded for IScriptedItem (essential scripts: nodes.js, graph.js)
var graph = new Graph();
var queue = [];

function init(e) {
  e.item.setCustomName('§cGraph maker');
  e.item.setLore([
    '§7This item will create graphs with nodes',
    "§7Each node by default is Player's position",
    '§7To create a Node just §bRightClick',
    '§7Once node is created you create edges for it.',
    "§7If Node has no edges or you've finished adding them just §bLeftClick",
    '§7When Node-Queue reaches §l0§7 it will save graph to worlddata!',
  ]);
}

function attack(e) {
  if (e.player.isSneaking()) {
    return;
  }
  var gkeys = Object.keys(graph['graph']);
  if (gkeys.length == 0) {
    return e.player.message('[§cNode§f] §7Graph has no nodes!');
  }
  if (queue.length > 0) {
    queue.shift();
    e.player.message('[§cNode§f] §7Queue length: §b' + queue.length);
    var pos = queue[0].value.split(' ');
    e.player.setPosition(pos[0], pos[1], pos[2]);
    e.player.message('[§cNode§f] §7Now add Edges to this node!');
  } else {
    e.player.message('[§cNode§f] §7No more nodes in queue! Saving graph...');
    var wdata = e.player.world.getStoreddata();
    var gg = wdata.get('paths');
    if (gg) {
      gg = JSON.parse(gg);
    } else {
      gg = { nr: 0 };
    }
    gg[gg.nr] = graph['graph'];
    gg.nr++;
    wdata.put('paths', JSON.stringify(gg));
    e.player.message('[§cNode§f] §7Saved graph as: ' + (gg.nr - 1));
    graph = new Graph();
    e.player.message('[§cNode§f] §7Now you can create a new graph!');
  }
}

function interact(e) {
  if (e.player.isSneaking()) {
    return;
  }
  var pos = e.player.getPos();
  pos = pos.getX() + ' ' + pos.getY() + ' ' + pos.getZ();

  if (queue.length == 0) {
    var n = new Node(pos);
    graph.addNode(n);
    queue.push(n);
    e.player.message(
      '[§cNode§f] §7Created new Node! Now Right-click to add an edge.'
    );
  } else {
    var n = graph.getNode(pos);
    if (n == undefined) {
      n = new Node(pos);
      graph.addNode(n);
      queue.push(n);
      queue[0].addEdge(n);
      e.player.message(
        '[§cNode§f] §7Added new node, edge of ' +
          queue[0].value +
          ', Queue length: §b' +
          queue.length
      );
    } else {
      if (queue[0].edges.indexOf(pos) > -1) {
        e.player.message('[§cNode§f] §7Edge is connected!');
      } else {
        n.addEdge(queue[0]);
        e.player.message('[§cNode§f] §7Connected Existing Node!');
      }
    }
  }
}
