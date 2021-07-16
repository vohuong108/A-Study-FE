import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Login from './components/login/Login'
import SignUp from './components/SignUp/SignUp'
import Summary from './components/summary/Summary'
import TopTopic from './components/topTopic/TopTopic'
import UserDash from './components/user/userDash/UserDash.js'


function App() {
  return (
    <div className="App">
      <Header />
      <UserDash />
      <Footer />
    </div>
  );
}

export default App;
