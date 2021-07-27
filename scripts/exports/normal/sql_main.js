//function interact(e){
//    if(e.player.isSneaking()){return}
//    
//    testQ(e);
//}
/*
*/


var conn = Java.type("java.sql.Connection");
var DriverManager = Java.type("java.sql.DriverManager");
var slqe = Java.type("java.sql.SQLException");
var urlp = "jdbc:mysql://195.78.66.161:3306/em411_cnpc";

/*
    requires:
    - str mani

    todo:
    - Shorten add, remove, update
*/

//elki
function addEliksir(nazwa, kolor, hex, zapach, smak, dataW, czasD, inokreacja, pcena, ile){
    if(!nazwa || !kolor || !hex || !zapach || !smak || !dataW || !czasD || !inokreacja)
        return { error: "Bad argument! nazwa, args {nazwa: varchar 80, kolor: varchar 45, hex: varchar 10, zapach,smak: varchar 120, czas: varchar 45, inokreacja: varchar 256, pcena: int 10, ile: int10}"};
    
    var query = 'INSERT INTO Eliksiry (nazwa, kolor, hex, zapach, smak, data, czas, inokreacja'+(pcena? ', pcena': '')+' '+(ile? ', "'+ile+'"': '')+') VALUES ("'+nazwa+'", "'+kolor+'", "'+hex+'", "'+zapach+'", "'+smak+'", "'+dataW+'", "'+czasD+'", "'+inokreacja+'" '+(pcena? ', "'+pcena+'"': '')+' '+(ile? ', "'+ile+'"': '')+'); ';

    return sqlPut(query);
}

function updateEliksir(nazwa, args){
    if(typeof args != "object" || Object.keys(args).length == 0)
        return {error: "Bad argument! nazwa, args {nazwa: varchar 80, kolor: varchar 45, hex: varchar 10, zapach,smak: varchar 120, czas: varchar 45, inokreacja: varchar 256, pcena: int 10, ile: tinyInt (4)}"};
    
    var keys = Object.keys(args);
    var query = 'UPDATE Eliksiry SET ';
    for(var i=0; i < keys.length; i++){
        query += keys[i]+' = "'+ escapeString(args[ keys[i] ]) + '"';
        if(i != keys.length-1) {query+=", "}
    }
    query += 'WHERE nazwa="'+ escapeString(nazwa) +'";';
    return sqlPut(query);
}

function getEliksir(args){
    var query = "SELECT * FROM Eliksiry ";
    
    if(args){
        if(args.nazwa){
            query += "WHERE nazwa='"+ escapeString(args.nazwa) +"' ";
        }else if(args.nazwal){
            query += "WHERE nazwa LIKE '%"+ escapeString(args.nazwal) +"%' ";
        }
    }
    query += "ORDER BY nazwa ASC;";

    return sqlGet(query);
}

function removeEliksir(nazwa){
    if(!nazwa)
        return { error: "No arguments: nazwa (varchar)"};
    
    var query = "DELETE FROM Eliksiry WHERE nazwa='"+ escapeString(nazwa) +"'; ";
    return sqlPut(query);
}

//składniki
function addSkladnik(nazwa, typ, cena, ilosc, jednostka, dostępny){
    if(!nazwa || !typ || !cena || !ilosc || !jednostka)
        return {error: "bad argument! nazwa (varchar 80), typ (varchar 45), cena (float), ilosc (int 11), jednostka (varchar 10), dostępny (bool)"};

    dostępny = dostępny || 1;

    var query = 'INSERT INTO Składniki (nazwa, typ, cena, ilosc, jednostka, dostępny) VALUES ("'+escapeString(nazwa)+'", "'+typ+'", "'+cena+'", "'+ilosc+'", "'+jednostka+'", "'+dostępny+'"); ';

    return sqlPut(query);
}

