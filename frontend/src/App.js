import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import Navbars from './components/Navbars';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbars />
        <Footer />
        
      </Router>
    </div>
  );
}

export default App;
