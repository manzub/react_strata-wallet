import React, { useEffect } from 'react';
import QRCode from 'qrcode';

function Recieve(props) {
    const { user } = props;
    const [state, setState] = React.useState({
        help1:undefined
    })

    useEffect(()=>{
        var canvas = document.getElementById('qrcode');
        QRCode.toCanvas(canvas, `${user.wallet}`, (err)=>{
            if(err) console.log(err);
        })
    },[user.wallet])

    const handleCopy = (event) => {
        // var text = event.target.value;
        var copyText = document.getElementById("address");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        setState({help1:'copied'})
        setTimeout(() => {
            setState({help1:undefined})
        }, 2000);
    }

    return(<React.Fragment>
        <div className="modal center-modal fade" tabIndex="-1" data-backdrop="false" id="recieve-modal" aria-modal="true" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close"data-dismiss="modal"><span aria-hidden="true" style={{fontSize:20,marginRight:10}} className="fa ti-close"></span></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-center" style={{width:'100%'}}>
                            <canvas style={{display:'inline'}} id="qrcode"></canvas>
                            <input id="address" readOnly onClick={handleCopy} className="form-control" value={user.wallet} />
                            <div className="help-block">{state.help1}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>)
}

export default Recieve;