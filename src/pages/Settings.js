/* eslint-disable no-unused-vars */
import React from 'react';
import { useRecoilState } from 'recoil';
import { loggedInState, showSnackbar } from '../states';

function Settings() {
    const [user,setUser] = useRecoilState(loggedInState);

    const handleLogout = () => {
        showSnackbar('Logged Out')
        setTimeout(() => {
            setUser(false)
        }, 2500);
    }

    return(<React.Fragment>
        <section className="content">
            <div className="row">
                <div className="col-12">
                    <div className="box pull-up" onClick={handleLogout}>
                        <div className="box-body">
                            <div className="font-size-30 d-flex text-danger">
                                <span className="pt-1 fa fa-power-off pr-5"></span>
                                <h5 style={{fontSize:30}}>Logout</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>)
}

export default Settings;