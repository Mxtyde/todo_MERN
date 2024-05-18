// import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
// import Header from './components/partials/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
      <BrowserRouter>
       {/* <Header/> */}
       <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
