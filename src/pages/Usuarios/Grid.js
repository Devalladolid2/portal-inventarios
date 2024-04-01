import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";

const baseurl = "http://localhost:3001/v1/usuario/listaUsuario";
const baseurlU ="http://localhost:3001/v1/usuario/ActualizarUsuario/"
const baseurlD ="http://localhost:3001/v1/usuario/borrarUsuario/"
const MySwal = withReactContent(Swal)
function Grid(){

const [data, setData]=useState([]);
const x = e => { document.getElementById('closeButton').click() } 
const peticionGet=async()=>{
    await axios.get(baseurl)
    .then(response=>{
        //console.log(response.data);
        setData(response.data);
    })
}
const peticionPut=async()=>{
    await axios.put(baseurlU+consolaSeleccionada.id, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.id===consola.id){
          consola.nombre=consolaSeleccionada.nombre;
          consola.apellidos=consolaSeleccionada.apellidos;
          consola.correo=consolaSeleccionada.correo;
          consola.usuario=consolaSeleccionada.usuario;
          consola.contra=consolaSeleccionada.contra;
          consola.rol=consolaSeleccionada.rol;
          consola.estatus=consolaSeleccionada.estatus;
        }
      })
      MySwal.fire({
        title: <strong>Registro actualizado</strong>,
        html: <i>El usuario fue actualizado con exito</i>,
        icon: 'success'
      });
      x();
      setData(dataNueva);
    })
  }
  const pregunta=async()=>{
    MySwal.fire({
        title: 'Seguro que quiere eliminar el usuario '+consolaSeleccionada.usuario+'?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si, eliminar',
        denyButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          peticionDelete();
        } else if (result.isDenied) {
          
        }
      });
  }

  const peticionDelete=async()=>{
    await axios.delete(baseurlD+consolaSeleccionada.id)
    .then(response=>{
      setData(data.filter(consola=>consola.id!==consolaSeleccionada.id));
      MySwal.fire({
        title: <strong>Registro Eliminado</strong>,
        html: <i>El usuario fue eliminado con exito</i>,
        icon: 'success'
      });
    })
  }
const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    nombre: '',
    apellidos: '',
    correo: '',
    usuario: '',
    contra: '',
    rol: '',
    estatus: ''
})

const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }
useEffect(() =>{
    peticionGet(); 
  },[])

  const seleccionarConsola=(consola)=>{
    setConsolaSeleccionada(consola);
  }


       
        return(
           <main id="main" className="main">
  <div className="pagetitle">
    <h1>Lista de usuarios</h1>

  </div>
  <section className="section">
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">    
            <div className="page-hero d-flex align-items-center justify-content-center">
            <table className="table datatable">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Estatus</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map(consola=>(
                    <tr>
                    <th scope="row">{consola.id}</th>
                    <td>{consola.nombre}</td>
                    <td>{consola.apellidos}</td>
                    <td>{consola.correo}</td>
                    <td>{consola.rol}</td>
                    <td>{consola.usuario}</td>
                    <td>{consola.estatus}</td>
                    <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;<i style={{cursor: "pointer"}}  data-bs-toggle="modal" onClick={()=>seleccionarConsola(consola)} data-bs-target="#verticalycentered" className="bi bi-pencil-fill" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            
          </div>
        </div>
      </div>
    </div>
            <div className="modal fade" id="verticalycentered" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Usuario</h5>
                        <button type="button" id="closeButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                    <div className="row">
      <div className="col-lg-12">

        <div className="card">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input  name="nombre" type="text" className="form-control" id="nombre" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombre}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <input  name="apellidos" type="text" className="form-control" id="apellidos" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellidos}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputEmail5" className="form-label">Correo</label>
                <input  name="correo"  type="email" className="form-control" id="inputEmail5" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <input  name="usuario" type="text" className="form-control" id="usuario" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.usuario}/>
              </div>
              <div className="col-6">
                <label htmlFor="contra" className="form-label">Contraseña</label>
                <input name="contra" type="password" className="form-control" id="contra" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.contra}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="rol" className="form-label">Rol</label>
                <select  name="rol" id="rol" className="form-select" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.rol}>
                  <option value={0} selected>Selecciona un rol</option>
                  <option value={1}>Administrador</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="estatus" className="form-label">Estatus</label>
                <select  name="estatus" id="estatus" className="form-select" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.estatus}>
                  <option value={0} selected>Selecciona un Estatus</option>
                  <option value={1}>Activo</option>
                  <option value={2}>Inactivo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={()=>peticionPut()} className="btn btn-primary">Guardar Cambios</button>
                        <button type="button" onClick={()=>pregunta()} className="btn btn-danger">Borrar usuario</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                    </div>
                    </div>
                </div>
    </div>

  </section>
</main>

        )
    
}

export default Grid;