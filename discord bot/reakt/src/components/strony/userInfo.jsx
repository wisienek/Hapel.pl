import { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { Context } from "../user";
import { errorContext } from "../errorContext";
import { loadingContext } from "../LoadingContext";

import Main from "../user/Main";
import Characters from "../user/Characters";

import axios from "axios";
// import { rescheduleJob } from "node-schedule";
import useLocalStorage from "react-use-localstorage";


const UserInfo = () => {
    const [ ,,addError, ]                   = useContext( errorContext );
    const [ ,setLoadingG ]                  = useContext( loadingContext );
    const [ user, ]                         = useContext( Context );

    const Location = useLocation();
    const [ searched, setSearched ] = useState( Location.pathname.match( /\d{18}/g ) || [] );

    const [ player, setPlayer ]             = useLocalStorage( 'playerInfo', '[]' );

    const [ sUser, setSUser ]               = useState( {} );
    const [ Splayer, setSPlayer ]           = useState( [] );

    const [ parsedPlayer, setParsedPlayer ] = useState( searched? [] : player.length > 2? JSON.parse(player) : [] );

    const [ role, setRole ]                 = useState( [] ); // dorobić wyświetlanie info o HIC
    const [ loading, setLoading ]           = useState( false );
    const [ displayEdit, setDisplayEdit ]   = useState( {} );


    const wyloguj = async () => {
        await axios.get("http://hapel-ic.pl/api/dc/logout").then(res=>{
            let x = res?.data?.type? res.data: { type: "info", error: "brak wiadomości!" };
            
            setPlayer('[]');
            document.location.href = "http://hapel-ic.pl/";
            addError(x);
            return;
        })
        .catch(er => er.type && er.error? addError(er): addError({ type: "danger", error: `Wystąpił nieoczekiwany błąd: ${er}`}));
    }

    const getPlayerInfo = async ( id ) => {
        // podłączone konta z grą
        setLoading(true);

        await axios.get(`http://hapel-ic.pl/api/users/game${id.length > 0? `?id=${id[0]}`: ""}`, { user }).then(res => {
            let data = res?.data?.rows? res.data.rows: [];
            
            if( data.length == 0 )
                return addError({ type: "info", erorr: "Brak podłączonych kont z discordem w bazie!" });

            if( !id || id.length == 0 ){ 
                setPlayer( JSON.stringify(data) ); 
                setParsedPlayer( data );
            }else{ 
                setSPlayer( data );
            }
        })
        .catch(er => {
            console.error(`Get info game ${er}`);
            addError({ type: "warning", error: "Wystąpił błąd podczas pobierania kont z gry!" });
        })
        .finally(()=>{
            return setLoading( false );
        })
    }
    const getHicInfo = async ( id ) => {

        await axios.get(`http://hapel-ic.pl/api/users/hic${id.length > 0? `?id=${id[0]}`: "" }`, { user }).then(res => {
            let data = res?.data?.role? res.data.role: [];
            if(data.length == 0)
                return addError({ type: "info", erorr: "Brak roli na hapel-ic!" });

            return setRole( data );
        })
        .catch(er => {
            console.error(`Get info hic ${er}`);
            return addError({ type: "warning", error:"Wystąpił błąd podczas pobierania info o koncie discord!"});
        });
    }
    const getSUser = async ( id ) => {
        if( !id || id.length == 0 )
            return;

        await axios.get(`http://hapel-ic.pl/api/users/web${id.length > 0? `?id=${id[0]}`: "" }`, {user}).then(res => {
            let data = res?.data?.sUser? res.data.sUser: {};
            if( !data )
                return addError({ type: "danger", error: "Brak wyników po fetchowaniu usera!" });
            
            axios.get( data.avatar.replace("webp", "gif") ).then(a=>{
                data.avatar = data.avatar.replace('webp', 'gif');
            })
            .catch(er=>{})
            .finally(()=>{
                setSUser( data );
            });
            
            return true;
        })
        .catch(er => {
            console.error(`Get alien info: ${er}`);
            return addError({ type: "warning", error: "Wystąpił błąd podczas pobierania użytkownika!"});
        });
    }

    const toggleEdit = ( nick ) => {
        (!displayEdit[ nick ] || displayEdit[ nick ] === false)? setDisplayEdit({...displayEdit, [nick]: true}): setDisplayEdit({...displayEdit, [nick]: false});

        return true;
    }
    const editInfo = ( e, ind ) => {
        e.preventDefault();

        if(!user) 
            return addError({ type: "danger", error: "Nie jesteś zalogowany!" });

        let data = {
            nick: e.target.id.value,
            wiek: e.target.age.value,
            plec: e.target.gender.value,
            opis: e.target.opis.value
        }
        if( !data.nick && !data.wiek && !data.plec && !data.opis )
            return addError({ type: "warning", error: "Nie ma czego edytować!" });

        if( data.wiek && ( data.wiek < 0 || data.wiek > 2000 ) )
            return addError({ type: "warning", error: "Podano zły wiek!" });
        if( data.plec && "mf".indexOf( data.plec.toLowerCase() ) == -1 )
            return addError({ type: "warning", error: "Podano złą płeć: m - mężczyzna, f - kobieta" });
        if( data.plec == parsedPlayer[ind].plec && data.wiek == parsedPlayer[ind].wiek && data.opis == parsedPlayer[ind].opis )
            return addError({ type: "warning", error: "Nie ma co poprawić!" });

        setLoading( true );
        axios.get(`http://hapel-ic.pl/api/users/edit?${ Object.keys(data).map(l=> l += "=" + data[l]).join("&") }`).then(res=>{
            setLoading( false );

            toggleEdit( data.nick );

            let temp = parsedPlayer.find((a,i) => i == ind );
            temp.plec = data.plec;
            temp.wiek = data.wiek;
            temp.opis = data.opis;

            setPlayer( JSON.stringify( parsedPlayer ) );
            setParsedPlayer( [...parsedPlayer] );

            return addError( res.data );
        })
        .catch(er => {
            console.error(`Edit danych: ${er}`);
            addError({ type: "danger", error: "Wystąpił nieznany błąd!" });
        });
    }
    const archive = ( nick ) => {
        if( !nick )
            return addError({ type: "warning", error: "Nie podano nicku do archiwizacji!" });

        setLoading( true );
        axios.patch(`http://hapel-ic.pl/api/users/archive?nick=${nick}`, { user })
        .then(res=>{
            addError( res.data );
            return getPlayerInfo( searched );
        })
        .catch(er=>{
            if( er.error && er.type )
                addError(er);

            console.error( `Archiwizacja er: `, er );
        })
        .finally(()=>{
            return setLoading( false );
        });
    }
    const toggleVisible = ( nick ) => {
        if( !nick )
            return addError({ type: "warning", error: "Nie podano nicku do zmiany widoczności!" });
        setLoading( true );

        axios.patch(`http://hapel-ic.pl/api/users/visible?nick=${nick}`, { user })
        .then(res=>{
            addError( res.data );
            return getPlayerInfo( searched );
        })
        .catch(er=>{
            if( er.error && er.type )
                addError(er);

            console.error( `Widoczność er: `, er );
        })
        .finally(()=>{
            return setLoading( false );
        });
    }

    const reloadData = () => {
        setLoadingG( true );

        getPlayerInfo( searched );
        getHicInfo( searched );
        getSUser( searched );

        setLoadingG( false );
    }

    useEffect(() => {

        let x = Location.pathname.match( /\d{18}/g ) || [];
        if( x != searched)
            setSearched( x );
        
    }, [ Location.pathname ]);
 

    if( !user )
        return (<div className="container"><h1> Brak uprawnień! </h1></div>);


    return (
        <>
            <Main searched={ searched } sUser={ searched.length > 0? sUser: user } user={ user } loading={ loading } reloadData={ reloadData } wyloguj={ wyloguj } reloadData={ reloadData } />

            <Characters toggleVisible={ toggleVisible } user={ user } archive={ archive } players={ searched.length == 0? parsedPlayer: Splayer } searched={ searched } displayEdit={ displayEdit } editInfo={ editInfo } toggleEdit={ toggleEdit } reloadData={ reloadData } />
        </>
    )
}


export default UserInfo;