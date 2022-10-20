import React,{useState} from 'react';
import NavBar from './components/NavBar';
import Loader from '../asset/loader';
import CustomerModal from './components/CustomerEditModal';
import CustomerCreateModal from './components/CustomerCreateModal';

const data=[
  {
    "customerName":"Kyaw Htoo",
    "commission":1,
    "customerId":1,
    "active":true
  },
  {
    "customerName":"Ayeyar",
    "commission":1,
    "customerId":2,
    "active":true
  },
  {
    "customerName":"Moe De",
    "commission":2,
    "customerId":3,
    "active":true
  },
]

function Customer() {
    const [isLoading, setLoading] = useState(false);
    const [customerData,setCustomerData] = useState({
      "customerName":"",
      "commission":0,
      "customerId":0,
      "active":false
    });
    const [newcustomerData,setNewCustomerData] = useState({
      "customerName":"",
      "commission":0,
      "customerId":0,
      "active":true
    });

    const OnEditClick = (customer, commission, customerId,active) => {
      const newedit = { ...customerData };
      newedit["customerName"] = customer;
      newedit["commission"] = commission;
      newedit["customerId"] = customerId;
      newedit["active"] = active;
      setCustomerData(newedit);
    };
  
    const OnCreateClick = (customer, commission, customerId,active) => {
      const newedit = { ...customerData };
      newedit["customerName"] = customer;
      newedit["commission"] = commission;
      newedit["customerId"] = customerId;
      newedit["active"] = active;
      setCustomerData(newedit);
    };

  return (
    <div>
      <CustomerModal customerdata={customerData} setCustomerData={setCustomerData}/>
      <CustomerCreateModal setNewCustomerData={setNewCustomerData} newcustomerData={newcustomerData}/>
        <NavBar username={"Bo Bo"} customercolor={"link-btn-active"}/>
        {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
        <div>
            <span className="site-header">Customer</span>
            <div className="customer-header">
           <input type="email" class="customer-txt form-control" id="exampleFormControlInput1" placeholder="search ..."/>
           <button type="button" 
           className="btn btn-outline-success"
            data-bs-target="#customeraddModal"
            data-bs-toggle="modal"
           ><i className="fas fa-add"></i>&nbsp;Add New</button>
            </div>
            <div className="table-responsive">
            <table className="table table-light">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Commission</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((d, i) => {
                      return (
                        <tr key={d.customerId}>
                          <th scope="row">{i + 1}</th>
                          <td>{d.customerName}</td>
                          <td>{d.commission}%</td>
                          <td>
                            <button
                              className="btn btn-outline-success"
                              data-bs-toggle="modal"
                              data-bs-target="#customerModal"
                              onClick={()=>OnEditClick(d.customerName,d.commission,d.customerId,d.active)}
                            >
                              <i className="fas fa-edit"></i>&nbsp;Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
        </div>
      )}
    </div>
  )
}

export default Customer