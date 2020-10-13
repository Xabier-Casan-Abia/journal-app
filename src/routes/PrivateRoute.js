import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Proptypes from 'prop-types';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Route {...rest}
            component={ (props) => (
                isAuthenticated
                ? <Component { ...props} />
                : <Redirect to='/auth/login' />
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: Proptypes.bool.isRequired,
    component: Proptypes.func.isRequired
}
