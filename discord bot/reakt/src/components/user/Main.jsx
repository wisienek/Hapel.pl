import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { GoSignOut, GoSync } from "react-icons/go";
import { AiOutlineLoading } from "react-icons/ai";
import { FaBolt, FaChalkboardTeacher } from "react-icons/fa";

import { useEffect } from "react";

import { Link } from "react-router-dom";


const Main = ({ user, sUser, reloadData, wyloguj, searched, loading }) => {

    useEffect(async () => {
        await reloadData();
    }, [ searched ]);

    return (
        <div className="profileMain">
            <div className="darkenBackground centerFlex">
                <Container className="profileContainer"  >
                    <div className="centerFlex">
                        <img
                            width={80}
                            height={80}
                            src={ sUser.avatar || 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png' }
                            alt="user avatar"
                            style={{ borderRadius: "50%" }}
                        />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div id="userName" className="centerFlex">
                                <Link to={`/user/${sUser.discord}`}><h4>@{sUser.username}{`#${sUser.discriminator}`}</h4></Link>
                                {
                                    sUser.hasPerms == true?
                                        <OverlayTrigger placement="auto" overlay={ <Tooltip>Moderator</Tooltip> } >
                                            <Badge id="modBadge" className="profileBadge"> <FaBolt /> </Badge>
                                        </OverlayTrigger>
                                    :
                                        sUser.isProf == true?
                                            <OverlayTrigger placement="auto" overlay={ <Tooltip>Profesor</Tooltip> }>
                                                <Badge id="teachBadge" className="profileBadge"> <FaChalkboardTeacher /> </Badge>
                                            </OverlayTrigger>
                                        :
                                            ""
                                }
                            </div>
                            <p>Dołączono { !sUser.created? "------" : sUser.created.replace(/T.*/g, "") }</p>
                        </div>
                    </div>

                    <div className="profileControlls">
                        {
                            loading == false?
                                <OverlayTrigger  placement="left" overlay={ <Tooltip> Odśwież informacje </Tooltip> }>
                                    <GoSync className="user-icon" onClick={ () => reloadData() } />
                                </OverlayTrigger>
                            :
                                <OverlayTrigger  placement="left" overlay={ <Tooltip> Ładuję informacje </Tooltip> }>
                                    <AiOutlineLoading className="user-icon rotate360" />
                                </OverlayTrigger>
                        }
                        {
                            searched.length > 0?
                                ""
                            :
                            <OverlayTrigger  placement="auto" overlay={ <Tooltip> Wyloguj </Tooltip> }>
                                <GoSignOut className="user-icon" onClick={ ()=> wyloguj() } />
                            </OverlayTrigger>
                        }
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Main;