function updateSkladnik(nazwa, args){
    if(typeof args != "object" || Object.keys(args).length == 0)
        return { error: "No arguments! {nazwa, typ, jednostka: string | cena: float, ilosc: int, dostępny: boolean}"}
    
    var keys = Object.keys(args);
    var query = 'UPDATE Składniki SET ';
    for(var i=0; i<keys.length; i++){
        query += keys[i]+' = "'+ escapeString(args[ keys[i] ]) + '" ';
        if(i != keys.length-1) {query+=", "}
    }
    query += 'WHERE nazwa="'+nazwa+'";';

    return sqlPut(query);
}

function removeSkladnik(nazwa){
    if(!nazwa)
        return { error: "No arguments: nazwa (varchar)"};
    
    var query = "DELETE FROM Składniki WHERE nazwa='"+ escapeString(nazwa) +"'; ";
    return sqlPut(query);
}

function getSkladnik(args){
    var query = "SELECT * FROM Składniki ";

    if(args){
        if(args.typ){ query += 'WHERE typ="'+args.typ+'" '; }else 
        if(args.nazwa){ query += "WHERE nazwa LIKE '%"+ escapeString(args.nazwa) +"%' "; }
    }

    query += "ORDER BY nazwa ASC;"

    return sqlGet(query);
}

// oczekujące elki

function getOczekujace(args){
    var query = "SELECT * FROM Oczekujące ";

    if(args){
        query += "WHERE ";
        var x = [];
        //{ gracz: e.player.getName(), weryfikowane: wer, odebrane: 0 }
        if(args.gracz)       { x.push('gracz="'+escapeString(args.gracz)+'" ');                 }
        if(args.discord)     { x.push('discord="'+args.discord+'" ');                           }
        if(args.eliksir)     { x.push("eliksir LIKE '%"+escapeString(args.eliksir)+"%' ");      }
        if(args.cena)        { x.push("cena > "+args.cena+" ");                                 }
        if(args.id)          { x.push('id="'+args.id+'" ');                                     }
        if(args.weryfikowane || args.weryfikowane == false){ x.push('weryfikowane='+args.weryfikowane+' '); }
        if(args.odebrane == true || args.odebrane == false){ x.push('odebrane = '+args.odebrane+' ');}
        
        query += x.join("AND ");
    }

    query += "ORDER BY cena ASC;"

    return sqlGet(query);
}
function updateOczekujace(id, args){
    if(!id || !args)
        return { error: "Arguments; id<varchar>, args{ odebrane (0/1), weryfikowane(3- czeka, 1- ok, 2- odrzucone) }" }
    
    var x = [];
    var query = 'UPDATE Oczekujące SET ';
    if(args.odebrane || args.odebrane == false){ x.push('odebrane = '+args.odebrane+' '); }
    if(args.data_odebrania){ x.push('data_odebrania="'+args.data_odebrania+'" ');}
    if(args.weryfikowane){ x.push('weryfikowane = '+args.weryfikowane+' '); }
    if(args.ile)         { x.push('pile = '+args.ile+' '); }
    if(args.data)        { x.push('pdata = "'+args.data+'" '); }

    query += x.join(', ');
    query += 'WHERE id="'+id+'"; ';

    return sqlPut(query);
}

function addOczekujace(id, eliksir, gracz, uuid, discord, przepis, cena, kociolek){
    if(!id || !eliksir || !gracz || !uuid || !przepis)
        return { error: "Złe argumenty!" }
    
    var args = ["id, eliksir, gracz, uuid, przepis", 
                '"'+id+'", "'+eliksir+'", "'+gracz+'", "'+uuid+'", "'+ przepis +'"'];
    if(discord) { args[0] += ", discord"; args[1] += ', "'+discord+'"'; }
    if(cena)    { args[0] += ", cena";    args[1] += ', "'+cena+'"'; }
    if(kociolek){ args[0] += ", kociołek"; args[1] += ', "'+kociolek+'"';}

    var query = 'INSERT INTO Oczekujące ('+args[0]+') VALUES ('+args[1]+'); ';

    return sqlPut(query);
}

