import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


const NewLesson = ({ def, setDef, show, handleClose, days, teachers, addLesson }) => {
    return (
        <>
            <Modal
                show={ ( show === 1 || show === 3 )? true: false }
                onHide={ () => { handleClose(); setDef( {} ); } }
                backdrop="static"
                keyboard={ false }
            >
                <Form onSubmit={ (e) => addLesson(e) } >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            { 
                                Object.keys(def).length > 0?
                                    show === 3?
                                        "Dodaj tymczasowe informacje"
                                    :   
                                        "Edytuj lekcję" 
                                : 
                                    "Nowa lekcja" 
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="toggle-visible form-control" name="edit" id="edit" required value={ show === 1 } readOnly />
                        <input className="toggle-visible form-control" name="temp" id="temp" required value={ show === 3 } readOnly />

                            {
                                show === 3?
                                    <Form.Row>
                                        <Form.Label>Do kiedy będzie zmiana (nie wliczając dnia)</Form.Label>
                                        <input className="form-control" type="date" name="when" id="when" required defaultValue={ new Date( Date.now() + 691200000 ).toJSON().replace(/T.*/g, "") } />
                                    </Form.Row>
                                :   
                                    ""
                            }
                            <Form.Row className="mb-3">
                                {          
                                    show != 3?
                                        <Form.Group>                   
                                            <Form.Label>Klasy</Form.Label>
                                            <select className="form-control" placeholder="Która klasa" name="_class" id="_class" required defaultValue={ def.class } >
                                                <option value={1} >1 OOC</option>
                                                <option value={2} >2 OOC</option>
                                                <option value={3} >3 OOC</option>
                                                <option value={4} >Dodatkowe</option>
                                            </select>
                                        </Form.Group>
                                    :
                                        ""
                                }
                                <Form.Group as={Col}>
                                    <Form.Label>Dzień</Form.Label>
                                    <select className="form-control" placeholder="W jaki dzień" name="day" id="day" required={ show!=3 } defaultValue={ show===3? def.Sday: def.day } >
                                        {
                                            show===3?
                                                <option value={ null }></option>
                                            :
                                                ""
                                        }
                                        {
                                            days.map((d, i)=>(
                                                <option key={ "fd-"+i } value={ i }>{d}</option>
                                            ))
                                        }
                                    </select>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Start</Form.Label>
                                    <input className="form-control" list="start-g" placeholder="Rozpoczęcie" name="start" id="start" required={ show!=3 } defaultValue={ show===3? def.Sstart: def.start } />
                                    <datalist id="start-g" >
                                        <option value={ "18:00" } >18:00</option>
                                        <option value={ "19:00" } >19:00</option>
                                        <option value={ "20:00" } >20:00</option>
                                        <option value={ "21:00" } >21:00</option>
                                    </datalist>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Koniec</Form.Label>
                                    <input className="form-control" list="end-g" placeholder="Zakończenie" name="end" id="end" required={ show!=3 } defaultValue={ show===3? def.Send: def.end } />
                                    <datalist id="end-g" >
                                        <option value={ "18:50" } >18:50</option>
                                        <option value={ "19:50" } >19:50</option>
                                        <option value={ "20:50" } >20:50</option>
                                        <option value={ "21:50" } >21:50</option>
                                    </datalist>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Miejsce</Form.Label>
                                    <input className="form-control" placeholder="Boisko" name="place" id="place" defaultValue={ show===3? def.Splace: def?.place } />
                                </Form.Group>
                            </Form.Row>
                            {
                                show != 3?
                                    <Form.Row >
                                        <Form.Group as={Col} >
                                            <Form.Label>Nazwa lekcji</Form.Label>
                                            <input className="form-control" placeholder="Smokologia" name="name" id="name" min={3} required defaultValue={ def.name } />
                                        </Form.Group>
                                    </Form.Row>
                                :
                                    ""
                            }
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Nauczyciel</Form.Label>
                                    <select className="form-control" list="prof-g" name="prof" id="prof" required={ show!=3 } defaultValue={ def.prof } >
                                        {
                                            def.Sprof && show === 3?
                                                <option value={ JSON.stringify(def.Sprof) } >{def.Sprof.nick} {def.Sprof.displayName}</option>
                                            :
                                                show===3?
                                                    <option value={ null }></option>
                                                :
                                                    def.prof?
                                                        <option value={ JSON.stringify(def.prof) } >{def.prof.nick} {def.prof.displayName}</option>
                                                    :
                                                        ""
                                        }
                                        {
                                            teachers.map((t, i)=>(
                                                <option key={ 'ts-'+i } value={ JSON.stringify(t) } >{t.nick} {t.displayName}</option>
                                            ))
                                        }   
                                    </select>
                                </Form.Group>
                            </Form.Row>


                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "space-between" }}>
                        <Button variant="secondary" onClick={ () => { handleClose(); setDef( {} ); } }>
                            Zamknij
                        </Button>
                        <Button variant="success" type="submit" >
                            Zatwierdź
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default NewLesson;
