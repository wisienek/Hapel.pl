import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


const ApplyToRole = () => {

    const selectRole = () => {

    }


    return (
        <>
            <h1>Aplikuj na rolę</h1>
            <Card>
                <Card.Header><h3>Wybierz rolę</h3></Card.Header>
                <Form id="roleSelect">
                    <h5>Składnik i ilość</h5>
                    <Form.Row>
                        <Col >
                            <input className="form-control" list="roleData" placeholder="Nazwa roli" name="roleName" id="roleName" onInput={()=> selectRole()} />
                                <datalist id="roleData">
                                    {
                                        Object.keys(parsedRole).map((rola, ind)=>(
                                            <option key={ind} value={rola.name} />
                                        ))
                                    }
                                </datalist>
                        </Col>
                        <Col lg={4}>
                            <input className="form-control" id="ile" type="number" placeholder={1} />
                        </Col>
                    </Form.Row>

                    <h5>Dane składnika</h5>
                    <Form.Row>
                        
                        <Col>
                            <OverlayTrigger placement="auto" overlay={<Tooltip>Typ składnika</Tooltip>} >
                                <input className="form-control" id="typ" type="text" placeholder="Typ składnika" disabled />
                            </OverlayTrigger>
                        </Col>
                        <Col>
                            <OverlayTrigger placement="auto" overlay={<Tooltip>Jednostka</Tooltip>} >
                                <input className="form-control" id="jednostka" type="text" placeholder="szt" disabled />
                            </OverlayTrigger>
                        </Col>
                        <Col>
                            <OverlayTrigger placement="auto" overlay={<Tooltip>ile jednostek</Tooltip>}>
                                <input className="form-control" id="ilosc" type="number" placeholder="20" disabled />
                            </OverlayTrigger>
                        </Col>
                        <Col>
                            <OverlayTrigger placement="auto" overlay={<Tooltip>cena za X jednostek</Tooltip>} >
                                <input className="form-control" id="cena" type="number" placeholder="1" disabled /> 
                            </OverlayTrigger>
                        </Col>
                    </Form.Row>

                    <Button variant="primary" onClick={() => dodajSkladnik()}>Dodaj składnik</Button>
                </Form>
            </Card>
        </>
    )
}

export default ApplyToRole;
