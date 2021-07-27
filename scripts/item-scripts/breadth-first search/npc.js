//script inteded for IScriptedItem (essential scripts: graph.js, search.js)
var path;

//nr = number of your graph
var nr=1;

function init(e){
    var wdata = e.npc.world.getStoreddata();
    var graphs = wdata.get('paths');
    graphs?graphs=JSON.parse(graphs):graphs={ nr: 0 };

    var main = new Graph();
    main['graph'] = graphs[2];

    var pos = e.npc.getPos();
    pos = pos.getX()+" "+pos.getY()+" "+pos.getZ();

    var keys = Object.keys(main['graph']);
    var x = Math.floor(Math.random()*keys.length);
    while(keys[x]==pos){
        x = Math.floor(Math.random()*keys.length);
    }

    path = searchGraph(main, pos, keys[x]);
    main.reset();

}


function interact(e){
    //you can just put this part where you want npc to move f.e. Timer 
    var p = path[nr].value.split(" ");
    e.npc.setPosition(p[0], p[1], p[2]);
    if(nr+1==path.length){
        nr=0;
    }else{
        nr++;
    }
}