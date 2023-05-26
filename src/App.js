import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import ViewReservas from './components/reservas';
import Editar from './components/editar';
import Crear from './components/crear';
import EditarPublico from './components/editarU';

function App() {
  const [user,setUser] = useState("")
  function renderAdmin(){
    if(user==="Admin"){
      return (<img  src='https://cdn-icons-png.flaticon.com/512/709/709699.png?w=740&t=st=1685077945~exp=1685078545~hmac=c3ab5094e5e3bbb47e3d7fd01181cf33e1010faa4f30607d7e7272cea61c408d' style={{height:"40px"}} onClick={()=>{setUser("");window.location.href="/"}}></img>);
    }
    return (<></>)
  }
  return (
    <div className="App" style={{backgroundColor: "#F3FBFA",height:"710px"}}>
      <nav class="navbar nav-fill navbar-light bg-white  text-center justify-items-center w-100" style={{height:"60px"}}>
        <h2  style={{paddingLeft:"30px"}}>Guaw & Miaw</h2>
        <a class="float-right" style={{paddingRight:"30px"}}>{renderAdmin()}</a>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser}></Login>}/>
          <Route path="" element={<Home user={user}></Home>}/>
          <Route path="/reservas" element={<ViewReservas></ViewReservas>}/>
          <Route path="/agendar" element={<Crear/>}/>
          <Route path="/editar" element={<EditarPublico/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
