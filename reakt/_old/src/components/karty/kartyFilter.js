import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { memo } from "react";

const KartyFilter = ({ displayKarty, setDisplayKarty, typesCount }) => {
    const types = ["common", "uncommon", "rare", "ancient", "legendary"];
    const colors = ["#8b392d", "#7b858f", "#f17727", "#e1b11b", "#393a75"];

    const toggleKarty = (typ, index) => {
        let copy = Object.assign({}, displayKarty);
        copy[typ] == true? copy[typ] = false: copy[typ] = true;

        document.getElementById(typ).classList.toggle("sorterSelected");
        return setDisplayKarty(copy);
    }



    return (
        <div id="sortKarty">
            {types.map((t,ind)=>(
                <OverlayTrigger 
                    key={ind}
                    placement="auto"
                    overlay={
                        <Tooltip>
                            { t } { typesCount[ t ] }   
                        </Tooltip>
                    }
                
                >
                    <div onClick={() => toggleKarty(t, ind)} className="sorter hoverContainer" id={t} style={{ backgroundColor: colors[ind] }}></div>
                </OverlayTrigger>
            ))}
        </div>
    )
}


export default memo( KartyFilter );