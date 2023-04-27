import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Loader from "../asset/loader";
import CustomerModal from "./components/CustomerEditModal";
import { useHistory } from "react-router-dom";
import CustomerCreateModal from "./components/CustomerCreateModal";
import { oddController } from "../controllers/oddsController/oddController";
import ReactPaginate from "react-paginate";

const data = [
  {
    customerName: "Kyaw Htoo",
    commission: 1,
    customerId: 1,
    active: true,
  },
  {
    customerName: "Ayeyar",
    commission: 1,
    customerId: 2,
    active: true,
  },
  {
    customerName: "Moe De",
    commission: 2,
    customerId: 3,
    active: true,
  },
];

function Customer() {
  const rowsPerPage = 8;
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [searchText, setSearchText] = useState([]);

  const [customerInfo, setCustomerInfo] = useState([]);
  const [searchCustomer,setSearchCustomer] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    customerName: "",
    commission: 0,
    customerId: 0,
    betLimit :0,
    active: false,
  });
  const [newcustomerData, setNewCustomerData] = useState({
    customerName: "",
    commission: 0,
    customerId: 0,
    betLimit :0,
    active: true,
  });

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    //console.log("kokok",userName);
    if (userName == undefined || userName != "Bo Bo") {
      history.push("/");
    }
    setUsername(userName);
    getCustomer();
  }, []);

  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPageCount(data.selected);
  };

  const cancelSearch = () => {
    setSearchText("");
    setSearchCustomer(customerInfo);
    setPage(Math.ceil(customerInfo.length / rowsPerPage));
  };

  const onChangeTeam = (e) => {
    setSearchText(e.target.value);
    //console.log("eeee", e.target.value);
    if (e.target.value.length != 0) {
      const filteredRows = customerInfo.filter((row) => {
        return row.customerName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearchCustomer(filteredRows);
      //console.log("hhh",filteredRows);
      setPage(Math.ceil(filteredRows.length / rowsPerPage));
    } else {
      setSearchCustomer([...customerInfo]);
      setPage(Math.ceil(customerInfo.length / rowsPerPage));
    }
  };

  const getCustomer = () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    oddController.getCustomer(parseInt(userId), (data) => {
      console.log("dsta", data.customer);
      setCustomerInfo(data.customer);
      setSearchCustomer(data.customer);
      setPage(Math.ceil(data.customer.length / rowsPerPage));
      setLoading(false);
    });
  };

  const OnEditClick = (customer, commission, customerId, active,betLimit) => {
    const newedit = { ...customerData };
    newedit["customerName"] = customer;
    newedit["commission"] = commission;
    newedit["customerId"] = customerId;
    newedit["betLimit"] = betLimit;
    newedit["active"] = active;
    setCustomerData(newedit);
  };

  // const OnCreateClick = (customer, commission, customerId, active) => {
  //   const newedit = { ...customerData };
  //   newedit["customerName"] = customer;
  //   newedit["commission"] = commission;
  //   newedit["customerId"] = customerId;
  //   newedit["active"] = active;
  //   setCustomerData(newedit);
  // };

  return (
    <div>
      <CustomerModal
        customerdata={customerData}
        setCustomerData={setCustomerData}
        getCustomer={getCustomer}
        setLoading={setLoading}
      />
      <CustomerCreateModal
        setNewCustomerData={setNewCustomerData}
        newcustomerData={newcustomerData}
        getCustomer={getCustomer}
        setLoading={setLoading}
      />
       <NavBar username={username} customercolor={"link-btn-active"} />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
          <p>Loading .....</p>
        </div>
      ) : (
        <div>
          <span className="site-header">Customer</span>
          <div className="customer-header">
          <div className="input-gp">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="search ..."
                style={{ width: 200 }}
                value={searchText}
                onChange={(e) => onChangeTeam(e)}
              />
              <button
                type="button"
                className="btn btn-light"
                onClick={() => cancelSearch()}
              >
                <i
                  className="fa-solid fa-circle-xmark"
                  style={{ fontSize: 15 }}
                ></i>
              </button>
            </div>
            <button
              type="button"
              className="btn btn-outline-success"
              data-bs-target="#customeraddModal"
              data-bs-toggle="modal"
            >
              <i className="fas fa-add"></i>&nbsp;Add New
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-light">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Commission</th>
                  <th scope="col">Bet Limit</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchCustomer.length != 0 ?
                searchCustomer &&
                  searchCustomer
                    .slice(
                      pageCount * rowsPerPage,
                      pageCount * rowsPerPage + rowsPerPage
                    )
                    .map((d, i) => {
                      return (
                        <tr key={d.customerId}>
                          <th scope="row">{i + 1}</th>
                          <td>{d.customerName}</td>
                          <td>{d.commission}%</td>
                          <td>{d.betLimit}</td>
                          <td>
                            <button
                              className="btn btn-outline-success"
                              data-bs-toggle="modal"
                              data-bs-target="#customerModal"
                              onClick={() =>
                                OnEditClick(
                                  d.customerName,
                                  d.commission,
                                  d.customerId,
                                  d.active,
                                  d.betLimit
                                )
                              }
                            >
                              <i className="fas fa-edit"></i>&nbsp;Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  :
                  <tr>
              <td colSpan={4} style={{textAlign:'center'}}>no data</td>
            </tr>
                  }
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      )}
    </div>
  );
}

export default Customer;
