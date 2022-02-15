import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInState, showSnackbar } from '../states';
import './Footer.css'

function BottomNav() {
    // eslint-disable-next-line no-unused-vars
    const [user,setUser] = useRecoilState(loggedInState);

    const handleLogout = () => {
        showSnackbar('Logged Out')
        setTimeout(() => {
            setUser(false)
        }, 2500);
    }

    return(<React.Fragment>
        <nav className="custom-nav">
            <NavLink to="/">
                <i className="__icon ti-home"></i>Home
            </NavLink>
            {/* <NavLink to="/exchange">
                <i className="__icon  ti-stats-up"></i>Market
            </NavLink> */}
            {/* <NavLink to="/settings">
                <i className="__icon ti-settings"></i>Settings
            </NavLink> */}
            <a href="#logout" onClick={handleLogout}>
                <i className="__icon ti-power-off text-danger"></i>Logout
            </a>
        </nav>
    </React.Fragment>)
}

export default BottomNav;