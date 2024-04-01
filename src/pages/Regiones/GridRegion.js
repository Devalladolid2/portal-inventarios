import React, { useEffect, useState, Component, prevState, setData } from "react";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";

const baseurlA = "http://localhost:3001/v1/CatalogoRegiones/AgregarRegiones";
const baseurl = "http://localhost:3001/v1/CatalogoRegiones/listaRegiones";
const baseurlU ="http://localhost:3001/v1/CatalogoRegiones/ActualizarRegiones/";
const baseurlD = "http://localhost:3001/v1/CatalogoRegiones/borrarRegiones/";
const MySwal = withReactContent(Swal);
function GridRegion() {
  const [datax, setData] = useState([]);
  const x = (e) => {
    document.getElementById("closeButton").click();
  };
  const y = (e) => {
    document.getElementById("closeButton2").click();
  };
  const limpiar = (e) => {
    document.getElementById("nombre2").value = "";
    document.getElementById("estatus2").value = 0;
  };

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    nombre: "",
    estatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(consolaSeleccionada);
  };

  const peticionGet = async () => {
    await axios.get(baseurl).then((response) => {
      //console.log(response.data);
      setData(response.data);
    });
  };

  const peticionPost=async()=>{
    if(consolaSeleccionada['nombre'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el nombre de la región a registrar</i>,
        icon: "info",
      });
    }else if(consolaSeleccionada['estatus'] == 0)
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el estatus de la región a registrar</i>,
        icon: "info",
      });
    }else{
    await axios.post(baseurlA, consolaSeleccionada)
    .then(response=>{
      peticionGet();
      y();
      MySwal.fire({
        title: <strong>Registro insertado</strong>,
        html: <i>La región fue agregada con exito</i>,
        icon: "success",
      });

    })
  }
  }
  const peticionPut = async () => {
    if(consolaSeleccionada['nombre'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el nombre de la región a registrar</i>,
        icon: "info",
      });
    }else if(consolaSeleccionada['estatus'] == 0)
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el estatus de la región a registrar</i>,
        icon: "info",
      });
    }else{
    await axios
      .put(baseurlU + consolaSeleccionada.idRegion, consolaSeleccionada)
      .then((response) => {
        var dataNueva = datax;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.idRegion === consola.idRegion) {
            consola.nombre = consolaSeleccionada.nombre;
            consola.estatus = consolaSeleccionada.estatus;
          }
        });
        MySwal.fire({
          title: <strong>Registro actualizado</strong>,
          html: <i>La región fue actualizada con exito</i>,
          icon: "success",
        });
        x();
        setData(dataNueva);
      });
    }
  };
  const pregunta = async () => {
    MySwal.fire({
      title:
        "Seguro que quiere eliminar la región " +
        consolaSeleccionada.nombre +
        "?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si, eliminar",
      denyButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        peticionDelete();
      } else if (result.isDenied) {
      }
    });
  };

  const peticionDelete = async () => {
    await axios.delete(baseurlD + consolaSeleccionada.idRegion).then((response) => {
      setData(datax.filter((consola) => consola.idRegion !== consolaSeleccionada.idRegion));
      MySwal.fire({
        title: <strong>Registro Eliminado</strong>,
        html: <i>El usuario fue eliminado con exito</i>,
        icon: "success",
      });
      x();
    });
  };
 
  useEffect(() => {
    peticionGet();
  }, []);

  const seleccionarConsola = (consola) => {
    setConsolaSeleccionada(consola);
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Regiones</h1>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
            <div className="row">
            <div className="col-lg-11"></div>
          <div className="col-lg-1">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#registroRegiones"
              className="btn btn-primary"
              title="Agregar nueva regiòn"
              onClick={() => limpiar()}
            >
              <span className="bi bi-plus-circle"></span>
            </button>
          </div>
          </div>
              <div style={{ height: "758px", overflow: "auto" }} className="card-body">
                <div className="page-hero d-flex align-items-center justify-content-center">
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Estatus</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datax.map((consola) => (
                        <tr>
                          <th scope="row">{consola.idRegion}</th>
                          <td>{consola.nombre}</td>
                          <td>{consola.estatus}</td>
                          <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <i
                              style={{ cursor: "pointer" }}
                              data-bs-toggle="modal"
                              onClick={() => seleccionarConsola(consola)}
                              data-bs-target="#verticalycentered"
                              className="bi bi-pencil-fill"
                            />
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
                <h5 className="modal-title">Editar Regiones</h5>
                <button
                  type="button"
                  id="closeButton"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">
                              Nombre
                            </label>
                            <input
                              name="nombre"
                              type="text"
                              className="form-control"
                              id="nombre"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.nombre
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="estatus" className="form-label">
                              Estatus
                            </label>
                            <select
                              name="estatus"
                              id="estatus"
                              className="form-select"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.estatus
                              }
                            >
                              <option value={0} selected>
                                Selecciona un Estatus
                              </option>
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
                <button
                  type="button"
                  onClick={() => peticionPut()}
                  className="btn btn-primary"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => pregunta()}
                  className="btn btn-danger"
                >
                  Borrar usuario
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="registroRegiones" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar regiòn</h5>
                <button
                  type="button"
                  id="closeButton2"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">
                              Nombre
                            </label>
                            <input
                              name="nombre"
                              type="text"
                              className="form-control"
                              id="nombre2"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="estatus" className="form-label">
                              Estatus
                            </label>
                            <select
                              name="estatus"
                              id="estatus2"
                              className="form-select"
                              onChange={handleChange}
                            >
                              <option value={0} selected>
                                Selecciona un Estatus
                              </option>
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
                <button
                  type="button"
                  onClick={() => peticionPost()}
                  className="btn btn-primary"
                >
                  Agregar regiòn
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GridRegion;