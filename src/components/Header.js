import React from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function Header() {
    return(<React.Fragment>
        <header className="main-header">
            <div className="inside-header">
                <div className="d-flex align-items-center logo-box justify-content-between">
                    <Link to="/" className="logo">
                        <div className="logo-mini">
                            <span className="light-logo">
                                <img src={logo} alt="logo" style={{height:'5vmin'}} />
                            </span>
                        </div>
                        <div className="logo-lg">
                            <span className="light-logo text-bold">STRATA</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    </React.Fragment>)
}

export default Header;