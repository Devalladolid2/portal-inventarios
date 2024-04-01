import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "../pages/Login";
import Home from "../pages/Home";
import Usuarios from "../pages/Usuarios/Usuarios";
import GridUsuarios from "../pages/Usuarios/GridUsuarios"
import Regiones from "../pages/Regiones/Regiones"
import Estados from "../pages/Estados/Estados";
import Ciudades from "../pages/Ciudades/Ciudades";
import Colegios from "../pages/Colegios/Colegio";

function Rutas() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" Component={Login}/>
      <Route exact path="/Home" Component={Home}/>
      <Route exact path="/GridUsuarios" Component={GridUsuarios}/>
      <Route exact path="/Usuarios" Component={Usuarios}/>
      <Route exact path="/Regiones" Component={Regiones}/>
      <Route exact path="/Estados" Component={Estados}/>
      <Route exact path="/Ciudades" Component={Ciudades}/>
      <Route exact path="/Colegios" Component={Colegios}/>
    </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
