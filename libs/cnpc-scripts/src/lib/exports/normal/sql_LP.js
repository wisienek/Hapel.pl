var conn = Java.type("java.sql.Connection");
var DriverManager = Java.type("java.sql.DriverManager");
var slqe = Java.type("java.sql.SQLException");
var urlp  = "jdbc:mysql://193.227.116.202:3306/u90213_server";

function testQ(e){
    try{
        var test = sqlGet("SHOW TABLES;");
        if(test.error){
            throw test.error;
        }
        print(JSON.stringify(test.result));

        e.player.message("OK");
    }
    catch(er){
        print("error "+er);
        e.player.message(er);
    }
}

function sqlGet(query){
    if(!query){ return { error: "No querry!" } }
    var conn = null;
    var result = {};

    try
    {
        conn = DriverManager.getConnection(urlp, passes.sql_lp.login, passes.sql_lp.pwd);

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
        conn = DriverManager.getConnection(urlp, passes.sql_lp.login, passes.sql_lp.pwd);
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