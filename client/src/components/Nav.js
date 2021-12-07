import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Nav.css'

export const Nav = () => {
    return (
        <Fragment>
            <nav className="home-navbar">
                <Link to="/recipes" className="nav-links"> Home </Link>
                <Link to="create" className="nav-links"> Create </Link>
            </nav>
            <Outlet />
        </Fragment>
    )
}