function interact(e){
    if(e.player.isSneaking()){return}


    var bags = getBags();
    if(bags.length>0){
        var test = popraw(escapeString(bags[0].itemy.replace(/    /g,"").replace(/\n/g,"")), bags[0].id);
        if(!test){return e.player.message("Coś poszło nie tak na pierwszym!")}
        for(var i=1; i<bags.length; i++){
            var t = popraw(escapeString(bags[i].itemy.replace(/    /g,"").replace(/\n/g,"")), bags[i].id);
            if(!t){
                return e.player.message("Błąd na: "+i);
            }
        }
        return e.player.message("Wszystko ok, poprawione!");
    }else{
        return e.player.message("No bags!");
    }
}

var conn = Java.type("java.sql.Connection");
var DriverManager = Java.type("java.sql.DriverManager");
var slqe = Java.type("java.sql.SQLException");
var urlp = "jdbc:mysql://195.78.66.161:3306/em411_cnpc";
var login = "em411_cnpc";
var password = "3^xg'X3+J5em";

function getBags(id)
{
    var conn = null;
    var result = [];

    try
    {
        conn = DriverManager.getConnection(urlp, login, password);

        var query = "SELECT * FROM main";
        if(id) { query += " WHERE id="+id+";"; }
        var st = conn.createStatement();
        var rs = st.executeQuery(query);

        while (rs.next())
        {
            var id = rs.getInt("id");
            var uuid = rs.getString("uuid");
            var nazwa = rs.getString("nazwa");
            var itemy = rs.getString("itemy");
            var aktualizacja = rs.getLong("aktualizacja");
            
            result.push({
                id: id,
                uuid: uuid,
                nazwa: nazwa,
                itemy: itemy,
                aktualizacja: aktualizacja
            });
        }
        st.close();
    }
    catch (e) { print(e); }
    finally { if (conn != null) { try { conn.close(); } catch (e) { } } }
    
    return result;
}

function popraw(itemy, id)
{
    if(!id){ 
        id = getTop();
    }
    var result = true;
    var conn = null;
    var aktualizacja = Date.now();
    try
    {
        conn = DriverManager.getConnection(urlp, login, password);
        var query = 'UPDATE main SET itemy=\''+itemy+'\' WHERE id = \''+id+'\' ;';
        var st = conn.createStatement();
        var rs = st.executeUpdate(query);

        st.close();
    }
    catch (e) { print(e); result = false; }
    finally { if (conn != null) { try { conn.close(); } catch (e) { /* ignore close errors */ } } }
    
    return result;
}

function escapeString(str){
    if (typeof str != 'string')
        return str;

    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\%":
                return "\\\\\%"
            case "\"":
            case "'":
            case "\\":
                return "\\"+char;                 
        }
    });
}