import { decode } from "jsonwebtoken";
import { getToken, setToken } from "../../utils/localStorageHandler";
import { setStateFreshToken } from "../../features/user/userSlice";

import moment from "moment";
import authApi from "../../api/authApi";

const tokenMiddleware = (store) => (next) => (action) => {
    // console.log("action: \n", action);

    let access_token = getToken("access_token");
    
    if (access_token) {
        if (typeof action === 'function') {
            let { exp } = decode(access_token);
    
            let diff = moment(exp)*1000 - moment(Date.now());
            // console.log(`CHECK TOKEN EXPIRED: ${diff}`);

            if (diff < 5000) {
                if(!store.getState().user.freshTokenPromise) {
                    // console.log(`${action.type} ===> MATCH NULL`);
    
                    return refreshAccessToken(store.dispatch)
                        .then(() => next(action))
                        .catch(err => {console.log(err)})
                    
                } else {
                    // console.log(`${action.type} ===> MATCH NO NULL`);
                    return store.getState().user.freshTokenPromise
                                                .then(() => next(action))
                                                .catch(err => {console.log(err)})
                    
                    
                }
            }
            
        }
    }
            
    // console.log(`${action.type} ==> MATCH OUTLIE`);
    return next(action);
    
}

const refreshAccessToken = (dispatch) => {

    let refreshPromise = 
        authApi.refreshAccessToken()
            .then(res => {
                console.log("AFTER CALL API")
                setToken(res.data.data.access_token, "access_token");
                dispatch(setStateFreshToken({type: "DONE"}));

                return res.data.data.access_token 
                    ? Promise.resolve(res.data.data.access_token)
                    : Promise.reject({message: 'could not refresh token'})
            })
            .catch(e => {
                console.log('error refreshing token', e);
                dispatch({
                    type: 'DONE'
                });
                return Promise.reject(e);
            });
    
    dispatch(setStateFreshToken({type: "LOADING", promiseEntity: refreshPromise}));

    return refreshPromise;
}

export default tokenMiddleware;