function removeOczekujace(id){
    if(!id)
        return { error: "No arguments: id (varchar)"};
    
    var query = "DELETE FROM Oczekujące WHERE id='"+id+"'; ";
    return sqlPut(query);
}
// zlane elki

function addZlane(id, jsonString, data){
    if(!id || !jsonString ){ 
        return { error: "bad argument! (nazwa, json, data)"};
    }
    data = data || Date.now();

    return sqlPut('INSERT INTO Zlane (id, json, data) VALUES ("'+id+'", "'+ jsonString +'", "'+data+'"); ');
}

function getZlane(id){
    var query = "SELECT * FROM Zlane ";
    if(id) { query += "WHERE id='"+id+"';"; }
    return sqlGet(query);
}

//Przepisy
function updatePrzepis(id, args){
    if(!id || !args || typeof args != "object"){ return { error: "Bad arguments: (id, {...args})" } }
    var query = "UPDATE przepisy SET ";
    var keys = Object.keys(args);
    if(keys.length==0){ return { error: "Not enough arguments! {autor: playerName, eliksir: eliksirName, item: itemNBT, oceny: {ocena: int<1;5>, opis: string}, ocena: avg(oceny.ocena), cena: int }" } }
    var v = [];
    for(var i=0; i<keys.length; i++){
        v.push( keys[i]+" = '"+ args[ keys[i] ]+"' " );
    }
    v= v.join(", ");
    query += v+" WHERE id='"+id+"'; ";
    
    return sqlPut(query);
}

function addPrzepis(args){
    if(typeof args != "object"){ return { error: "Argument has to be an object! {item: itemNBT, autor: playerName, cena: int, eliksir: potionName }" } }
    if(!args.item || !args.autor || !args.cena || !args.eliksir){
        return { error: "Bad arguments!" };
    }
    var keys = Object.keys(args);
    var vals = '';
    for(var i=0; i<keys.length; i++){
        if(i != 0 && i != keys.length){ vals += ", " }
        vals += ' "'+ args[ keys[i] ]+'" ';
    }
    var query = "INSERT INTO przepisy("+keys.join(", ")+") VALUES ("+vals+");";

    return sqlPut(query);
}

function removePrzepis(id){
    if(!id){ return { error: "No id!" } }
    var query = "DELETE FROM przepisy WHERE id='"+id+"';";

    return sqlPut(query);
}

function getPrzepis(args){
    var query = "SELECT * FROM przepisy ";
    
    var opt = [];
    if(args && args.id)     { opt.push( "id='"+args.id+"' " );           }
    if(args && args.eliksir){ opt.push( "eliksir='"+args.eliksir+"' " ); }
    if(args && args.autor  ){ opt.push( "autor='"+args.autor+"' "     ); }
    if(args && args.item   ){ opt.push( "item='"+args.item+"' " );       }
    if(args && opt.length > 0){
        opt = opt.join(" AND ");

        query += "WHERE "+opt+" ";
    }
    query += "ORDER BY ocena DESC, cena ASC, eliksir ASC;";

    return sqlGet(query);
}

// cennik

function updateCennik(id, args){
    if(!id || !args || typeof args != "object"){ return { error: "Bad arguments: (id, {...args})" } }
    var query = "UPDATE cennik SET ";
    var keys = Object.keys(args);
    if(keys.length==0){ return { error: "Not enough arguments! {item: itemNBT, nazwa: varchar(120), cena: int >= 0, dostępne: boolean, sale: int <0;100>, monly: boolean, msale: int <0;100> }" } }
    var v = [];
    for(var i=0; i<keys.length; i++){
        v.push( keys[i]+" = '"+ args[ keys[i] ]+"' " );
    }
    v= v.join(", ");
    query += v+" WHERE id='"+id+"'; ";
    
    return sqlPut(query);
}

