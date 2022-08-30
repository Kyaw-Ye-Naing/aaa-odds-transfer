import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import OddsTransfer from './Page/OddsTransfer'
import LogIn from './Page/LogIn'
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <div className="App">
      <ToastContainer />
      <LogIn/>
      </div>
    </div>
  );
}

export default App;
