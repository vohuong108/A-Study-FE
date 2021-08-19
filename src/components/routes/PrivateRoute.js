import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../../utils/localStorageHandler'

const PrivateRoute = ({ component: Component,  ...rest }) => {
    // const user = useSelector(state => state.user.userObj);
    const token = getToken()
    return (
        <Route {...rest} render={(props) => {
            if(!token) return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            return <Component {...props} />
            }
        }
        />
    )
}

export default PrivateRoute