function addCennik(args){
    if(typeof args != "object"){ return { error: "Argument has to be an object! {item: itemNBT, nazwa: varchar(120), cena: int >= 0, dostępne: boolean, sale: int <0;100>, monly: boolean, msale: int <0;100> }" } }
    var keys = Object.keys(args);
    var vals = '';
    for(var i=0; i<keys.length; i++){
        if(i != 0 && i != keys.length){ vals += ", " }
        vals += ' "'+ args[ keys[i] ]+'" ';
    }
    var query = "INSERT INTO cennik("+keys.join(", ")+") VALUES ("+vals+");";

    return sqlPut(query);
}

function getCennik(args){
    var query = "SELECT * FROM cennik ";
    
    var opt = [];
    if(args.id      ){ opt.push( "id='"+args.id+"' " );            }
    if(args.nazwa   ){ opt.push( "nazwa='"+args.nazwa+"' " );      }
    if(args.cena    ){ opt.push( "cena "+args.cena+" "     );      }
    if(args.sale    ){ opt.push( "sale >= '"+args.dostępne+"' " ); }
    if(args.msale   ){ opt.push( "msale >= '"+args.msale+"' " );   }
    if(args.tagi    ){ opt.push( "tagi LIKE '%"+args.tagi+"%' " ); }
    if(args.autor   ){ opt.push( "autor='"+args.autor+"' ");       }
    if(args.monly || args.monly == false){ opt.push( "monly='"+args.monly+"' " );      }
    if(args.dostępne || args.dostępne == false){ opt.push( "dostępne='"+args.dostępne+"' " );}
    if(args && Object.keys(args).indexOf("wer")>-1){ opt.push( "wer='"+args.wer+"' " );}
    if(args && opt.length > 0){
        opt = opt.join(" AND ");

        query += "WHERE "+opt+" ";
    }
    query += "ORDER BY cena ASC, sale DESC, msale DESC, monly ASC;";

    return sqlGet(query);
}

function removeCennik(id){
    if(!id){ return { error: "No id!" } }
    var query = "DELETE FROM cennik WHERE id='"+id+"';";

    return sqlPut(query);
}

// Plecaki 
function getBag(id)
{
    var query = "SELECT * FROM main";
    if(id) { query += " WHERE id='"+id+"';"; }
    var result = sqlGet(query);
    id? result = result.result[0] : result = result.result;
    return result;
}

function getTop()
{
    var result = sqlGet("SELECT id FROM main ORDER BY id DESC LIMIT 1;");
    
    result = result.result[0].id || 0;

    return result;
}

function saveBag(uuid, nazwa, itemy, id)
{
    if(!id){ 
        id = getTop();
    }
    return sqlPut('INSERT INTO main(id, uuid, nazwa, itemy, aktualizacja) VALUES('+id+', \''+uuid+'\', \''+nazwa+'\', \''+itemy+'\', '+(Date.now())+');');
}

function updateBag(itemy, id){
    if(!id){ 
        return "No id!";
    }

    return sqlPut('UPDATE main SET itemy = \''+itemy+'\', aktualizacja = '+(Date.now())+' WHERE id = '+id+';');
}

function updateName(id, name, uid){
    if(!id){ 
        return "No id!";
    }

    return sqlPut('UPDATE main SET nazwa = \''+name+'\', uuid = \''+uid+'\' WHERE id = '+id+';');
}

function saveBagCopy(id){
    if(!id){ 
        return;
    }
    var result = true;
    var conn = null;
    try
    {
        var current = getBag(id);
        if(!current){ return "Nie ma w bazie!"}

        conn = DriverManager.getConnection(urlp, passes.sql_main.login, passes.sql_main.pwd);
        var query = 'INSERT INTO kopie (id, uuid, nazwa, itemy, data) VALUES('+id+', \"'+current.uuid+'\", \"'+current.nazwa+'\", (SELECT itemy FROM main WHERE id="'+id+'"), '+current.aktualizacja+');';
        var st = conn.createStatement();
        var rs = st.executeUpdate(query);

        st.close();
    }
    catch (e) { print(e); result = false; }
    finally { if (conn != null) { try { conn.close(); } catch (e) { /* ignore close errors */ } } }
    
    return result;
}

