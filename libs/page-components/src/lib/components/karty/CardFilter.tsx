import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { CardRarity, CardRarityColors } from '@hapel/shared';

import { memo } from "react";

const CardFilter = (props: { displayKarty: any, setDisplayCards: any, typesCount: any }) => {

    const toggleCards = (typ, index) => {
        let copy = Object.assign({}, displayKarty);
        copy[typ] === true ? copy[typ] = false : copy[typ] = true;

        document.getElementById(typ).classList.toggle("sorterSelected");
        return setDisplayCards(copy);
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
                    <div 
                        onClick={() => toggleCards(t, ind)} 
                        className="sorter hoverContainer" 
                        id={t} 
                        style={{ backgroundColor: colors[ind] }}
                    ></div>
                </OverlayTrigger>
            ))}
        </div>
    )
}


export default memo( CardFilter );