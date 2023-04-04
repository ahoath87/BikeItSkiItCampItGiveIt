import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginHere, Places, Register } from './Components/Index';

function App() {
  return (
    <div className='App'>
      <h1>Home Page</h1>
      <LoginHere></LoginHere>
      <Register></Register>
      <Routes>
        <Route path='/map' element={<Places />}></Route>
      </Routes>
    </div>
  );
}

export default App;