function restoreBag(id, data){
    if(!id || !data) return { error: "no id or date" }

    var querry = "UPDATE main SET itemy = (SELECT itemy FROM kopie WHERE id='"+id+"' AND data='"+data+"'), aktualizacja='"+Date.now()+"' WHERE serial= (SELECT serial FROM main WHERE id='"+id+"'); ";
    return sqlPut(querry);
}

function getCopiedBagIds(){
    var conn = null;
    var result = [];

    try
    {
        conn = DriverManager.getConnection(urlp, passes.sql_main.login, passes.sql_main.pwd);

        var query = "SELECT id, data FROM kopie;";
        var st = conn.createStatement();
        var rs = st.executeQuery(query);

        while (rs.next())
        {
            var id = rs.getInt("id");
            var data = rs.getLong("data");
            
            result.push({id:id, data:data});
        }
        st.close();
    }
    catch (e) { print(e); }
    finally { if (conn != null) { try { conn.close(); } catch (e) { } } }
    
    return result;
}

function getBagCopies(id){
    if(!id){
        return "Brak id!";
    }
    var conn = null;
    var result = [];

    try
    {
        conn = DriverManager.getConnection(urlp, passes.sql_main.login, passes.sql_main.pwd);

        var query = "SELECT * FROM kopie where id="+id;
        var st = conn.createStatement();
        var rs = st.executeQuery(query);

        while ( rs.next() )
        {
            var id = rs.getInt("id");
            var uuid = rs.getString("uuid");
            var nazwa = rs.getString("nazwa");
            var itemy = rs.getString("itemy");
            var data = rs.getLong("data");
            
            result.push({
                id: id,
                uuid: uuid,
                nazwa: nazwa,
                itemy: JSON.parse(itemy),
                data: data
            });
        }
        st.close();
    }
    catch (e) { print(e); }
    finally { if (conn != null) { try { conn.close(); } catch (e) { } } }
    
    return result;
}


function sqlGet(query){
    if(!query){ return { error: "No querry!" } }
    var conn = null;
    var result = {};

    try
    {
        conn = DriverManager.getConnection(urlp, passes.sql_main.login, passes.sql_main.pwd);

        var st = conn.createStatement();
        var rs = st.executeQuery(query);

        result.result = rsToJson(rs);

        st.close();
    }
    catch (e) { result.error = e; }
    finally { if (conn != null) { try { conn.close(); } catch (e) { } } }
    
    return result;
}

function sqlPut(query){
    if(!query){ return { error: "No querry!" } }
    var conn = null;
    var result = {};
    try
    {
        conn = DriverManager.getConnection(urlp, passes.sql_main.login, passes.sql_main.pwd);
        var st = conn.createStatement();
        var rs = st.executeUpdate(query);

        result.result = true;

        st.close();
    }
    catch (e) { result.error = e; }
    finally { if (conn != null) { try { conn.close(); } catch (e) {  } } }
    
    return result;
}


function rsToJson(rs){
    var arr = []
    var rsmd = rs.getMetaData(); // ResultSetMetaData
    var columnCount = rsmd.getColumnCount();
    while(rs.next())
    {
        var jsonObject = {};
        for (var index = 1; index <= columnCount; index++) 
        {
            var column = rsmd.getColumnName(index);
            var value = rs.getObject(column);
            if (value == null) 
            {
                jsonObject[column] = "";
            } else {
                jsonObject[column] = value;
                //throw new IllegalArgumentException("Unmappable object type: " + value.getClass());
            }
        }
        arr.push(jsonObject);
    }
    return arr;
}