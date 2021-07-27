function Node(value){
    this.value = value;
    this.edges = [];
    this.searched = false;
    this.parent = null;
}

Node.prototype.addEdge = function(ne){
    this.edges.push(ne.value);
    ne.edges.push(this.value);
}