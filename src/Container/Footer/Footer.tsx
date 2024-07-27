import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="text-center text-lg-start">
                <div className="text-center p-3">
                    © 2024 Contacts:
                    <Link to="/" className="text-body" href="#">Home</Link>
                </div>
            </div>
        </>
    );
};

export default Footer;