function searchGraph(graph, s, e) {
  var start = graph.setStart(s);
  var end = graph.setEnd(e);

  var queue = [];
  var path = [];
  queue.push(start);

  while (queue.length > 0) {
    var current = queue.shift();
    current.searched = true;
    if (current == end) {
      path.push(end);
      break;
    }
    var edges = current.edges;
    for (var i = 0; i < edges.length; i++) {
      var n = graph['graph'][edges[i]];
      if (n.searched == false) {
        n.searched = true;
        n.parent = current;
        queue.push(n);
      }
    }
  }

  var next = end.parent;
  end.parent = null;
  while (next != null) {
    var x = next.parent;
    next.parent = null;
    path.push(next);
    next = x;
  }

  return path.reverse();
}
