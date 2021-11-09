import React from 'react'
import './App.scss'
import { BrowserRouter, Switch, Route, } from "react-router-dom"
import Footer from './components/pages/footer/Footer'
import Header from './components/pages/header/Header'
import Home from './components/pages/home/Home'
import Login from './components/pages/login/Login'
import UserDash from './components/pages/user/userDash/UserDash'
import Profile from './components/pages/user/profile/Profile'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import SignUp from './components/pages/signup/SignUp'
import Course from './components/pages/course/Course'
import Lecture from './components/pages/course/lectureByWeek/Lecture'
import Submit from './components/pages/quiz/submit/Submit'
import Quiz from './components/pages/quiz/Quiz'
import EditCourse from './components/pages/author/editCourse/EditCourse'
import Search from './components/pages/search/Search'
import PaidCourse from './components/pages/paidCourse/PaidCourse'
import CodeEditor from './components/pages/codeEditor/CodeEditor'
import axios from 'axios'

function App() {

  const handleSubmit = async (data) => {
    data.preventDefault();
     console.log("file: ", data.target[0].files[0]);
    let formData = new FormData();
    formData.append("file", data.target[0].files[0]);
    formData.append("weekId", 1);
    formData.append("indexLecture", 3);
    formData.append("title", "lecture 1");
    formData.append("lectureType", "video");
    formData.append("lectureStatus", "public");

    let result = await axios({
      url: 'http://localhost:8888/api/course/createlecture',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data'},
      data: formData
    })

    console.log("res: ", result);
  
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <form onSubmit={(data) => handleSubmit(data)} enctype="multipart/form-data">
            <input type="file" name="file" id="file" />
            <input type="text" name="weekId" id="weekId" />
            <input type="submit" name="submit" id="submit" />

          </form>
        <Switch>
          <Route path="/code">
            <CodeEditor />
          </Route>
          <PrivateRoute path="/profile" component={Profile} />
          <Route exact path="/search" render={(props) => <Search {...props} />} />
          <Route path="/search/course/:idCourse" render={(props) => <PaidCourse {...props} />} />
          <PrivateRoute path="/quiz/:idQuiz" component={Quiz} />
          <PrivateRoute path="/submit/:idQuiz" component={Submit} />
          <PrivateRoute path="/learn/:idCourse/week/:idWeek" component={Lecture} />
          <PrivateRoute path="/edit/:id" component={EditCourse} />
          <PrivateRoute path="/course/:id" component={Course} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/dashbroad" component={UserDash} />
          <DisplayFooter exact path="/" component={Home} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}


const DisplayFooter = ({ component: Component, ...rest}) => {
  return (
    <Route 
    {...rest}
    render={() => <React.Fragment><Component /><Footer /></React.Fragment>}
    />
    
  )
}
  
export default App;