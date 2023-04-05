import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Places } from './Components/Index';

function App() {
  return (
    <div className='App'>
      {/* <LoginHere></LoginHere>
      <Register></Register> */}
      <Routes>
        {/* <Route path='/home' element={<Home />}></Route> */}
        <Route path='/map' element={<Places />}></Route>
      </Routes>
    </div>
  );
}

export default App;
