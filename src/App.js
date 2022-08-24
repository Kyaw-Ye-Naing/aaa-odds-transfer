import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import OddsTransfer from './Page/OddsTransfer'
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <nav>
      <div className="title">
      <i className="fa-solid fa-diamond" style={{fontSize:13}}></i>
        <h3 className="px-2">Odds Trasfer Page</h3>
      <i className="fa-solid fa-diamond" style={{fontSize:13}}></i>
      </div>
      </nav>   
      <div className="App">
      <ToastContainer />
      <OddsTransfer/>
      </div>
    </div>
  );
}

export default App;
