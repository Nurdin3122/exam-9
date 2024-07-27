import React from 'react';
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

const Layout:React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <header><Header/></header>
                <main className="container-fluid flex-grow-1">{children}</main>
                <footer className="mt-auto bg-body-secondary"><Footer/></footer>
            </div>
        </>
    );
};

export default Layout;