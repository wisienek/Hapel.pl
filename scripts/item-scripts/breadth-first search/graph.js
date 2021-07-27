function Graph(){
    this.graph = {};
    this.end = null;
    this.start = null;
}

Graph.prototype.reset = function(){
    var keys = Object.keys(this.graph);
    for( var i = 0; i < keys.length; i++){
        this.graph[keys[i]].searched = false;
        this.graph[keys[i]].parent = null;
    }
}

Graph.prototype.setStart = function(x){
    this.start = this.graph[x];
    return this.start;
}

Graph.prototype.setEnd = function(x){
    this.end = this.graph[x];
    return this.end;
}

Graph.prototype.addNode = function(n){
    this.graph[n.value] = n;
}

Graph.prototype.getNode = function(x){
    var n = this.graph[x];
    return n;
}