import Container from "react-bootstrap/Container";

import { Context } from "../user";
import { errorContext } from "../errorContext";
import { loadingContext } from "../LoadingContext";

import DiscordInfo from "../glowna/DiscordInfo";
import Stats from "../glowna/Stats";


import { useState, useEffect, useContext } from "react";

import axios from "axios";

const Glowna = () => {
    const [ daily, setDaily ]               = useState([  ]);
    const [ dailyInfo, setDailyInfo ]       = useState({  });
    const [ serverInfo, setServerInfo ]     = useState({  });
    const [ discordsInfo, setDiscordsInfo ] = useState([  ]);
    const [ data, setData ]                 = useState([  ]);
    const [ ,setLoadingG ]                  = useContext( loadingContext );
    const [ user, ]                         = useContext( Context );

    const getDataDaily = () => {
        setLoadingG( true );

        axios.get(`http://hapel-ic.pl/api/help/daily`, { user }).then(res => {
            // console.log(`Załadowano ${res.data.length} daily`, res.data);
            const current = `${new Date().getMonth() + 1}.${new Date().getFullYear()}`;

            setDaily( res.data );
            setData( res.data.filter(d=> d.date.indexOf( current ) != -1) );

            // console.log(data);
        })
        .catch(er=>{
            console.error(`Daily load er: ${er}`);
        })
        .finally(()=>{
            setLoadingG( false );
        });
    }
    const getDailyInfo = () => {
        let help = [...data].sort((a, b)=> a.ilosc - b.ilosc ) || [];
        if( help.length < 1 )
            return;

        let min = help[ 0 ].ilosc;
        let max = help[ help.length - 1 ].ilosc;
        let avg = parseInt(help.reduce((a, b)=> a + b.ilosc, 0) / help.length);
        let med = help.length / 2 == parseInt(help.length/2)? help[ help.length/2 ].ilosc: (help[ Math.floor(help.length/2) ].ilosc + help[ Math.ceil(help.length/2)].ilosc ) / 2;
        
        setDailyInfo({ min, max, med, avg });

        // console.log( dailyInfo );
        // console.log(`med: ${med}, min: ${min}, max: ${max}, avg: ${avg}`);
    }

    const getServerInfo = () => {
        axios.get("https://api.mcsrvstat.us/2/51.83.193.68:25923").then(res => {
            setServerInfo( res.data );
        })
        .catch(er=>{
            console.error(er);
        });
    }
    const getDiscordsInfo = () => {
        const discords = ["133227600746250240", "583031361145667705"];
        const info = [];
        try{
            discords.forEach( async (dc) => {
                const res = await axios.get(`https://discord.com/api/guilds/${dc}/widget.json`);
                const res1 = await axios.get( `https://discordapp.com/api/v6/invite/${res.data.instant_invite.split('invite/')[1]}?with_counts=true` );
                info.push( {...res.data, ...res1.data} );
            });
        }
        catch(er){
            console.error(`GetDCinfo `, er);
        }
        finally{
            setDiscordsInfo( info );
        }
    }

    useEffect(() => {

        getDataDaily();
        getServerInfo();
        getDiscordsInfo();

    }, []);

    // <iframe src="https://ko-fi.com/wisienek/?hidefeed=true&widget=true&embed=true&preview=true" scrolling="no" importance="low" loading="lazy" style={{ maxWidth: "514px", maxHeight: "530px", borderRadius: "10px" } } height="712" title="wisienek"></iframe>
    
    return (
        <Container fluid style={{ padding: "2vh", gap: "20px", display: "flex", flexDirection: "column" }}>
            <div id="discordInfoWrapper"  >
                <DiscordInfo dcInfo={ discordsInfo } />
            </div>

            <div className="glownaMain">

                <div className="glownaMainContent" >
                    <Stats user={ user } data={ data } dailyInfo={dailyInfo} getDailyInfo={ getDailyInfo } serverInfo={ serverInfo } />
                </div>

            </div>

            <div className="glownaBot">
                
            </div>

        </Container>
    )
}

export default Glowna;
