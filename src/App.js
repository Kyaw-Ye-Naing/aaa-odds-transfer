import { useEffect } from 'react';
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
import Analysis from './Page/Analysis';
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const { i18n } = useTranslation("global");

  useEffect(() => {
    //eslint-disable-next-line
    i18n.changeLanguage(localStorage.getItem("language") === "mm" ? "mm" : "en");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
    <div className="App">
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
          <Route path={"/analysis"} component={Analysis}/>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
    </div>
  );
}

export default App;
