import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import { AiOutlineLoading } from "react-icons/ai";

import { Link } from "react-router-dom";

import { memo } from 'react';

const TeacherList = ({ teachers }) => {
    return (
        <div id="onlinePlayers" className="Teachers">
            {
                teachers.length == 0?
                    <AiOutlineLoading className="user-icon rotate360" />
                :
                    teachers.map( (t, ind) => (
                        <OverlayTrigger key={`tu-${ind}`} trigger={["click", "focus"]} placement="auto" overlay={
                            <Popover>
                                <Popover.Title as="h5">{ t.nick }</Popover.Title>
                                <Popover.Content>
                                    <p><strong>Nazwisko: </strong> { t.displayName } </p>
                                    <p><strong>Discord: </strong> 
                                        {
                                            t.discord?
                                                <Link style={{ color: "#c5c9c5" }} to={`/user/${t.discord}`} target="_blank" > { t.discord } </Link>
                                            :
                                                "Niepołączony"
                                        }
                                    </p>
                                </Popover.Content>
                            </Popover>
                        } >
                            <img id={`t-${ind}`} src={`https://minotar.net/helm/${t.nick}/32.png`} alt={t.nick} />
                        </OverlayTrigger>
                    ))
            }
        </div>
    )
}

export default memo( TeacherList );
