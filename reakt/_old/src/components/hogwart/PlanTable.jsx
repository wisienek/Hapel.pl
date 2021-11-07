import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Tooltip from "react-bootstrap/Tooltip"
import ListGroup from "react-bootstrap/ListGroup";

import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { GoAlert, GoArrowRight } from "react-icons/go";

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

const PlanTable = props => {
    return (
        <div >

            <div className="planNav noTuch">

                <BsFillCaretLeftFill className="user-icon" onClick={ () => props.prev() } />
                
                <h2>{ props.day }</h2>

                <BsFillCaretRightFill className="user-icon" onClick={ () => props.next() } />

            </div>

            {
                props.plan.length == 0?
                    <div style={{ display: "flex" }}><h4>Brak lekcji</h4></div>
                :
                    <ListGroup variant="dark" className="planDaily" >

                        {
                            props.plan.map( (lek, ind) => (
                                <ListGroup.Item key={ "lekcja"+ind } >

                                    <OverlayTrigger placement="auto" trigger={["click", "focus"]} overlay={
                                            <Popover>
                                                <Popover.Title as="h5">{ lek?.Sprof?.nick || lek.prof.nick }</Popover.Title>
                                                <Popover.Content>
                                                    <p><strong>Nazwisko: </strong> { lek?.Sprof?.displayName || lek.prof.displayName } </p>
                                                    <p><strong>Discord: </strong> <Link style={{ color: "#c5c9c5" }} to={`/user/${ lek?.Sprof?.discord || lek.prof.discord }`} target="_blank" > { lek?.Sprof?.discord || lek.prof.discord } </Link></p>
                                                </Popover.Content>
                                            </Popover>
                                        } >
                                        <img id={ `profh-${ lek?.Sprof?.nick || lek.prof.nick }${ind}` } src={`https://minotar.net/helm/${ lek?.Sprof?.nick || lek.prof.nick }/64.png`} alt={ lek?.Sprof?.nick || lek.prof.nick } style={{ borderRadius: "5px", cursor: "pointer" }} />
                                    </OverlayTrigger>
                                    
                                    <div className="planStartEnd" >
                                        <span>{ lek?.Sstart || lek.start }</span>
                                        <span>{ lek?.Send || lek.end }</span>
                                    </div>

                                    <div className="planNamePlace" >
                                        <h3>{ lek.name }</h3>
                                        <span>{ lek?.Splace || lek.place }</span>
                                    </div>

                                    <div className="lessonControlls">
                                        {
                                            lek.when && (lek.Sprof || lek.Sstart || lek.Send || lek.Splace) ?
                                                <OverlayTrigger placement="auto" trigger={["hover", "focus"]} overlay={
                                                    <Popover>
                                                        <Popover.Title as="h5">Zmiany w lekcji</Popover.Title>
                                                        <Popover.Content>
                                                            { lek.Sprof?    <p><strong>Profesor: </strong> { lek.prof.nick } <GoArrowRight /> { lek.Sprof.nick } </p>: ""}        
                                                            { lek.Sstart?   <p><strong>Start: </strong> { lek.start } <GoArrowRight /> { lek.Sstart } </p>: ""}                  
                                                            { lek.Send?     <p><strong>Koniec: </strong> { lek.end } <GoArrowRight /> { lek.Send } </p>: ""}                       
                                                            { lek.Splace?   <p><strong>Miejsce: </strong> { lek.place } <GoArrowRight /> { lek.Splace } </p>: ""}
                                                            <p><strong>Do Kiedy: </strong> { lek.when } </p>
                                                        </Popover.Content>
                                                    </Popover>
                                                } >
                                                    <GoAlert id="alertLessonDif" className="lessonDif" />
                                                </OverlayTrigger>
                                            :
                                                ""
                                        }
                                    </div>
                                </ListGroup.Item>
                            ))
                        }

                    </ListGroup>
                }
        </div>
    )
}

PlanTable.propTypes = {
    day: PropTypes.string.isRequired,
    plan: PropTypes.array.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
}

export default PlanTable;
