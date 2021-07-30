import React from 'react'
import './App.css'
import Footer from './components/pages/footer/Footer'
import Header from './components/pages/header/Header'
import Home from './components/pages/home/Home'
import Login from './components/pages/login/Login'
import UserDash from './components/pages/user/userDash/UserDash'
import Profile from './components/pages/user/profile/Profile'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import SignUp from './components/pages/signup/SignUp'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Course from './components/pages/course/Course'
import SignupConfirm from './SignupConfirm'
import Overview from './components/pages/course/overview/Overview'
import Lecture from './components/pages/course/lectureByWeek/Lecture'
import Submit from './components/pages/quiz/submit/Submit'
import Quiz from './components/pages/quiz/Quiz'
import Review from './components/pages/quiz/review/Review'


function App() {



  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/course">
            <Course />
          </Route>
          <Route path="/submit">
            <Submit />
          </Route>
          <Route path="/lecture">
            <Lecture />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/dashbroad" component={UserDash} />
          <DisplayFooter exact path="/" component={Home} />
        
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;

const DisplayFooter = ({ component: Component, ...rest}) => {
  return (
    <Route 
      {...rest}
      render={() => <React.Fragment><Component /><Footer /></React.Fragment>}
    />

  )
}
