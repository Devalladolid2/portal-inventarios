import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import Header from "../pages/Header";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Sidebar extends Component{
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('apellidos', {path: "/"});
        cookies.remove('rol', {path: "/"});
        cookies.remove('usuario', {path: "/"});
        window.location.href="./";

    }

    componentDidMount(){
        if(!cookies.get('usuario')){
            window.location.href="./";
        }
    }

    render(){
       
        return(
           <div>
  <aside id="sidebar" className="sidebar">
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
        <a className="nav-link " href="http://localhost:3000/Home">
          <i className="bi bi-grid" />
          <span href="http://localhost:3000/Home">Menu Principal</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-person" /><span>Usuarios</span><i className="bi bi-chevron-down ms-auto" />
        </a>
        <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
            <a href="http://localhost:3000/Usuarios">
              <i className="bi bi-circle" /><span>Alta de usuario</span>
            </a>
          </li>
          <li>
            <a href="http://localhost:3000/GridUsuarios">
              <i className="bi bi-circle" /><span>Lista de usuarios</span>
            </a>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-mortarboard" /><span>Colegios</span><i className="bi bi-chevron-down ms-auto" />
        </a>
        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a href="http://localhost:3000/Colegios">
              <i className="bi bi-circle" /><span>Colegios</span>
            </a>
          </li>
          <li>
            <a href="http://localhost:3000/Regiones">
              <i className="bi bi-circle" /><span>Regiones</span>
            </a>
          </li>
          <li>
            <a href="http://localhost:3000/Estados">
              <i className="bi bi-circle" /><span>Estados</span>
            </a>
          </li>
          <li>
            <a href="http://localhost:3000/Ciudades">
              <i className="bi bi-circle" /><span>Ciudades</span>
            </a>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-people" /><span>Colaboradores</span><i className="bi bi-chevron-down ms-auto" />
        </a>
        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a href="tables-general.html">
              <i className="bi bi-circle" /><span>Lista Colaboradores</span>
            </a>
          </li>
          <li>
            <a href="tables-data.html">
              <i className="bi bi-circle" /><span>Datos colaborador</span>
            </a>
          </li>
        </ul>
      </li>{/* End Tables Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-bar-chart" /><span>Charts</span><i className="bi bi-chevron-down ms-auto" />
        </a>
        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a href="charts-chartjs.html">
              <i className="bi bi-circle" /><span>Chart.js</span>
            </a>
          </li>
          <li>
            <a href="charts-apexcharts.html">
              <i className="bi bi-circle" /><span>ApexCharts</span>
            </a>
          </li>
          <li>
            <a href="charts-echarts.html">
              <i className="bi bi-circle" /><span>ECharts</span>
            </a>
          </li>
        </ul>
      </li>{/* End Charts Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-gem" /><span>Icons</span><i className="bi bi-chevron-down ms-auto" />
        </a>
        <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a href="icons-bootstrap.html">
              <i className="bi bi-circle" /><span>Bootstrap Icons</span>
            </a>
          </li>
          <li>
            <a href="icons-remix.html">
              <i className="bi bi-circle" /><span>Remix Icons</span>
            </a>
          </li>
          <li>
            <a href="icons-boxicons.html">
              <i className="bi bi-circle" /><span>Boxicons</span>
            </a>
          </li>
        </ul>
      </li>{/* End Icons Nav */}
      <li className="nav-heading">Pages</li>
      <li className="nav-item">
        <a className="nav-link collapsed" href="users-profile.html">
          <i className="bi bi-person" />
          <span>Profile</span>
        </a>
      </li>{/* End Profile Page Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="pages-faq.html">
          <i className="bi bi-question-circle" />
          <span>F.A.Q</span>
        </a>
      </li>{/* End F.A.Q Page Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="pages-contact.html">
          <i className="bi bi-envelope" />
          <span>Contact</span>
        </a>
      </li>{/* End Contact Page Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="pages-register.html">
          <i className="bi bi-card-list" />
          <span>Register</span>
        </a>
      </li>{/* End Register Page Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="pages-login.html">
          <i className="bi bi-box-arrow-in-right" />
          <span>Login</span>
        </a>
      </li>{/* End Login Page Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="pages-error-404.html">
          <i className="bi bi-dash-circle" />
          <span>Error 404</span>
        </a>
      </li>{/* End Error 404 Page Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="pages-blank.html">
          <i className="bi bi-file-earmark" />
          <span>Blank</span>
        </a>
      </li>{/* End Blank Page Nav */}
    </ul>
  </aside>{/* End Sidebar*/}
</div>


        )
    }
}

export default Sidebar;