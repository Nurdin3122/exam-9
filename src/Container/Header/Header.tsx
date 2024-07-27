import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <>
            <nav className="d-flex bg-body-tertiary">
                <div>
                        <Link to="/" className="navbar-brand mb-0 h1">Finance Tracker</Link>
                </div>
                    <div className="ms-auto d-flex align-items-center">
                                <Link to="/categories" className="btn btn-success me-3">Categories</Link>
                                <Link to="/add" className="btn btn-danger">Add</Link>
                    </div>

            </nav>
        </>
    );
};

export default Header;