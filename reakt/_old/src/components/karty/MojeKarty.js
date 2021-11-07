import { useEffect } from 'react';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";

const MojeKarty = ({ displayKarty, user, globalKarty, getOwnCards, update, setUpdate, swojeKarty }) => {

    const getMojeKarty = () =>{
        if(!update) return;
        getOwnCards();

        swojeKarty.length > 0 && setUpdate(false);
        return true;
    }

    useEffect( () => {
        ( user && update ) && getMojeKarty();
    }, []);

    return (
        <>
            {swojeKarty.length>0? swojeKarty.map((w, ind)=>(
                <Card key={w.serial} style={ displayKarty[globalKarty[w.karta].typ] == true? {display: "none"} : {} } className={`${globalKarty[w.karta].typ}`} >
                    <OverlayTrigger 
                        key={ind}
                        placement="auto"
                        overlay={
                            <Tooltip>
                                {globalKarty[w.karta].typ}    
                            </Tooltip>
                        }
                    >
                        <Card.Img loading="lazy" variant="top" src={`http://hapel-ic.pl/assets/karty/${w.karta}.png`} />
                    </OverlayTrigger>
                    
                    <Card.Body>
                        <Card.Title>{globalKarty[w.karta].nazwa} ({w.karta})</Card.Title>
                        <Card.Text>
                            {JSON.parse(globalKarty[w.karta].opis).join(" ")}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )):
            <div style={{ display: "flex", flexDirection: "column", textAlign: "center"}}>
                <h1>
                    Nie masz żadnych kart!
                </h1>
                <br />
                <h4>
                    Jeżeli masz jakieś w grze kliknij na nie PPM aby je tutaj wyświetlić.
                </h4>
            </div>
            }
        </>
    )
}

export default MojeKarty;