import './App.css'
import Footer from './components/pages/footer/Footer'
import Header from './components/pages/header/Header'
import Home from './components/pages/home/Home'
import Login from './components/pages/login/Login'
import UserDash from './components/pages/user/userDash/UserDash'
import Profile from './components/pages/user/profile/Profile'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import SignUp from './components/pages/SignUp/SignUp'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Course from './components/pages/course/Course'
import SignupConfirm from './SignupConfirm'
import Overview from './components/pages/course/overview/Overview'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/course/:id" component={Course} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/dashbroad" component={UserDash} />
          <Route exact path="/" component={Footer} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;

