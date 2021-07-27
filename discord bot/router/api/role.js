require('dotenv').config();
const express = require('express');
const roleRouter = express.Router();
const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true, ws: { intents: new Discord.Intents(Discord.Intents.NON_PRIVILEGED).add('GUILD_MEMBERS') } });
bot.login(process.env.TOKEN1);

const { p_hplcon, p_hplcon2, hplcon } = require('../../databases');
const { log } = require('./dclog');



roleRouter.route(`/getConnected`)
.get( async (req, res) => {
    const { name, id } = req.query;

    let [ role,, err ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.roles ${name || id? "WHERE ": ""}${name? `name='${name}'`:""}${id? name? `OR dcid='${id}'`: `dcid='${id}'`: ""} ORDER BY id DESC;`);
    if( err ){
        console.error(`getConnected error: ${err}`);
        return res.status(502).send({ type: "danger", error: "Coś poszło nie tak przy fetchowaniu roli!" });
    }
    if( !role || role.length == 0 )
        return res.status(404).send({ error: "warning", error: "Brak wyników do wyświetlenia!" });

    const roleNames = role.map(r=> `name='${r.name}'`).join(" OR ");

    let [ autoRole,, err1 ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.autoRoles WHERE ${roleNames}; `);
    if( err1 ){
        console.error(`getAutorole error: ${err1}`);
        return res.status(502).send({ type: "danger", error: "Coś poszło nie tak przy fetchowaniu AutoRoli!" });
    }

    let [ perms,, err2 ] = await p_hplcon2.query(`SELECT name,permission FROM 446422_luckperms.luckperms_group_permissions WHERE ${roleNames}; `);
    if( err2 ){
        console.error(`getAutorole error: ${err2}`);
        return res.status(502).send({ type: "danger", error: "Coś poszło nie tak przy fetchowaniu permissi!" });
    }

        
    return res.status(200).send({ role, autoRole, perms, type: 'success', message: "Załadowano dane!" });
});

roleRouter.route('/edit')
.post( async (req, res) => {
    let { 
        dname, name, parent, permissions, weight,
        addrole, 
        canapply, free, newdc, resign,
        dccolor, dcdisplayname, dcpermissions 
    } = req.body.params;

    const user = req.user || req.body.params.user;

    try{

        if( !( name || user ) )
            return res.status(400).send({ error: "Brak danych!", type: "danger" });

        let [ role,, er ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.roles WHERE name='${name}'; `);
        let [ auto,, er1 ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.autoRoles WHERE name='${name}'; `);
        
        




    }
    catch(er){
        console.log("Cought error editrole post: " + er);
        return res.status(500).send({ type: "danger", error: er });
    }
});

