import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Summary from './components/summary/Summary';
import TopTopic from './components/topTopic/TopTopic';

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
