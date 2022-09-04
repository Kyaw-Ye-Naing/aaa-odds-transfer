import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import OddsTransfer from './Page/OddsTransfer'
import LogIn from './Page/LogIn'
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path={"/odds"} component={OddsTransfer} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
    </div>
  );
}

export default App;
