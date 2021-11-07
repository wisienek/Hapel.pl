import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { createRef, useState, useEffect } from "react";

import { Multiselect } from "multiselect-react-dropdown";


const SRole = ({ user, mappedRoles, parsedCRole, parsedRoleDC, addRole, parsedRole, multiDcRole, r, create, setCreate, add, setAdd, index }) => {
    const [ selected, setSelected ] = useState( [] );

    const ref = createRef();

    const getData = (e) => {
        e.preventDefault();

        const data = {
            name:           e.target.roleName.value.replace(/[^A-z\s\d][\\\^]?/, ""),
            dname:          e.target.dname.value,
            weight:         e.target.weight.value,
            parent:         e.target.parent.value == "brak"? null: e.target.parent.value,
            permissions:    e.target.permissions.value || [],
            resign:         e.target.resign.checked,
            free:           e.target.free.checked,
            canapply:       e.target.canapply.checked, 
            addrole:        ref.current.getSelectedItems().map(r=> r.dcid || r.id)
        }

        return addRole( data );
    }

    const getSelected = () => {
        const name = r? r.name: null;
        if( !name )
            return;

        const mapped = parsedCRole.auto.filter(auto=> auto.name === name ).map(auto=>{
            const found = (parsedRoleDC || []).find(f=> f.id == auto.dcid);
            if( !found )
                return {...auto, name: auto.dcid };
            return {...auto, name: found.name }; 
        });
        setSelected([ ...mapped ]);

        return;
    }

    useEffect(()=>{

        getSelected();

    }, []);

    return (
        <Card>
            <Card.Header><h3>{r? r.parent? `${r.name} > ${r.parent}`: r.name : "Tworzenie roli"}</h3></Card.Header>
            <Form id="roleEdit" onSubmit={ (e) => getData(e) }>
                <h5>Serwer</h5>

                <Form.Row>
                    <Col className={r? "toggle-visible": ""}>
                        <input className="form-control" placeholder="Nazwa_roli_bez_Spacji" name="roleName" id="roleNameCreate" pattern="^\S+\w{3,32}\S{1,}" defaultValue={r? r.name : ""} disabled={r? true: false} />
                    </Col>
                    <Col>
                        <OverlayTrigger placement="auto" overlay={<Tooltip>Dokładna nazwa do wyświetlania na chacie</Tooltip>}>
                            <input className="form-control" name="dname" type="text" placeholder={r? r.displayname || `[&7${r.name}&f]`: "[&7NazwaRoli&f]"} />
                        </OverlayTrigger>
                    </Col>
                    <Col lg={5}>
                        <OverlayTrigger placement="auto" overlay={<Tooltip>Waga prefixu - czym większe tym większy priorytet wyświetlania: przedział (0; 50)</Tooltip>}>
                            <input className="form-control" name="weight" type="number" placeholder={10} />
                        </OverlayTrigger>
                    </Col>
                </Form.Row>
                
                <Form.Row>
                    <Col>
                        <OverlayTrigger placement="auto" overlay={<Tooltip>Parent roli</Tooltip>}>
                            <Form.Control as="select" name="parent" >
                                <option>{ r? r.parent || "brak": "brak" }</option>
                                {
                                    mappedRoles
                                }
                            </Form.Control>
                        </OverlayTrigger> 
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <OverlayTrigger placement="auto" overlay={<Tooltip>Permissie po przecinku i spacji. Pisząc group.nazwa będzie dziedziczyć permissie od danej grupy</Tooltip>}>
                            <Form.Control as="textarea" rows={6} cols={10} name="permissions" placeholder="hapel.wycie, hapel.wech, essentials.fly.others, group.dorosly, plugin.komenda.opcje" defaultValue={ r? parsedCRole.perms.filter(p=> p.name === r.name ).map(p=> p.permission ).join(", "): "" } />
                        </OverlayTrigger>
                    </Col>
                </Form.Row>

                <h5>Dodatkowe informacje</h5>
                <Form.Row style={{ flexFlow: "column" }}>
                    <Col className="centerFlex">
                        <Form.Check custom defaultChecked={ r? r.canResign : false } type="switch" label="Można rezygnować z roli?" name="resign" id={"resign"+index} />
                    </Col>
                    <Col className="centerFlex">
                        <Form.Check custom defaultChecked={ r? r.isFree :   false } type="switch" label="Można otrzymać bez aplikacji?" name="free" id={"free"+index} />
                    </Col>
                    <Col className="centerFlex">
                        <Form.Check custom defaultChecked={ r? r.canApply : false } type="switch" label="Można aplikować na rolę?" name="canapply" id={"canapply"+index} />
                    </Col>
                </Form.Row>

                <h5>Dane Discordowe</h5>

                <Form.Row>
                    <Col className="centerFlex">
                        <Form.Check custom disabled={ r.dcid? true: false } id={"checkCreate"+index} type="switch" label="Stwórz nową rolę na discord" onClick={() => setCreate({...create, [index]: !create[index] }) } />
                    </Col>
                    
                    <OverlayTrigger placement="auto" overlay={<Tooltip>Role, które dostajesz na discordzie posiadając rangę na serwerze</Tooltip>}>
                        <Col>
                            <Form.Check custom id={"checkAdd"+index} type="switch" label="Dodaj istniejące role" onClick={() => setAdd({...add, [index]: !add[index] }) } />
                        </Col>
                    </OverlayTrigger>
                </Form.Row>
                <Form.Row className={ !create[index] || create[index] == false? "toggle-visible": "" }>
                    <Col lg={6}>
                        <OverlayTrigger placement="auto" overlay={<Tooltip>Nazwa roli na discordzie</Tooltip>} >
                            <input className="form-control" name="dcdisplayname" type="text" placeholder="Twoja Rola" defaultValue={ "" } />
                        </OverlayTrigger>
                    </Col>
                    <Col>
                        <OverlayTrigger placement="auto" overlay={<Tooltip>Permissie discordowe. Odwiedź stronę, pozaznaczaj i skopiuj numer</Tooltip>} >
                            <input className="form-control" type="number" placeholder="6445977152" disabled={ ( user && user.hasPerms )? false: true } />
                        </OverlayTrigger>
                        <a href="https://discordapi.com/permissions.html">kalkulator permissi</a>
                    </Col>
                    <Col lg={2}>
                        <OverlayTrigger placement="auto" overlay={<Tooltip>Kolorek discorda</Tooltip>}>
                            <input className="form-control" type="color" placeholder="#4e6f7b" />
                        </OverlayTrigger>
                    </Col>
                </Form.Row>



                <Form.Row className={ !add[index] || add[index] == false ? "toggle-visible": "" }>
                    <Col>
                        <Multiselect
                            options={ multiDcRole() }
                            selectedValues={selected}

                            showCheckbox={true}
                            closeOnSelect={false}
                            closeIcon="cancel"
                            placeholder="Wybierz rolę na discorda"
                            emptyRecordMsg="Nie znaleziono żadnych ról DC"
                            displayValue="name"
                            ref={ref}
                        />
                    </Col>
                </Form.Row>


                <Button variant="success" type="sumbit">{r? "Edytuj rolę": "Dodaj rolę"}</Button>
            </Form>
        </Card>
    )
}

export default SRole
