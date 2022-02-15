import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import {APIs, showSnackbar} from "../states"

import './pages.css'

function Signup() {
    const [success,setSucess] = React.useState(false);
    const [inputs,setInputs] = React.useState({
        input1:undefined,
        input2:undefined,
        input3:undefined
    })
    // eslint-disable-next-line no-unused-vars

    const handleSubmit = (event) => {
        event.preventDefault();
        const { input1,input2, input3 } = inputs;
        if(input1 && input2 && input3) {
            let cancelToken = axios.CancelToken.source().token;
            axios.get(APIs.APP_SERVER+`register?name=${input1}&email=${input2}&password=${input3}`, {cancelToken}).then(result=>{
                const { status, message } = result.data;
                // eslint-disable-next-line eqeqeq
                if(status == 1) {
                    setSucess(true);
                }
                showSnackbar(message);
            }).catch(err=>{
                const error = new Error(err);
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

    const handleInput3 = (event) => {
        const value = event.target.value;
        // eslint-disable-next-line eqeqeq
        if(value != "") setInputs({...inputs, input3:value})
    }

    return(<React.Fragment>
       <Header/>
       <section className="content align-items-v-center">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="box">
                        <div className="box-header without-border">
                            <h2 className="box-title box-title-bold">Signup</h2>
                        </div>
                        <div className="box-body">
                            <form onSubmit={handleSubmit} className="error">
                                <div className="form-group">
                                    <h5>Name <span className="text-danger">*</span></h5>
                                    <div className="controls">
                                        <input onChange={event=>handleInput1(event)} className="form-control" type="text" required />
                                        <div className="help-block"></div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5>Email <span className="text-danger">*</span></h5>
                                    <div className="controls">
                                        <input onChange={event=>handleInput2(event)} className="form-control" type="email" required />
                                        <div className="help-block"></div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5>Password <span className="text-danger">*</span></h5>
                                    <div className="controls">
                                        <input onChange={event=>handleInput3(event)} className="form-control" minLength="6" type="password" required />
                                        <div className="help-block"></div>
                                    </div>
                                </div>
                                <div className="text-xs-right mb-20">
                                    <button className="btn btn-rounded btn-success mr-50">Signup</button>
                                    { success ? <Link className="text-danger" to="/">Go To Login</Link> : null}
                                </div>
                                <Link to="/">Already Have an account ?</Link>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div> 
        </section>
    </React.Fragment>)
}

export default Signup;