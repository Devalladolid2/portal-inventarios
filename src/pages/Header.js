import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Header extends Component{
  cerrarSesion=()=>{
    cookies.remove('id', {path: "/"});
    cookies.remove('nombre', {path: "/"});
    cookies.remove('apellidos', {path: "/"});
    cookies.remove('rol', {path: "/"});
    cookies.remove('usuario', {path: "/"});
    window.location.href="./";
}


    render(){
       
        return(
         
  <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="d-flex align-items-center justify-content-between">
      <a href="index.html" className="logo d-flex align-items-center">
        <img src="assets/img/logo.png" alt />
        <span className="d-none d-lg-block">Portal Inventarios</span>
      </a>
      <i className="bi bi-list toggle-sidebar-btn" />
    </div>
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        <li className="nav-item d-block d-lg-none">
          <a className="nav-link nav-icon search-bar-toggle " href="#">
            <i className="bi bi-search" />
          </a>
        </li>
        <li className="nav-item dropdown pe-3">
          <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
          <div className="avatar-title">
                    {cookies.get('nombre').substring(0, 1)}
            </div>
          <span className="d-none d-md-block dropdown-toggle ps-2">{cookies.get('nombre')} {cookies.get('apellidos')}</span>
          </a>
          <ul  className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li className="dropdown-header">
              <h6>{cookies.get('nombre')} {cookies.get('apellidos')}</h6>
              <span>Administrador</span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                <i className="bi bi-person" />
                <span>Mi perfil</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                <i className="bi bi-gear" />
                <span>Configuraciòn</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <i className="bi bi-box-arrow-right" />
                <span onClick={()=>this.cerrarSesion()}>Cerrar Sesiòn</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>


           
        )
    }
}

export default Header;