import axios from 'axios';
import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

import logo from '../logo.png';
import chartMoc from '../chart-moc.png';
import { APIs } from '../states';

function Exchange() {
    const [prices, setState] = React.useState({
        value:0,
        last_value:0,
        badge:'',
        supply:0
    });
    const { value,last_value,supply } = prices;

    React.useEffect(()=>{
        const fetchPrices = () => {
            axios.get(APIs.APP_SERVER+'market/', {cancelToken:axios.CancelToken.source().token}).then(response=>{
                let { data:result } = response;
                let { current_value,last_value,supply } = result.data;
                let badge = current_value > last_value ? 'text-success' : 'text-danger';
                setState({value:(current_value).toFixed(4),last_value,badge,supply})
            })
        }
        fetchPrices();
    },[])

    const calcPercentage = (old, num) => {
        var value = num - old;
        var percent = (value / old)*100;
        return percent.toFixed(2);
    }

    const handleBuy = () => {
        const rave = {
            email:'user@email.com',
            amount:1000,
            phone:'2349028459128'
        }
        sessionStorage.setItem('rave', JSON.stringify(rave));
        document.getElementById('pay').click();
    }

    return(<React.Fragment>
        <Breadcrumb active={{path:'/market',name:'Market'}} />
        <section className="content">
            <div className="row">
                <div className="col-12">
                    <div className="box">
                        <div className="box-body" style={{fontFamily:'"Nunito Sans", sans-serif'}}>
                            <div className="row justify-content-between">
                                <div className="col-12">
                                    <div className="pl-md-30 pt-md-30 pr-md-80 pb-md-30 p-0">
                                        <div className="justify-content-between d-flex">
                                            <h3 className="font-weight-900 text-dark mt-30 d-flex">
                                                <img src={logo} style={{height:'6vmin'}} alt="img" />Strataly
                                            </h3>
                                            <h2 className="font-weight-800 mt-30 d-flex">
                                                ${prices.value}
                                                <sub className={prices.badge} style={{fontSize:10}}>
                                                    {value > last_value ? '+' : null}
                                                    {calcPercentage(last_value, value)}
                                                </sub>
                                            </h2>
                                        </div>
                                        <div className="flexbox">
                                            <div id="linechart">
                                                {/* <canvas width="100" height="38" style={{display:'inline-block',width:'100px',height:'38px',verticalAlign:'top'}} /> */}
                                                <img alt="img" src={chartMoc} />
                                            </div>
                                            <div className="text-right">
                                                <span>Current Supply</span><br/>
                                                <span>
                                                    <i className="ion-ios-arrow-up text-success"></i>
                                                    <span className="font-size-18 ml-1">{supply.toFixed(4)}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex d-block justify-content-between align-items-center">
                                            <div>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a onClick={handleBuy} className="btn btn-success mt-30 d-block mb-md-0 mb-30 font-weight-900" style={{width:'38vw'}} href="#">Buy Strata</a>
                                            </div>
                                            <div>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a className="btn btn-info mt-30 d-block mb-md-0 mb-30 font-weight-900" style={{width:'38vw'}} href="#trade-strata">
                                                    <i className="ti-stats-up pr-5"></i>Trade
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="box">
                        <div className="box-body">
                            <h3 className="box-title">Trade</h3>
                            <div className="row justify-contents-between" id="#trade-strata">
                                <div className="col-12">
                                    <div className="pl-md-30 pt-md-30 pr-md-80 pb-md-30 p-0">
                                        <div className="d-flex justify-contents-between">
                                            <h5>Rate:</h5><b>1 STRLY to <span className="text-info">{(value-0.01).toFixed(3)}</span> USD</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>)
}

export default Exchange;