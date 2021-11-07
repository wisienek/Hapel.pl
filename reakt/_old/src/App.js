import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from "react-router-dom";

import Sides from "./components/sides";
import Main from "./components/main";
import User from "./components/user";
import Error from "./components/errorContext";
import LoadingContext from "./components/LoadingContext";

function App() {

  return (
    <main>
      <User >
        <Error>
          <LoadingContext>
            <Router>
              <header>            
                  <Sides />
              </header>
              <Main />
            </Router>
          </LoadingContext>
        </Error>
      </User>
    </main>
  );
}

export default App;
