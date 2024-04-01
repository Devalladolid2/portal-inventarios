import React, { Component, useState, prevState, setData } from "react";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
const baseurl = "http://localhost:3001/v1/usuario/AgregarUsuario";
const cookies = new Cookies();
const MySwal = withReactContent(Swal)
function AltaUsuarios(){
  
    const[data, setData]=useState([]);


    const [Datos, setDatos]=useState({
        nombre: '',
        apellidos: '',
        correo: '',
        usuario: '',
        contra: '',
        rol: '',
        estatus: ''
    })

    const handlechange=e=>{
     const {name, value}=e.target;
     setDatos(prevState=>({
        ...prevState,
        [name]: value
     }))
     //console.log(Datos);
    }

    const guardarUsuario=async()=>{
        console.log(Datos);
        await axios.post(baseurl, Datos)
        .then(response=>{
            setData(data.concat(response.data))
            MySwal.fire({
                title: <strong>Registro Agregado</strong>,
                html: <i>El usuario fue agregado con exito</i>,
                icon: 'success'
              });
    })
    }
   
  

  
        return(
           <main id="main" className="main">
  <div className="pagetitle">
    <h1>Alta de usuarios</h1>
  </div>
  <section className="section">
    <div className="row">
      <div className="col-lg-12">

        <div className="card">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input onChange={handlechange} name="nombre" type="text" className="form-control" id="nombre" />
              </div>
              <div className="col-md-6">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <input onChange={handlechange} name="apellidos" type="text" className="form-control" id="apellidos" />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputEmail5" className="form-label">Correo</label>
                <input onChange={handlechange} name="correo"  type="email" className="form-control" id="inputEmail5" />
              </div>
              <div className="col-md-6">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <input onChange={handlechange} name="usuario" type="text" className="form-control" id="usuario" />
              </div>
              <div className="col-6">
                <label htmlFor="contra" className="form-label">Contraseña</label>
                <input onChange={handlechange} name="contra" type="password" className="form-control" id="contra" />
              </div>
              <div className="col-md-6">
                <label htmlFor="rol" className="form-label">Rol</label>
                <select onChange={handlechange} name="rol" id="rol" className="form-select">
                  <option value={0} selected>Selecciona un rol</option>
                  <option value={1}>Administrador</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="estatus" className="form-label">Estatus</label>
                <select onChange={handlechange} name="estatus" id="estatus" className="form-select">
                  <option value={0} selected>Selecciona un Estatus</option>
                  <option value={1}>Activo</option>
                  <option value={2}>Inactivo</option>
                </select>
              </div>
              <hr></hr>
                            <div className="text-center">
                <button onClick={guardarUsuario}  type="submit" className="btn btn-primary">Guardar</button>
                <button type="reset" className="btn btn-secondary">Reset</button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

        )
  
}

export default AltaUsuarios;