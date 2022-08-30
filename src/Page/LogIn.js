import React from 'react'
import './Login.css';
import MyColor from '../config/color'

function LogIn() {
    return (
        <div class="demo-container">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 col-12 mx-auto">
                        <div class="text-center image-size-small position-relative">
                            <img src="https://annedece.sirv.com/Images/user-vector.jpg" class="rounded-circle p-2 bg-white" />
                            {/* <div class="icon-camera">
                                <a href="" class="text-primary"><i class="lni lni-camera"></i></a>
                            </div> */}
                        </div>
                        <div class="p-5 bg-white rounded shadow-lg">
                            <h3 class="mb-2 text-center pt-5">LOG IN</h3>
                            <p class="text-center lead">Log In to manage all your process</p>
                            <form>
                                <label class="font-500">Username</label>
                                <div className="Icon-outside">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <input name="" class="form-control form-control-lg mb-3" type="text" />
                               
                                </div>
                               
                                <label class="font-500">Password</label>
                                <div className="Icon-outside1">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <input name="" class="form-control form-control-lg" type="password" />
                                </div>
                                <p class="m-0 py-3"><a href="" class="text-muted"></a></p>
                                <button 
                                style={{backgroundColor:MyColor.primary,color:"#fff"}}
                                class="btn btn-lg w-100 shadow-lg"
                                >
                               LOG IN
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