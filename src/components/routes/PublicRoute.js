import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../../utils/common.js'

const PublicRoute = ({ component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => !getToken() 
                ? <Component {...props} /> 
                : <Redirect to={{ pathname: '/course' }} />}
        />
    )
}

export default PublicRoute
