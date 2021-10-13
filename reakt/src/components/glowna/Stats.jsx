import Card from "react-bootstrap/Card";

import Online from "./Online";
import OnlineInfo from "./OnlineInfo";
import OnlinePlayers from "./OnlinePlayers";

import Premium from "../custom/Premium";

const Stats = ({ user, data, dailyInfo, getDailyInfo, serverInfo }) => {
    return (
        <>
            <div className={ (user && user.hasPerms)? "grid80": ""} >
                <Card>
                    <Card.Body>
                        <h4>Wykres graczy online w godzinach 22-23</h4>
                        <div style={{ display: "flex" }}>
                            <Online data={ data } />
                            <OnlineInfo data={ dailyInfo } help={ data } getDailyInfo={ getDailyInfo } />
                        </div>
                    </Card.Body>
                </Card>
                {
                    ( user && ( user.hasPerms || user.hasPermsHic || user.isSubscribed || user.isPatreon ) )?
                        <Card id="onlinePlayersWrapper">
                            <Premium />
                            <Card.Body>
                                <h4>Graczy Online: { serverInfo?.players?.online? serverInfo.players.online: 0 } / { serverInfo?.players?.max? serverInfo.players.max: 0 }</h4>
                                <OnlinePlayers users={ serverInfo.players } />
                            </Card.Body>
                        </Card>
                    :
                        ""
                }
            </div>
        </>
    )
}

export default Stats
