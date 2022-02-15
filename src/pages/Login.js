import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Header from "../components/Header";
import {APIs, loggedInState, showSnackbar} from "../states"
// import $ from "jquery";
import './pages.css'

function Login() {
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useRecoilState(loggedInState);
    const [inputs, setInputs] = React.useState({
        input1:undefined,
        input2:undefined
    })
    // eslint-disable-next-line no-unused-vars

    const handleSubmit = (event) => {
        event.preventDefault();
        const { input1,input2 } = inputs;
        if(input1 && input2) {
            let cancelToken = axios.CancelToken.source().token;
            // const data = { email:input1,password:input2 }
            let url1 = APIs.APP_SERVER+`login?email=${input1}&password=${input2}`;
            // let url = "https://accounts.strata.ly/api/login"
            axios.get(url1, {cancelToken}).then(result=>{
                const { data, status, message } = result.data;
                // eslint-disable-next-line eqeqeq
                if(status == 1) {
                    setTimeout(() => {
                        setUser(data);
                    }, 2500);
                }
                showSnackbar(message);
            }).catch(err=>{
                const error = new Error(err);
                console.log(err);
                showSnackbar(error.message);
            })
        }
    }

    const handleInput1 = (event) => {
        const value = event.target.value;
        // eslint-disable-next-line eqeqeq
        if(value != "") setInputs({...inputs, input1:value})
    }

    const handleInput2 = (event) => {
        const value = event.target.value;
        // eslint-disable-next-line eqeqeq
        if(value != "") setInputs({...inputs, input2:value})
    }

    return(<React.Fragment>
       <Header/>
       <section className="content align-items-v-center">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="box">
                        <div className="box-header without-border">
                            <h2 className="box-title box-title-bold">Login</h2>
                        </div>
                        <div className="box-body">
                            <form onSubmit={handleSubmit} className="error">
                                <div className="form-group">
                                    <h5>Email <span className="text-danger">*</span></h5>
                                    <div className="controls">
                                        <input onChange={event=>handleInput1(event)} className="form-control" type="email" required />
                                        <div className="help-block"></div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5>Password <span className="text-danger">*</span></h5>
                                    <div className="controls">
                                        <input onChange={event=>handleInput2(event)} className="form-control" minLength="6" type="password" required />
                                        <div className="help-block"></div>
                                    </div>
                                </div>
                                <div className="text-xs-right mb-20">
                                    <button className="btn btn-rounded btn-success">Login</button>
                                </div>
                                <Link to="/signup">Don't Have an account ?</Link>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div> 
        </section>
    </React.Fragment>)
}

export default Login;