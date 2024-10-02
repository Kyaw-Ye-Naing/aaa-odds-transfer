import React, { useEffect, useState } from 'react'
import './Login.css';
import MyColor from '../config/color';
import { toast } from "react-toastify";
import Spinner from "../asset/spinner1";
import {useHistory} from "react-router-dom";
import { oddController } from '../controllers/oddsController/oddController';
import color from '../config/color';
import { getDatabase, ref, set, get } from 'firebase/database';
import app from '../config/firebase.config';
import { logDOM } from '@testing-library/react';
import { use } from 'i18next';
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

//    useEffect(()=>{
//       localStorage.removeItem("userId");
//       localStorage.removeItem("userName");
//       localStorage.removeItem("userRole");
//       localStorage.removeItem("USER");
//       localStorage.removeItem("language");
//       localStorage.removeItem("TOKEN");
//    },[])
  useEffect(()=>{
    if(!!localStorage.getItem("USER")){
        console.log(localStorage.getItem("USER"));
        
            history.push("/odds");
        }
    },[])
   
   
   const saveDataToFirebase = async (username) => {
    
     const db = getDatabase(app);
     const newDocRef = ref(db, "loginUser/" + username) ;
        set(newDocRef, {
        active: true
        }).then( () => {
     //   alert("data saved successfully")
        }).catch((error) => {
       // alert("error: ", error.message);
        console.log(error)
        })
    }

    const handleSave = async () => {
        // localStorage.setItem("info", JSON.stringify(userdata))
       
        //console.log("dddd",rapidEventId);
        setLoading(true);
       

        const db = getDatabase(app);
        const dbRef = ref(db, "loginUser/"+ name);
        const snapshot = await get(dbRef);
        if(snapshot.exists() && snapshot.val().active) {
                toast.error("User is already logged in", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setLoading(false);
                return
        } 

        oddController.checkLogIn(name, password, (data) => {
            setLoading(false);
            if (data.status === 1) {
                toast.error(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return;
            }
            
            
            localStorage.setItem("USER", JSON.stringify(data.userDetails));
            localStorage.setItem("TOKEN",data.token);       
            localStorage.setItem("userName",data.userDetails.oddsUserName);
            localStorage.setItem("userRole",data.userDetails.roleId);
            localStorage.setItem("userId",data.userDetails.oddsUserId);
            if (data.status !== 2) {
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }  
            saveDataToFirebase(name?.toLowerCase().trim());
          

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
                        <div className="bg-white rounded shadow-lg login-panel">
                            <span className="mb-2 login-title">LOG IN</span>
                            <p className="text-center login-sub-title">Log In to manage all your process</p>
                            <form>
                                <label className="login-label">Username</label>
                                <div className="Icon-outside">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="custom-input mb-3 txt"
                                        type="text"
                                    />
                                </div>
                                <label className="login-label">Password</label>
                                <div className="Icon-outside1">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="custom-input"
                                        type="password"
                                    />
                                   
                                </div>
                                <p className="m-0 py-3"><a href="" className="text-muted"></a></p>
                                <button
                                type="button"
                                disabled = {isLoading}
                                    style={{ backgroundColor: color['dark'].main, color: "#fff" }}
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