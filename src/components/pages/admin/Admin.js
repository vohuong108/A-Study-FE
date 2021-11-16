import React, { useEffect } from 'react'
import Sidebar from "./sidebar/Sidebar";
import "./admin.scss"
import Home from "./home/Home";
import { Route, useRouteMatch, Redirect } from "react-router-dom"
import {Switch} from "react-router-dom"
import UserList from "./userList/UserList";
import User from "./user/User";
import CourseList from "./courselist/CourseList";
import { useSelector } from 'react-redux'


export default function Admin({ history, location }) {
    const user  = useSelector(state => state.user.userObj);
    let { url } = useRouteMatch();
    console.log("location render admin: ", location);
    console.log("url render admin: ", url);

    useEffect(() => {
        if(user?.permission && user?.permission !== "ADMIN") {
            console.log("match non admin with current: ", user?.permission);
            history.push("/dashbroad");
        }
    }, [user?.permission])
    return (
        <div >
            <div className="Container">
                <Sidebar/>
                <Switch>
                    {location.pathname === url && <Redirect from={url} to={`${url}/userlist`} />}
                    <Route exact path="/admin"><Home/></Route>
                    <Route path="/admin/user"><User/></Route>
                    <Route path="/admin/list"><CourseList/></Route>
                    <Route path="/admin/userlist"><UserList/></Route>
                </Switch>
            </div>
        </div>
    );
}
  
 

