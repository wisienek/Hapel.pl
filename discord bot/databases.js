const mysql = require('mysql2');
const mysqlp = require('mysql2/promise');
const net = require('net');
// const socks = require("socks5-client");
// const socksConn = socks.createConnection({ host: "47.75.90.57", port: "80" });

require('dotenv').config();

const hplOptions = {
    host: "195.78.66.161",
    port: 3306,
    user: "em411_cnpc",
    password: process.env.dbpasshpl,
    database: "em411_cnpc",
    waitForConnections: true,
    stream: function(o){
        let socket = net.connect(o.config.port, o.config.host);
        socket.setKeepAlive(true);
        return socket;
    }
}

const hpl2Options = {
    host: "51.75.39.130",
    port: 3306,
    user: "446422",
    password: process.env.dbpasshpl2,
    database: "446422_luckperms",
    waitForConnections: true,
    stream: function(o){
        let socket = net.connect(o.config.port, o.config.host);
        socket.setKeepAlive(true);
        return socket;
    }
}


const hplcon =  mysql.createPool( hplOptions    );
const hplcon2 = mysql.createPool( hpl2Options   );

const p_hplcon =  mysqlp.createPool( hplOptions );
const p_hplcon2 = mysqlp.createPool( hpl2Options);

module.exports = { hplcon, p_hplcon, hplcon2, p_hplcon2 };