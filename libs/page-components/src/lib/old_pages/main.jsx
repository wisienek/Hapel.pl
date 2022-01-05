import { Route } from "react-router-dom";

import Hogwart from "./strony/Hogwart";
import SElki from "./strony/sElki";
import SCards from "./strony/sCards";
import Placeholder from "./strony/placeholder";
import UserInfo from "./strony/userInfo";
import Role from "./strony/Role";
import Glowna from "./strony/Glowna";

import { ErrorL, LoadingStatus } from '@hapel/page-components';


const Main = () => {
    return (
        <>
            <LoadingStatus />

            <article id="main_article">

                <ErrorL />

                <Route path="/" exact component={Glowna} />

                <Route path="/hogwart" component={Hogwart} />

                <Route path="/elki" component={SElki} /> 

                <Route path="/user" component={UserInfo} />

                <Route path="/karty" component={SCards} />

                <Route path="/role" component={Role} />

            </article>
        </>
    )
};

export default Main;
