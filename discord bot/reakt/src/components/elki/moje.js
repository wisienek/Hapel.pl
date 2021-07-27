import { useState, useEffect } from 'react';

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Popover from "react-bootstrap/Popover"


export default function Moje( { globalElki, mojeElki, getMoje, update, setUpdate } ) {
    const [ colors, setColors ] = useState({});
    const elkiInfo = JSON.parse( globalElki );

    const updateMoje = () => {
        if( !update ) return;
        getMoje()

        mojeElki.length > 0 && setUpdate(false);
        return true;
    }

    const formatDate = (stamp) => {
        const date = new Date(Number(stamp));
        return `${date.getHours()<10? "0"+date.getHours(): date.getHours()}:${date.getMinutes()<10? "0"+date.getMinutes(): date.getMinutes()}   /   ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    }


    const accent = (color) => {
        if(colors[color]) return colors[color];
        let x = colors;
        if(color == "000000"){
            x[color] = {
                dark: "5f5f5f",
                normal: "9a9a9a",
                light: "b3afaf",
                lighter: "c0bec1"
            }
        }else{
            x[color] = {
                dark: LightenDarkenColor(color, -40),
                normal: color,
                light: LightenDarkenColor(color, 20),
                lighter: LightenDarkenColor(color, 40)
            }
        }

        setColors(x);
        return x[color];
    }

    function LightenDarkenColor(col, amt) {
        let num = parseInt(col,16);
        let r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
        let g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
     
        return (g | (b << 8) | (r << 16)).toString(16);
    }

    useEffect( () => {
        update && updateMoje();
    }, []);


    return (
        <Container className="content content_2">
            { mojeElki.length == 0 && <h3>Brak stworzonych eliksirów</h3>}
            {
                mojeElki.length > 0 && mojeElki.map((e, ind)=>(
                    <Card key={ 'elk-'+ind }>
                        <Card.Body>
                            <Card.Title>
                                <Col>
                                    <h3 style={{ color: `#${accent(elkiInfo[ e.eliksir ].hex).normal}` }} > {e.id} </h3>
                                </Col>
                                <Col>
                                    <h5> {e.eliksir} </h5>
                                </Col>
                            </Card.Title>
                            <div className="noTuch" style={{ display: "flex", justifyContent: "center", padding: "5px" }}>
                                <Badge style={{ marginRight: "5px" }} variant={e.weryfikowane==1? "success": "danger" } >Weryfikowany</Badge> 
                                <Badge style={{ marginRight: "5px" }} variant={e.odebrane==1? "success": "danger" } className={ e.odebrane==1? "hoverContainer" : "" } >Odebrane{ e.odebrane==1? <span className="hoverText">{ formatDate(e.data_odebrania) || "Brak daty odebrania"}</span>: "" }</Badge> 
                                <Badge style={{ marginRight: "5px" }} variant="warning" >Cena <Badge variant="light">{e.cena}</Badge></Badge> 
                                <Badge style={{ marginRight: "5px" }} variant="secondary" >Ile <Badge variant="light">{ e.pile || elkiInfo[ e.eliksir ].ile }</Badge></Badge> 
                                <Badge style={{ marginRight: "5px" }} variant="secondary" >Ważność <Badge variant="light">{ e.pdata || elkiInfo[ e.eliksir ].data }</Badge></Badge> 
                            </div>

                            <Container fluid className="noPadding" style={{ display: "flex", justifyContent:"center", alignItems: "center", height: "70%"}} >
                                <OverlayTrigger
                                    trigger={["hover", "focus"]}
                                    placement="auto"
                                    overlay={
                                        <Popover>
                                            <Popover.Title as="h4">Info o elku</Popover.Title>
                                            <Popover.Content>
                                                <p><strong>Kolor:</strong> {elkiInfo[ e.eliksir ].kolor}</p> 
                                                <p><strong>Smak:</strong> {elkiInfo[ e.eliksir ].smak}</p>
                                                <p><strong>Zapach:</strong> {elkiInfo[ e.eliksir ].zapach}</p>
                                                <p><strong>Trwa:</strong> {isNaN(elkiInfo[ e.eliksir ].czas)? elkiInfo[ e.eliksir ].czas: (elkiInfo[ e.eliksir ].czas/60 == elkiInfo[ e.eliksir ].czas/60? elkiInfo[ e.eliksir ].czas/60+" godzin": (elkiInfo[ e.eliksir ].czas/60).toPrecision(2)+" godzin") }</p>
                                                <p><strong>Inokreacja:</strong> {elkiInfo[ e.eliksir ].inokreacja}</p>
                                            </Popover.Content>
                                        </Popover>
                                        
                                    }>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{ padding: "5px", width: "120px", enableBackground: "new 0 0 512 512" }} space="preserve">
                                        <path style={{ fill: "#E0E0E2"}} d="M442.947,294.957c-10.17-68.812-56.721-125.591-120.164-149.374V33.391h16.327
                                            c9.22,0,16.696-7.475,16.696-16.696S348.33,0,339.11,0H172.153c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696
                                            h17.064v112.464C125.774,169.8,79.184,226.412,69.053,294.957c-1.346,9.106-2.271,18.346-2.271,27.826
                                            C66.783,427.284,151.497,512,256,512s189.217-84.716,189.217-189.217C445.217,313.303,444.292,304.062,442.947,294.957z"/>
                                        <path style={{ fill: "#C6C5CA" }} d="M442.947,294.957c-10.17-68.812-56.721-125.591-120.164-149.374V33.391h16.327
                                            c9.22,0,16.696-7.475,16.696-16.696S348.33,0,339.11,0H256v294.957V512c104.501,0,189.217-84.716,189.217-189.217
                                            C445.217,313.303,444.292,304.062,442.947,294.957z"/>
                                        <path style={{ fill: `#${accent(elkiInfo[ e.eliksir ].hex).lighter}` }} d="M69.053,294.957c-1.346,9.106-2.271,18.346-2.271,27.826C66.783,427.284,151.497,512,256,512
                                            s189.217-84.716,189.217-189.217c0-9.48-0.925-18.72-2.271-27.826H69.053z"/>
                                        <path style={{ fill: `#${accent(elkiInfo[ e.eliksir ].hex).light}` }} d="M256,294.957V512c104.501,0,189.217-84.716,189.217-189.217c0-9.48-0.925-18.72-2.271-27.826H256z"/>
                                            <circle style={{ fill: `#${accent(elkiInfo[ e.eliksir ].hex).normal}` }} cx="283.459" cy="395.13" r="50.087"/>
                                            <circle style={{ fill: `#${accent(elkiInfo[ e.eliksir ].hex).normal}` }} cx="183.285" cy="361.739" r="16.696"/>
                                            <circle style={{ fill: `#${accent(elkiInfo[ e.eliksir ].hex).dark}` }} cx="250.067" cy="228.174" r="16.696"/>
                                    </svg>
                                </OverlayTrigger>
                            </Container>
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    )
}