roleRouter.route("/nowy")
.post( async (req, res) => {
    let { 
            dname, name, parent, permissions, resign, weight,
            addrole, 
            canapply, free, newdc,
            dccolor, dcdisplayname, dcpermissions 
        } = req.body.params;
    
    const user = req.user || req.body.params.user;


    try{    
        if( !user ){
            console.log("Brak użytkownika");
            return res.status(403).send({ type: "danger", error: "Brak użytkownika" });
        }
        if( !req.body.params || Object.keys(req.body.params).length == 0 ){
            console.log("Złe parametry");
            return res.status(400).send({ type: "danger", error: "Brak danych!" });
        }
        
        const guild = await bot.guilds.fetch("583031361145667705", true, true);
        const gosc  = await guild.members.fetch( user.discord, true, true );

        if( !gosc ){
            console.error("Brak gościa na HIC!");
            return res.status(403).send({ type: "danger", error: "Nie można było znaleźć konta na discordzie HIC." });
        }
        if( !gosc.hasPermission("KICK_MEMBERS") ){
            console.error("Brak permissi na HIC!");
            return res.status(403).send({ type: "danger", error: "Brak permissi na HIC!" });
        }

        const [ roles,, err ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.roles WHERE name='${name}';`);
        if( err ){
            console.error("db1 error: " + err);
            return res.status(503).send({ type: "danger", error: "Błąd w zapytaniu 1. DB!" });
        }
        if( roles && roles.length > 0 ){
            console.log(`Gracz ${gosc.displayName} próbował stworzyć rolę ${name}, ale już taka istnieje.`);
            return res.status(200).send({ type: "warning", error: "Jest już taka rola!" });
        }
            
        // stwórz rolę na discordzie
        let newRoleID;
        if( newdc === true ){
            if( guild.roles.cache.some(r=> r.name == dcdisplayname ) ){
                const role = guild.roles.cache.find(r=> r.name == dcdisplayname );
                newRoleID = role.id;
                dccolor = role.hexColor;
                dcpermissions = role.permissions.bitfield;
            }else{
                const newRole = await guild.roles.create({
                    data: {
                        name: dcdisplayname,
                        color: dccolor,
                        permissions: dcpermissions,
                        mentionable: true
                    },
                    reason: `[WEB] Auto tworzenie roli ${ user.discord }`
                });
                
                newRoleID = newRole.id;
                console.info(`Stworzono nową rolę na HIC: ${dcdisplayname}!`);
            }
        }else{
            if( guild.roles.cache.some(r=> r.name == dcdisplayname ) ){
                const role = guild.roles.cache.find(r=> r.name == dcdisplayname );
                newRoleID = role.id;
                dccolor = role.hexColor;
                dcpermissions = role.permissions.bitfield;
            }
        }
        newRoleID = newRoleID || null;
        
        //sprawdź czy jest rola na serwerze
        let [ lpgroups,, error ] = await p_hplcon2.query(`SELECT * FROM 446422_luckperms.luckperms_groups WHERE name='${name}';`);
        if( error ){
            console.error( `Ładowania nazw lp_grp: ${error}` );
            return res.status(503).send({ type: "danger", error: "Coś poszło nie tak w sprawdzaniu grupy!" });
        }else{
            let [ autoRoles,, er1 ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.autoRoles WHERE name='${name}';`);
            if( er1 ){
                console.error(`Ładowanie autoról: ${er1}`);
                return res.status(503).send({ type: "danger", error: "Błąd przy wczytywaniu autoról!" });
            }

            let exRole = autoRoles.map(r=> r.dcid);
            let newRole = addrole.filter(role=> exRole.indexOf(role) == -1 ) || [];

            if( newRole.length > 0 ){
                let [ ,, er2 ] = await p_hplcon.query(`INSERT INTO em411_cnpc.autoRoles(name, dcid) VALUES ${newRole.map(r=> `('${name}', '${r}')`).join(", ")};`);
                if( er2 ){
                    console.error(`Ładowanie autoról: ${er2}`);
                    return res.send({ type: "danger", error: "Błąd przy wpisywaniu autoról!" });
                }
            }

            if( lpgroups && lpgroups.length > 0 ) {
                
                // console.info(`cnpc_roles fields -> name, displayname, creator, dcperms, dccolor, verified, canResign, canApply, isFree${parent? `, parent`: ""}${newRoleID? `, dcid`: ""}`)
                // console.log(`cnpc_roles -> '${name}', '${dname}', '${gosc.id}', '${dcpermissions}', '${dccolor}', '${1}', ${resign}, ${canapply}, ${free}, '${parent}', '${newRoleID}'`);
                let [ testResp,, err ] = await p_hplcon.query(`INSERT INTO em411_cnpc.roles(name, displayname, creator, dcperms, dccolor, verified, canResign, canApply, isFree${parent? `, parent`: ""}${newRoleID? `, dcid`: ""}) VALUES('${name}', '${dname}', '${gosc.id}', '${dcpermissions}', '${dccolor}', '${1}', ${resign}, ${canapply}, ${free}${parent? `, '${parent}'`: ""} ${newRoleID? `, '${newRoleID}'`: ""});`);
                if(err){
                    console.error(`wstawianie info do cnpc.roles: ${err}`);
                    return res.status(400).send({ type: "danger", error: "Błąd przy wstawianiu informacji do DB ról" });
                }
                console.info(`Stworzono nowe połączenie grupy ${name}`);
                // console.log(`testresp: ${JSON.stringify(testResp)}`);
    
                //sprawdź permissie czy wszystkie ok
                let [ gPerms,, err1 ] = await p_hplcon2.query(`SELECT permission FROM 446422_luckperms.luckperms_group_permissions where name='${name}';`);
                if( err1 ){
                    console.error(`Sprawdzanie prmissi: ${err1}`);
                    return res.status(500).send({ type: "danger", error: "Błąd przy sprawdzaniu permissi!" });
                }
            
                let experms = gPerms.map(r=> r.permission);
                
                if ( experms.filter(p=> ( p.indexOf("weight") > -1 || p.indexOf("displayname") > -1 ) ).length == 0 )
                    permissions = permissions.concat( [ `weight.${weight}`, `displayname.${name.charAt(0).toUpperCase()}${name.slice(1)}` ] );
                
                let newPerms = new Array( ...new Set(permissions.filter(perm=> experms.indexOf(perm) == -1 )) ) || [];
    
                if( newPerms.length > 0 ){
                    let [ ,,err2 ] = await p_hplcon2.query(`INSERT INTO 446422_luckperms.luckperms_group_permissions(name, permission, value, server, world, expiry, contexts) VALUES ${newPerms.map(p=>  `( '${name}', '${p}', 1, 'global', 'global', 0, '{}' )` ).join(", ") }`);
                    if( err2 ){
                        console.error(`Wstawianie permissi: ${err2}`);
                        return res.status(500).send({ type: "danger", error: "Błąd przy wstawianiu permissi!" });
                    }
                    
                    console.info(`Wstawiono permissie dla ${name}: ${newPerms}`);
                    log(`Utworzono rolę ${name}!\n\`\`\`* Autor: ${gosc.displayName}\n* Parent: ${parent} \n* Permissie: ${permissions.join(", ")} \`\`\` `);
    
                    return res.status(200).send({ type: "success", error: `Stworzono grupę ${name} z wszystkimi opcjami!` });
                }

                return res.status(200).send({ type: "success", error: `Stworzono grupę ${name} z wszystkimi opcjami!` });
            }else{
                //Stwórz grupę, dodaj permissię, dodaj info
                let [ ,,err ] = await p_hplcon2.query(`INSERT INTO 446422_luckperms.luckperms_groups(name) VALUES('${name}');`);
                if( err ){
                    console.error(`Dodawanie grupy do LP: ${err}`);
                    return res.status(500).send({ type: "danger", error: "Błąd przy dodawaniu grupy do serwera!" });
                }
                console.info(`Stworzono grupę serwerową ${name}!`);
    
                permissions = permissions.concat( [ `weight.${weight}`, `displayname.${name.charAt(0).toUpperCase()}${name.slice(1)}` ] );

                // console.info(`cnpc_roles fields -> name, displayname, creator, dcperms, dccolor, verified, canResign, canApply, isFree${parent? `, parent`: ""}${newRoleID? `, dcid`: ""}`)
                // console.log(`cnpc_roles -> '${name}', '${dname}', '${gosc.id}', '${dcpermissions}', '${dccolor}', '${1}', ${resign}, ${canapply}, ${free}, '${parent}', '${newRoleID}'`);
                let [ testResp,, err5 ] = await p_hplcon.query(`INSERT INTO em411_cnpc.roles(name, displayname, creator, dcperms, dccolor, verified, canResign, canApply, isFree${parent? `, parent`: ""}${newRoleID? `, dcid`: ""}) VALUES('${name}', '${dname}', '${gosc.id}', '${dcpermissions}', '${dccolor}', '${1}', ${resign}, ${canapply}, ${free}${parent? `, '${parent}'`: ""} ${newRoleID? `, '${newRoleID}'`: ""}); `);
                if( err5 ){
                    console.error(`wstawianie info do cnpc.roles: ${err5}`);
                    return res.status(503).send({ type: "danger", error: "Błąd przy wstawianiu informacji do DB ról" });
                }
                console.info(`Stworzono nowe połączenie grupy ${name}`);
                // console.log(`testresp: ${JSON.stringify(testResp)}`);


                if( permissions.length > 0 ){
                    let [ ,,err2 ] = await p_hplcon2.query(`INSERT INTO 446422_luckperms.luckperms_group_permissions(name, permission, value, server, world, expiry, contexts) VALUES ${permissions.map(p=>  `( '${name}', '${p}', 1, 'global', 'global', 0, '{}' )` ).join(", ") }`);
                    if( err2 ){
                        console.error(`Wstawianie permissi: ${err2}`);
                        return res.status(500).send({ type: "danger", error: "Błąd przy wstawianiu permissi!" });
                    }

                    console.info(`Wstawiono permissie dla ${name}: ${permissions}`);
                    log(`Utworzono rolę ${name}!\n\`\`\`* Autor: ${gosc.displayName}\n* Parent: ${parent} \n* Permissie: ${permissions.join(", ")} \`\`\` `);
    
                    return res.status(200).send({ type: "success", error: `Stworzono grupę ${name} z wszystkimi opcjami!` });
                }
                
                return res.status(200).send({ type: "success", error: `Stworzono grupę ${name} z wszystkimi opcjami!` });
            }
        }
    }
    catch(er){
        console.log("Cought error: " + er);
        return res.status(500).send({ type: "danger", error: er });
    }
});

