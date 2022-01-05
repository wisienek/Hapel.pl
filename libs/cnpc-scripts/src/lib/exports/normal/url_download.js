var Inputbuffer = Java.type("java.io.BufferedInputStream");
var out = Java.type("java.io.FileOutputStream");
var ioex = Java.type("java.io.IOException");
var JURL = Java.type("java.net.URL");
var Channels = Java.type("java.nio.channels.Channels");
var rbc = Java.type("java.nio.channels.ReadableByteChannel");
var byte = Java.type("java.lang.Byte");
var Long = Java.type("java.lang.Long");

function JavaDownloadFileFromURL(turl, path, player, name, typ) {
    /*
        turl : direct url <string>
        path : direct/relational path <string / Path type>
        player : object <IPlayer -> IEntity>
        name : file name with extension <string>
    */
   typ = typ || "nio";
    if(!turl || !path || !player){return}
    var url = turl;
    if(!name){
        name = (turl.split("/").pop());
    }
    
    try {
        var xpath = path + name;
        typ == "nio"? downloadUsingNIO(url, xpath): downloadUsingStream(url, xpath) ;

        player.message("[§cInfo§f] §7 ☛ Done downloading. Path: §c"+path+"§a"+name+"§7 ☚");
    } catch (e) {
        player.message("[§cInfo§f] §7 ☛ Cought an error: "+e+" ☚");
        print(e);
    }

    function downloadUsingStream(urlStr, file){
        var url = new JURL(urlStr);
        var bis = new Inputbuffer(url.openStream());
        var fis = new out(file);
        var buffer = new byte(1024);
        var count=0;
        while((count = bis.read(buffer,0,1024)) != -1)
        {
            fis.write(buffer, 0, count);
        }
        fis.close();
        bis.close();
    }

    function downloadUsingNIO(urlStr,file) {
        var url = new JURL(urlStr);
        var rbc1 = Channels.newChannel(url.openStream());
        var fos = new out(file);
        fos.getChannel().transferFrom(rbc1, 0, Long.MAX_VALUE);
        fos.close();
        rbc1.close();
    }

}