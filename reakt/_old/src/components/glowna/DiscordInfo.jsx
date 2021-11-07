import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const DiscordInfo = ({ dcInfo }) => {
    return (
        <>
            {
                dcInfo.map((inf, ind) => (
                    <Card className="mainPageDiscords" key={`dc-${ind}`} >
                        <Card.Body style={{ display: "flex", justifyContent: "space-between" }} >
                            <div className="discordInvite" >
                                <img src={ `https://cdn.discordapp.com/icons/${inf.id}/${inf.guild.icon}.webp?size=64` } style={{ width: "64px", height: "64px", borderRadius: "15px" }} />
                            
                                <div>
                                    <h4>{ inf.name }</h4>

                                    <div className="onlineWrapper" >
                                        <i style={{ display: "block", borderRadius: "50%", width: "8px", height: "8px", marginLeft: "4px", marginRight: "4px", backgroundColor: "#3ba55c" }} ></i><span>Online: { inf.approximate_presence_count }</span>
                                        <i style={{ display: "block", borderRadius: "50%", width: "8px", height: "8px", marginLeft: "4px", marginRight: "4px", backgroundColor: "#747f8d" }} ></i><span>Graczy: { inf.approximate_member_count }</span>
                                    </div>
                                </div>  

                            </div>
                            <div className="centerFlex" style={{ alignSelf: "center", float: "right" }}>
                                <Button variant="primary" href={inf.instant_invite} target="_blank">Dołącz</Button>
                            </div>  

                        </Card.Body>
                    </Card>
                ))
            }
        </>
    )
}

export default DiscordInfo;
