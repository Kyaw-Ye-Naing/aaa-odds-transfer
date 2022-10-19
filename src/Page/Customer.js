import React,{useState} from 'react';
import NavBar from './components/NavBar';
import Loader from '../asset/loader';

function Customer() {
    const [isLoading, setLoading] = useState(false);
  return (
    <div>
        <NavBar username={"Bo Bo"} customercolor={"link-btn-active"}/>
        {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
        <div>
            <span className="site-header">Customer Page</span>
        </div>
      )}
    </div>
  )
}

export default Customer