roleRouter.route("/server")
.get( async (req, res) => {

    let [ rows,, er ] = await p_hplcon2.query(`SELECT * FROM 446422_luckperms.luckperms_groups;`);
    if( er ){
        console.error(er);
        return res.status(500).send({ type: "danger", error: "Błąd z bazą danych!"});
    }
    if( !rows || rows.length < 1 ){
        return res.status(502).send({ type: "danger", error: "Brak wyników w bazie!"});
    }

    let data = rows.map(w=> w.name) || [];

    return res.status(200).send({ data });
});

roleRouter.route("/discord")
.get( (req, res) => {
    try{
        bot.guilds.fetch("583031361145667705", true, true).then(guild=> {
            let roles = guild.roles.cache.map(r => {
                return {
                    id: r.id,
                    name: r.name,
                    color: r.hexColor,
                    permissions: r.permissions,
                    created: r.createdTimestamp,
                }
            });
            roles = roles.filter(r=> !r.managed);

            return res.status(200).send({ data: roles });
        })
        .catch(er=>{
            throw er;
        })
    }
    catch(er){
        console.error(er);

        res.status(504).send({ type: "danger", error: "Wystąpił błąd przy fetchowaniu ról discordowych!" })
    }
});



// get full info about role (connected)
const getConnectedRole = async ({ id, name }) => {
    try{
        if( !id && !name )
            throw { type: "danger", error: "No name or id!" };
    
    
        //poprawić
        let query = `SELECT * FROM em411_cnpc.roles WHERE ${id? id.map(r=> `id='${r}'`).join(" OR "): ""}`;
        
        let [ roles,, err] = await p_hplcon.query(query);
        if( err ){
            console.error( `Fetching connected roles: ${err}` );
            throw { type: "danger", error: "Errorr while fetching connected roles!" };
        }
        if( roles.length == 0 )
            throw { type: "danger", error: "No roles with name/id!" }

        roles = roles.map(async (r) => {
            const auto = await getAutoRoles( r.name );
            const permissions = await getRolePermission( r.name );
            if( auto.error )
                throw auto.error;
            if( permissions.error )
                throw permissions.error;
            
            return {...r, auto, permissions };
        });


        return roles;
    }
    catch( er ){
        return er;
    }
}

const getAutoRoles = async ( name ) => {
    if( !name )
        return { type: "danger", error: "No name in getAutoRoles()!" };

    const [ auto,, err ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.autoRoles WHERE name='${name}';`);
    if( err ){
        console.error( `Get AutoRoles error: ${err}` );
        return { type: "danger", error: `Error while fetching Autoroles!` };
    }

    return [...auto];
}

const getRolePermission = async ( name ) => {
    if( !name )
        return { type: "danger", error: "No name in getRolePermission()!" };

    const [ permissions,, err ] = await p_hplcon2.query(`SELECT permission FROM 446422_luckperms.luckperms_group_permissions where name='${name}';`);

    if( err ){
        console.error( `Get getRolePermission error: ${err}` );
        return { type: "danger", error: `Error while fetching role's permissions!` };
    }

    return permissions.map(p=> p.permission);
}
















module.exports = roleRouter;