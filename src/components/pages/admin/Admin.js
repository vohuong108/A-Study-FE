import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import "./admin.scss";

import Home from "./home/Home";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import UserList from "./userList/UserList";
import CourseList from "./courselist/CourseList";


export default function Admin({ history, location }) {
    const user = useSelector(state => state.user.userObj);
    let { url } = useRouteMatch();

    useEffect(() => {
        if (user?.userRole && user?.userRole !== "SUPER_ADMIN") {
            console.log("match non admin with current: ", user?.userRole);
            history.push("/dashbroad");
        }
    }, [user?.userRole])
    return (
        <div >
            <div className="Container" style={{ marginTop: '40px' }}>
                <Sidebar />
                <Switch>
                    {location.pathname === url && <Redirect from={url} to={`${url}/users?page=0`} />}
                    <Route exact path="/admin"><Home location={location} history={history} /></Route>
                    <Route path="/admin/courses">
                        {(location.pathname === "/admin/courses" && location.search === "")&& <Redirect from="/admin/courses" to="/admin/courses?page=0" />}
                        <CourseList location={location} history={history} />
                    </Route>
                    <Route path="/admin/users">
                        {(location.pathname === "/admin/users" && location.search === "")&& <Redirect from="/admin/users" to="/admin/users?page=0" />}
                        <UserList location={location} history={history} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}