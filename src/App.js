import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Summary from './components/summary/Summary'
import Login from './components/login/Login'
import Course from './components/course/Course'
import PrivateRoute from '../src/components/routes/PrivateRoute'
import PublicRoute from '../src/components/routes/PublicRoute'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Summary} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/course" component={Course} />
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
