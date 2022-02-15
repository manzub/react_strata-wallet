import React from 'react';

function Error(props) {
    const { code, message } = props.error;
    return(<section className="pt-200 error-page h-p100">
        <div className="container h-p100">
            <div className="row h-p100 align-items-center justify-content-center text-center">
                <div className="col-12">
                    <div>
                        <h1 className="font-weight-900">{code}</h1>
                        <h3><i className="fa fa-warning text-warning"></i>{message}</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default Error;