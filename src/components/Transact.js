import axios from 'axios';
import React from 'react';

import '../pages/pages.css';
import { APIs, showSnackbar } from '../states';

function Transact(props) {
    const [type,setType] = React.useState('normal');
    const [invalid,setValid] = React.useState(true)
    const [state, setState] = React.useState({
        help_block1:undefined,
        help_block2:undefined
    })
    const [inputs,setInputs] = React.useState({
        input1:undefined,
        input2:undefined
    })
    const handleSubmit = () => {
        // handlesubmit
        const { input1:amount, input2:to_address } = inputs;
        const data = {
            amount:parseFloat(amount),
            recipient:to_address,
            sender:props.user.wallet
        }
        axios.get(APIs.APP_SERVER+`sendTransaction/?amount=${data.amount}&recipient=${data.recipient}&sender=${data.sender}`, {cancelToken:axios.CancelToken.source().token}).then(response=>{
            showSnackbar(response.data.message);
        })
    }

    const handleAddress = (event) => {
        setInputs({...inputs, input2:undefined})
        const prevState = state;
        const address = event.target.value || 'nill';
        // save existing state and replace only needed value
        axios.get(APIs.APP_SERVER+`transact/${address}?option=1`,  {cancelToken:axios.CancelToken.source().token}).then(response=>{
            setState({...prevState, help_block2:undefined})
            const { data } = response.data;
            // eslint-disable-next-line eqeqeq
            if(!data.address || props.user.wallet == address) {
                setState({invalid:prevState.invalid,help_block1:prevState.help_block1,help_block2:'Invalid wallet address'})
            }else setInputs({...inputs, input2:address})
            validateFormFields()
            validateFormFields()
        })
    }

    const handleAmount = (event) => {
        const prevState = state;
        const amount = event.target.value;
        // eslint-disable-next-line eqeqeq
        amount != ('' || 0) && axios.get(APIs.APP_SERVER+`transact/${amount}?type=${type}&option=2`,{cancelToken:axios.CancelToken.source().token}).then(response=>{
            const {data} = response.data;
            setState({...prevState,help_block1:data})
            setInputs({...inputs, input1:amount})
            validateFormFields()
        })
    }

    const handleTransactionType = (event) => {
        setType(event.target.value)
        event.target.value = 0;
        handleAmount(event);
    }

    const validateFormFields = () => {
        const { input1, input2 } = inputs;
        if(input1 && input2) {
            // eslint-disable-next-line eqeqeq
            if((input1 && input2) != (''||0)) setValid(false);
        }
    }

    return(<React.Fragment>
        <div className="modal modal-fill fade" tabIndex="-1" data-backdrop="false"id="transact" aria-modal="true" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header divider">
                        <h1 className="modal-title font-weight-800 mb-50 text-dark text-center">Transfer</h1>
                        <button type="button" className="close"data-dismiss="modal"><span aria-hidden="true" style={{fontSize:20,marginRight:10}} className="fa ti-close"></span></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                {/* <h5>Amount</h5> */}
                                <div className="controls">
                                    <div className="input-group currency-input">
                                        <sup className="input-group-addon">STRLY</sup>
                                        <input onChange={event=>handleAmount(event)} className="form-control" placeholder="0.00" type="number" />
                                    </div>
                                    <div className="pl-10 text-info help-block">{state.help_block1}</div>
                                    <div className="form-group d-flex">
                                        <div className="radio">
                                            <input type="radio" onChange={handleTransactionType} value='normal' name="type" id="opt-1" /><label htmlFor="opt-1">Normal</label>
                                        </div>
                                        <div className="radio">
                                            <input type="radio" onChange={handleTransactionType} value='fast' name="type" id="opt-2" /><label htmlFor="opt-2">Fast</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="transact-extras mt-50">
                                <div className="form-group">
                                    <div className="controls">
                                        <div className="input-group">
                                            <span className="input-group-addon">To<i className="pl-30 fa fa-credit-card-alt"/></span>
                                            <input onChange={event=>handleAddress(event)} className="form-control" placeholder="strataly wallet address" type="text" />
                                        </div>
                                        <div className="pl-10 text-danger help-block">{state.help_block2}</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="controls">
                                        <div className="input-group">
                                            <span className="input-group-addon">Pay With</span>
                                            <input className="form-control mr-10" disabled value={"STRATALY"} type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-10">
                                <button type="button" onClick={handleSubmit} disabled={invalid} className="btn btn-primary btn-block btn-large font-size-20 font-weight-500 p-20">TRANSFER</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>)
}

export default Transact;