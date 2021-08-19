import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../../utils/localStorageHandler'
import Footer from '../pages/footer/Footer'

const PublicRoute = ({ component: Component, ...rest}) => {
    let token = getToken();
    return (
        <Route
            {...rest}
            render={(props) => !token 
                ? <><Component {...props} /><Footer /></>
                : <Redirect to={{ pathname: '/dashbroad' }} />}
        />
    )
}

export default PublicRoute
