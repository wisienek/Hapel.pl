import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { FaBellSlash, FaBell } from "react-icons/fa";

import PlanTable from "./PlanTable";
import TeacherList from "./TeacherList";
import TeacherPanel from "./TeacherPanel";

import ConfirmDelete from "./ConfirmDelete";
import NewLesson from "./NewLesson";

import Premium from "../custom/Premium";

import { useEffect, useState } from "react";

import axios from "axios";

const Plan = ({ user, addError }) => {
    const days = [ "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Brak" ];
    const today = new Date().toJSON().slice(0,10).split('-').reverse().join(".");
    const [ day, setDay ]                           = useState( days[ new Date().getDay() ] );
    const [ currentPlan, setCurrentPlan ]           = useState([  ]);
    const [ selectedPlan, setSelectedPlan ]         = useState([  ]);
    const [ year, setYear ]                         = useState( 1 );
    const [ teachers, setTeachers ]                 = useState([  ]);
    const [ subscribed, setSubscribed ]             = useState({  });

    // modale
    const [ show, setShow ] = useState( 0 );
    const [ def, setDef ]   = useState({ });
    const handleClose = () => setShow( 0 );
    const handleShow = (i) => setShow( i );

    const handleDelete = ( _def ) => {
        console.info(`Wysyłam usuwanie lekcji!`);

        axios.delete(`http://hapel-ic.pl/api/hogwart/plan`, { data: {def: _def, user}, headers: { "Authorization": "***" } }).then(res => {
            if( res.data.message )
                addError( res.data );

            setDef({});
            setCurrentPlan(currentPlan.filter(p=> p.id != _def.id ));
        })
        .catch(er=>{
            if( er?.response?.type && er?.response?.error )
                addError( er.response );
            console.log(er);
        });
    }
    
    //reszta
    const nextDay = ()  => {
        const i = days[ days.indexOf(day) + 1 ] != null? days.indexOf(day) + 1: 0;
        setDay( days[ i ] );

        filterPlan(i, year);
    }
    const prevDay = () => {
        const i = days[ days.indexOf(day) - 1 ] != null? days.indexOf(day) - 1: days.length - 1;
        setDay( days[ i ] );

        filterPlan(i, year);
    }
    const changeClass = ( e ) => {
        setYear( e.currentTarget.value );

        filterPlan( days.indexOf(day), parseInt(e.currentTarget.value) );
    };

    const filterPlan = ( _day, _year ) => {
        setSelectedPlan(
            currentPlan.filter(p=> p.day == _day && p.class == _year )
        )
    }

    const changeNotify  = async () => {
        try{
            if( !user )
                throw "Brak użytkownika!";

            const res = await axios.patch(`http://hapel-ic.pl/api/hogwart/planfollow?year=${year}`, user );
            if( res.data.type )
                addError( res.data );
            setSubscribed({ subscribed, ["kl"+year]: subscribed["kl"+year] == 1? 0: 1 });
        }
        catch(er){
            console.error(er);
        }
    }


    const getTeachers = () => {
        axios.get(`http://hapel-ic.pl/api/hogwart/teachers`).then(res => {
            setTeachers( res.data );
        })
        .catch(er=>{
            console.error(er);
        })
    }
    const getSubscribed = async () => {
        try{
            if( !user )
                return console.log("Brak użytkownika!");
            
            const res = await axios.get(`http://hapel-ic.pl/api/hogwart/planfollow`, user );
            
            setSubscribed( res.data );
        }
        catch(er){
            console.error(er);
        }
    }

    const addLesson = ( e ) => {
        e.preventDefault();

        if( !user )
            return addError({ type: "danger", error: "Musisz być zalogowany!" });

        let { _class, place, day, start, end, name, prof, edit, temp, when } = e.target;
        _class = parseInt(_class?.value || 0) || null;
        day = parseInt(day?.value || 0) || null;
        when = when?.value || null;
        place = place.value || null;
        start = start.value || null;
        end = end.value || null;
        name = name.value || null;
        prof = JSON.parse( prof.value || "{}" );
        edit = edit.value == "true"? true: false;
        temp = temp.value == "true"? true: false;

        if( ( edit == true && !def.id ) || ( temp == true && !def.id ) )
            return addError({ type: 'danger', message: "Brak ID edytowanej lekcji!" });

        if( !temp && ([1,2,3,4].indexOf(_class) == -1) )
            return addError({ type: "warning", error: `Błędny argument w wybranej klasie: ${ _class }` });
        if( !temp && (day < 0 || day > 6) )
            return addError({ type: "warning", error: `Błędny argument w wybranym dniu: ${ day }` });
        if( !temp && (start.match(/\d{2}\:\d{2}/) == null || end.match(/\d{2}\:\d{2}/) == null) )
            return addError({ type: "warning", error: `Błędny argument w wybranych godzinach: ${ start }, ${ end }` });
        if( !temp && (!name || name.length < 3 || name.replace(/\W/g, "").length < 3 || place.length < 3 || place.replace(/\W/g, "").length < 3) )
            return addError({ type: "warning", error: `Błędny argument w nazwie lub miejscu: ${ name }, ${ place }`});
        if( !temp && (typeof prof != "object" || !prof.displayName || !prof.nick) )
            return addError({ type: "warning", error: `Niepoprawny profesor: ${ JSON.stringify( prof ) }`});

        const data = { class: _class, day, start, end, name, prof, place, when, temp, edit, id: def.id || undefined };

        console.log("Wysyłam dane na lekcję");

        ( 
            edit === true? 
                axios.patch(`http://hapel-ic.pl/api/hogwart/plan`, { lekcja: data, user })
            : 
                temp === true?
                    axios.put(`http://hapel-ic.pl/api/hogwart/plan`, { lekcja: data, user })
                :
                    axios.post(`http://hapel-ic.pl/api/hogwart/plan`, { lekcja: data, user }) 
        
        ).then(res => {
            if( res?.data?.type && res?.data?.message ){
                handleClose();
                addError( res.data ); 
                getPlan();
            }
        })
        .catch(er => {
            if( er?.response?.type && er?.response?.error )
                addError( er.response );
            console.log(er);
        });
    }
    const getPlan = () => {
        axios.get(`http://hapel-ic.pl/api/hogwart/plan`).then(res => {
            if( res.data.plan ){
                let plan = res.data.plan.map(l=>{
                    return { ...l, prof: JSON.parse(l.prof), Sprof: l.Sprof? JSON.parse(l.Sprof): null };
                });

                setCurrentPlan( plan );
                setSelectedPlan( plan.filter(p=> p.day == days.indexOf(day) && p.class == year ) )

                console.log("Zaktualizowano plan!", plan);
            }
        })
        .catch(er => {
            if( er?.response?.type && er?.response?.error )
                addError( er.response );
            console.log(er);
        });
    }


    useEffect(() => {

        teachers.length == 0                    && getTeachers();
        Object.keys(subscribed).length  == 0    && getSubscribed();
        currentPlan.length == 0                 && getPlan();

    }, [ user ]);

    return (
        <div className="container" id="plan">
            <div className="grid80">
                <Card>
                    <Premium />
                    <Card.Header className="planCardHeader" >
                        <ButtonGroup>
                            <Button variant={`${year == 1? "": "outline-"}primary`}     name="year" value={1} onClick={ (e)=> changeClass(e) } >1 OOC</Button>
                            <Button variant={`${year == 2? "": "outline-"}success`}     name="year" value={2} onClick={ (e)=> changeClass(e) } >2 OOC</Button>
                            <Button variant={`${year == 3? "": "outline-"}danger`}      name="year" value={3} onClick={ (e)=> changeClass(e) } >3 OOC</Button>
                            <Button variant={`${year == 4? "": "outline-"}secondary`}   name="year" value={4} onClick={ (e)=> changeClass(e) } >Dodatkowe</Button>
                        </ButtonGroup>

                        <div >
                            {
                                `Klasa: ${year}`
                            }
                            {
                                ( user && ( user.hasPerms || user.hasPermsHic || user.isSubscribed || user.isPatreon ) )?
                                    subscribed[ "kl"+year ] == 1?
                                        <FaBellSlash className="user-icon" onClick={ () =>  changeNotify() } />
                                    :
                                        <FaBell className="user-icon bell-ring" onClick={ () =>  changeNotify() } />
                                :
                                    ""
                            }
                        </div>
                    </Card.Header>
                    
                    <Card.Body>
                        <PlanTable day={ day } plan={ selectedPlan } next={ nextDay } prev={ prevDay } />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <h3>Kadra</h3>
                        
                        <TeacherList teachers={ teachers } />
                    </Card.Body>
                </Card>
            </div>

            {
                user && ( user.isProf || user.hasPerms )?
                    <>
                        <TeacherPanel days={ days } plan={ currentPlan } handleShow={ handleShow } setDef={ setDef } />

                        <NewLesson handleClose={ handleClose } show={ show } days={ days } teachers={ teachers } addLesson={ addLesson } def={ def } setDef={ setDef } />
                        <ConfirmDelete handleClose={ handleClose } show={ show } def={ def } setDef={ setDef } days={ days } handleDelete={ handleDelete } />
                    </>
                :
                    ""
            }
        </div>
    )
}

export default Plan;
