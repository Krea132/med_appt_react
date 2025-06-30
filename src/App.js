import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Sign_Up from './Components/Sign_up/Sign_Up';
import Login from './Components/Login/Login';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import BookingConsultation from './Components/BookingConsultation';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      
      {/* Set up the Routes for different pages */}
          <Routes>
            
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} /> 
            <Route path='/BookingConsultation' element={<BookingConsultation />} />

            {/* Define individual Route components for different pages */}
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
