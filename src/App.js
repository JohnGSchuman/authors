import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Switch,
  Route,
  Link 
} from "react-router-dom";
import Main from './views/Main';
import Create from './views/Create';
import Update from './views/Update';

function App() {
    return (
    <div className = "App">
      <div className = "navBar">
      <h1>JGS Author Info Listing</h1>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route exact path="/authors/create">
          <Create/>
        </Route>
        <Route exact path="/authors/:_id/update">
          <Update/>
        </Route>
      </Switch>

      </div>
    </div>
  );
}

export default App;
