import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Nav = () => {
    return (
        <Fragment>
            <nav>
                <Link to="/recipes"> Home </Link>
                <Link to="create"> Create </Link>
            </nav>
            <Outlet />
        </Fragment>
    )
}