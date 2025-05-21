import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
