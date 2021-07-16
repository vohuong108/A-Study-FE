import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SignUp from './components/SignUp/SignUp';
import Summary from './components/summary/Summary';
import TopTopic from './components/topTopic/TopTopic';

function App() {
  return (
    <div className="App">
      <Header />
      <SignUp />
      <Footer />
    </div>
  );
}

export default App;
