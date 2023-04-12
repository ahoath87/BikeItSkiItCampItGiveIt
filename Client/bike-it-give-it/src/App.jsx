import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Places, Home } from './Components/Index';

function App() {
  return (
    <div className='App'>
      <div>
        {/* <LoginHere></LoginHere>
      <Register></Register> */}

        <Routes>
          <Route path='/' element={<div>HOME PAGE</div>}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/map' element={<Places />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
