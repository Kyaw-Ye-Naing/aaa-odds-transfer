import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import OddsTransfer from './Page/OddsTransfer'
import Betting from './Page/Betting';
import LogIn from './Page/LogIn';
import Report from './Page/Report';
import Calculate from './Page/Calculate';
import History from './Page/History';
import Customer from './Page/Customer';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
    <div className="App container-fluid">
      <ToastContainer />
      <Router forceRefresh={true}>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path={"/odds"} component={OddsTransfer} />
          <Route path={"/betting"} component={Betting}/>
          <Route path={"/report"} component={Report}/>
          <Route path={"/calculate"} component={Calculate}/>
          <Route path={"/history"} component={History}/>
          <Route path={"/customer"} component={Customer}/>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
    </div>
  );
}

export default App;
