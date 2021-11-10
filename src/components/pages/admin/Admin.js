// import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import "./admin.scss"
import Home from "./home/Home";
import { BrowserRouter, Route } from "react-router-dom"
import {Switch} from "react-router-dom"
import UserList from "./userList/UserList";
import User from "./user/User";
import CourseList from "./courselist/CourseList";


export default function App() {
  return (
    <BrowserRouter>
      <div >
      {/* <Topbar/> */}
       
        <div className="Container">
          <Sidebar/>
          <Switch>
            <Route exact path="/admin"><Home/></Route>
            <Route path="/admin/user"><User/></Route>
            <Route path="/admin/list"><CourseList/></Route>
            <Route path="/admin/userlist"><UserList/></Route>
          </Switch>
         
          
        </div>
    </div>
    </BrowserRouter>
    
    
  );
}
  
 

