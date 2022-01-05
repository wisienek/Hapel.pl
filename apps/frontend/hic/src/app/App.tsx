import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { 
  UserContext, 
  NotyficationsContext, 
  LoadingContext,
  Menu,
} from '@hapel/page-components';

import { MainPage } from './pages';


function App() {
  return (
    <NotyficationsContext>
      <UserContext >
        <LoadingContext>

          <MainPage />

        </LoadingContext>
      </UserContext>
    </NotyficationsContext>
  );
}

export default App;
