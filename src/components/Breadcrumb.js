import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb(props) {
    return(<div className="content-header">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">
                    <i className="fa fa-dashboard"></i>Home
                </Link>
            </li>
            <li className="breadcrumb-item active">
                <Link to={props.active.path}>{props.active.name}</Link>
            </li>
        </ol>
    </div>)
}

export default Breadcrumb;