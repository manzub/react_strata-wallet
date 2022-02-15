/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Recieve from '../components/Recieve';
import Transact from '../components/Transact';
import TransactionLog from '../components/transactions-log';
import { APIs, userState } from '../states';

import './pages.css'

function Home() {
    const user = useRecoilValue(userState);
    const [state, setState] = React.useState({
        logs:[],
        balance:0,
        toUSD:0
    });

    useEffect(()=>{
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        const fetchLogs = () => {
            axios.get(APIs.APP_SERVER+'home/'+user.wallet, {cancelToken:source.token}).then(response=>{
                const { data, status } = response.data;
                // eslint-disable-next-line eqeqeq
                if(status == 1) {
                    const { logs, balance, balanceToUsd } = data;
                    setState({logs,balance,toUSD:balanceToUsd});
                }
            }).catch(err=>{
                let error = new Error(err);
                console.log(error.message);
            })
            
        };
        fetchLogs();
        setInterval(() => {
            fetchLogs();
        }, 10000);
    }, [setState, user.wallet])

    return(<React.Fragment>
        <section className="content">
            <div className="row">
                <div className="col-12">
                    <div className="box">
                        <div className="box-body" style={{fontFamily:'"Nunito Sans", sans-serif'}}>
                            <div className="row justify-content-between">
                                <div className="col-12">
                                    <div className="pl-md-30 pt-md-30 pr-md-80 pb-md-30 p-0">
                                        <h5 className="text-uppercase font-weight-700">Balance Details</h5>
                                        <h1 className="font-weight-900 text-dark mt-30">${(state.toUSD).toFixed(6)}</h1>
                                        <p className="mb-0">{state.balance} STRLY</p>
                                        <div className="d-flex d-block justify-content-between align-items-center">
                                            <div>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a data-toggle="modal" data-target="#recieve-modal" className="btn btn-success mt-30 d-block mb-md-0 mb-30" style={{width:'38vw'}} href="#">
                                                    <i className="ti-arrow-down pr-5"></i>Recieve
                                                </a>
                                            </div>
                                            <div>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a data-toggle="modal" data-target="#transact" className="btn btn-primary mt-30 d-block mb-md-0 mb-30" style={{width:'38vw'}} href="#">
                                                    <i className="ti-arrow-up pr-5"></i>Send
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* activity log */}
                <TransactionLog user={user} data={state.logs} />
                <Transact user={user}/>
                <Recieve user={user} />
            </div>
        </section>
    </React.Fragment>)
}

export default Home;