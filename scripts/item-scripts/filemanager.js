function interact(e){
    gui11(e);
}
function init(e){
    e.item.setTexture(94, "baubles:ring");
    e.item.setItemDamage(94);
}

function gui11(e, path, choose, lista1){
    var gui = baseGui(e);

    var path;
    if(!path){ path = "./" }
    if(!choose){ choose = "" }
    gui.addLabel(9,"§c§l"+path, 30, 0, 80, 20);

    if(!lista1){
        var files = listFilesInDir(path);
        var lista = [];
        for(var i=0; i<files.length; i++){
            var name = files[i].getName();
            if(files[i].isDirectory()){
                lista.push("§e"+name);
            }else
            if(name.indexOf(".json")>-1){
                lista.push("§c"+name);
            }else
            if(name.indexOf(".yml")>-1){
                lista.push("§d"+name);
            }else
            if(name.indexOf(".jar")>-1){
                lista.push("§2"+name);
            }else{
                lista.push(name);
            }
        }
        lista.sort();
        gui.addScroll(403, 10, 35, 240, 190, lista);
    }else{
        gui.addScroll(404, 10, 35, 240, 190, lista1);
    }

    gui.addLabel(121, ""+choose, 30, 15, 150, 20);

    gui.addButton(400, "§4X", 5, 230, 20, 20);
    gui.addButton(401, "§9<-", 210, 230, 20, 20);
    gui.addButton(402, "§9->", 230, 230, 20, 20);

    e.player.showCustomGui(gui);
    return gui;
}

function customGuiButton(e){
    switch(e.buttonId){
        case 402:{
            var pathl = e.gui.getComponent(9);
            var path = pathl.getText().replace("§c§l","").split("/");
            for(var i=0; i<path.length; i++){ if(path[i] == ""){ path.splice(i,1) }}
            var name = e.gui.getComponent(121).getText();
            if(name.indexOf("§e")>-1){
                path.push(name.replace("§e",""));
                path = path.join("/");
                return gui11(e, path);
            }else if(name.indexOf("§c")>-1){
                if(!name){ return e.player.message("[§cAdmin§f] §7Nie ma selekcji!") }
                path.push(name.replace("§c",""));

                try{
                    var plik = loadJsonFile(path.join("/"));
                    var keys = Object.keys(plik);
                    for(var i=0; i<keys.length; i++){
                        keys[i] = "§c"+keys[i]+" §a§l: §e"+JSON.stringify(plik[ keys[i] ]);
                    }
                    keys.sort();
    
                    return gui11(e, path.join("/"), false, keys);
                }
                catch(er){
                    return print(er);
                }
            }else if(name.indexOf("§d")>-1){
                //yml
            }
            return;
        }
    }
}

function customGuiScroll(e){
    switch(e.scrollId){
        case 403:{
            var path = e.gui.getComponent(9).getText().replace("§c§l","")
            return gui11(e, path, e.selection[0]); //.replace("§c","").replace("§d","").replace("§e","").replace("§2","")
        }
    }
}

function baseGui(e){
    var gui = e.API.createCustomGui(1, 256, 256, false);
    gui.setBackgroundTexture("customnpcs:textures/gui/elki_e.png");
    return gui;
}






//filemanager
function saveJsonFile(path, data){
    if(!path){return}
    if(!data){return false}
    resolveDir(path);
    var writer = new java.io.FileWriter(path);
    writer.write(JSON.stringify(data,null,2));
    writer.close();
    return true;
}

function deleteFiles(fileName){
    var file = new java.io.File(fileName);
    if(!file.exists()){return true}
	if(file.isDirectory()){
		if(file.list().length==0){
           file.delete();
           return true
		}else{
    	    var files = file.list();
    	    for (var i=0; i<files.length; i++) {
                var tempFile = files[i];
    	        var fileDelete = new java.io.File(file, tempFile);
    	        fileDelete.delete();
    	    }
    	    if(file.list().length==0){
       	        file.delete();
                return true;
            }
            return false
		}
	}else{
		file.delete();
        return true;
    }
}

function copyFileTo(file, to){
    var Files = Java.type("java.nio.file.Files");
    var f = new java.io.File(file);
    if(!f.exists()){ return false }
    if(f.isDirectory()){ return false }
    var t = new java.io.File(to);

    Files.copy(f.toPath(), t.toPath());

    return true;
}

function loadTextFile(path){
    if(!path){return}
    var f = new java.io.File(path);
    if(!f.exists() || !f.isFile()){ return false }
    var ips = new java.io.FileInputStream(path);
    var fileReader = new java.io.InputStreamReader(ips,"UTF-8");

    var data1=fileReader.read();
    var data;
    var start1="";
    while(data1!=-1) {    
        data =  String.fromCharCode(data1);   
        start1 = start1+data;
        data1 = fileReader.read();
    }
    ips.close();
    return start1;
}

function loadJsonFile(path){
    if(!path){return}
    var f = new java.io.File(path);
    if(!f.exists() || !f.isFile()){ return {} }
    var ips = new java.io.FileInputStream(path);
    var fileReader = new java.io.InputStreamReader(ips,"UTF-8");

    var data1=fileReader.read();
    var data;
    var start1="";
    while(data1!=-1) {    
        data =  String.fromCharCode(data1);   
        start1 += data;
        data1 = fileReader.read();
    }
    ips.close();
    if(start1.length==0){
        return {}
    }
    return JSON.parse(start1);
}

function resolveDir(path){
    path = path.split("/");
    path.pop();
    path = path.join("/");
    return dirCreator(path);
}

function listFilesInDir(path){
    if(!path){return}
    var f = new java.io.File(path);
    if(f.exists() && f.isDirectory()){
        var x = f.listFiles();
        return x;
    }
}

function listFoldersInDir(path){
    if(!path){return player.message("No path!")}
    var f = new java.io.File(path);
    if(f.exists() && f.isDirectory()){
        var x = f.listFiles();
        var y = [];
        for( var i=0; i<x.length; i++){
            if(x[i].isDirectory()){
                y.push(x[i]);
            }
        }
        return y;
    }
}

function dirCreator(path){
    if(!path){return}
    var f = new java.io.File(path);
    if(!f.exists()){
        f.mkdirs();
        print("Created Dir path: "+path);
        return true;
    }
    return false;
}