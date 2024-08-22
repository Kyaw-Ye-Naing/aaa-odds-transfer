import React, { useState } from 'react'
import './Login.css';
import MyColor from '../config/color';
import { toast } from "react-toastify";
import Spinner from "../asset/spinner1";
import {useHistory} from "react-router-dom";
import { oddController } from '../controllers/oddsController/oddController';

const userdata = [
    {
      userId:1,
      userName:"Bo Bo"
    }
  ]

  
function LogIn() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const history = useHistory();

    const handleSave = () => {
        // localStorage.setItem("info", JSON.stringify(userdata))
       
        //console.log("dddd",rapidEventId);
        setLoading(true);
        oddController.checkLogIn(name, password, (data) => {
            setLoading(false);
            console.log("uuyuy",data);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName);
            //localStorage.setItem("userRole", data.userRole);
            localStorage.setItem("userRole", data.userRole);
            //console.log("uuyuy",data.userId);
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            if(data.status == 2){
                history.push("/odds");
            }  
        });
       
    }

    return (
        <div className="demo-container">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-12 mx-auto">
                        <div className="text-center image-size-small position-relative">
                            <img src="https://annedece.sirv.com/Images/user-vector.jpg" className="rounded-circle p-2 bg-white" />
                            {/* <div class="icon-camera">
                                <a href="" class="text-primary"><i class="lni lni-camera"></i></a>
                            </div> */}
                        </div>
                        <div className="p-5 bg-white rounded shadow-lg">
                            <h3 className="mb-2 text-center pt-5">LOG IN</h3>
                            <p className="text-center lead">Log In to manage all your process</p>
                            <form>
                                <label className="font-500">Username</label>
                                <div className="Icon-outside">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control mb-3"
                                        type="text"
                                    />
                                </div>
                                <label className="font-500">Password</label>
                                <div className="Icon-outside1">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        type="password"
                                    />
                                </div>
                                <p className="m-0 py-3"><a href="" className="text-muted"></a></p>
                                <button
                                type="button"
                                disabled = {isLoading}
                                    style={{ backgroundColor: MyColor.headerbackground, color: "#fff" }}
                                    className="btn btn-lg w-100 shadow-lg"
                                    onClick={() => handleSave()}
                                >
                                    <div style={{ display: "flex", justifyContent:"center",alignItems: "center" }}>
                                        {isLoading ? <Spinner /> : null}
                                        <span style={{fontSize:"1rem"}}>
                                            LOG IN<i className="fa-solid fa-right-to-bracket" style={{marginLeft:"0.4rem"}}></i>
                                        </span>
                                    </div>
                                </button>
                            </form>
                            {/* <div class="text-center pt-4">
                                <p class="m-0">Do not have an account? <a href="" class="text-dark font-weight-bold">Sign Up</a></p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn