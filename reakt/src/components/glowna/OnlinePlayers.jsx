import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const OnlinePlayers = ({ users }) => {
    
    if( !users )
        return <div id="onlinePlayers"></div>

    return (
        <div id="onlinePlayers">
            {
                (users.list || []).map((u, ind)=>(
                    <OverlayTrigger key={`u-${ind}`} placement="auto" overlay={<Tooltip>{u}</Tooltip>} >
                        <img id={`user-${ind}`} src={`https://minotar.net/helm/${u}/32.png`} alt={u} />
                    </OverlayTrigger>
                ))
            }
        </div>
    )
}

export default OnlinePlayers
