import React, { useEffect, useState, Component, prevState, setData } from "react";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";

const baseurl = "http://localhost:3001/v1/";

const MySwal = withReactContent(Swal);
function GridColegios() {
  const [datax, setData] = useState([]);
  const [Regiones, setRegiones] = useState([]);
  const [Estados, setEstados] = useState([]);
  const x = (e) => {
    document.getElementById("closeButton").click();
  };
  const y = (e) => {
    document.getElementById("closeButton2").click();
  };
  const limpiar = (e) => {
    document.getElementById("homoclabe2").value = "";
    document.getElementById("nombre2").value = "";
    document.getElementById("estatus2").value = 0;
    document.getElementById("idRegion2").value = 0;
    document.getElementById("ciudad2").value = 0;
    document.getElementById("calle2").value = "";
    document.getElementById("numeroExt2").value = "";
    document.getElementById("colonia2").value = "";
    document.getElementById("codigoPostal2").value = "";
    document.getElementById("contacto2").value = "";
  };

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    homoclabe: "",
    nombre: "",
    region: "",
    ciudad: "",
    calle: "",
    numExt: "",
    colonia: "",
    codigoPostal: "",
    idcontacto: "",
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
    await axios.get(baseurl+"catalogoColegios/listaColegio").then((response) => {
      //console.log(response.data);
      setData(response.data);
    });
  };

  const getRegiones = async () => {
    await axios.get(baseurl+"CatalogoRegiones/listaRegiones").then((response) => {
      setRegiones(response.data);
      //console.log(Regiones);
    });
  };
  const getEstados = async () => {
    await axios.get(baseurl+"CatalogoCiudades/listaCiudades").then((response) => {
      setEstados(response.data);
      //console.log(Regiones);
    });
  };

  const peticionPost=async()=>{
    if(consolaSeleccionada['homoclabe'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar la homoclabe del colegio a registrar</i>,
        icon: "info",
      });
    }
    else if(consolaSeleccionada['nombre'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el nombre del colegio a registrar</i>,
        icon: "info",
      });
    }
    else if(consolaSeleccionada['region'] == 0)
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Seleccionar la región del colegio a registrar</i>,
        icon: "info",
      });
    }else if(consolaSeleccionada['ciudad'] == 0)
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Seleccionar la ciudad del colegio a registrar</i>,
        icon: "info",
      });
    }
    else if(consolaSeleccionada['calle'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar la calle del colegio a registrar</i>,
        icon: "info",
      });
    }
    else if(consolaSeleccionada['numExt'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el nombre de la ciudad a registrar</i>,
        icon: "info",
      });
    }
    else if(consolaSeleccionada['colonia'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar la colonia del colegio a registrar</i>,
        icon: "info",
      });
    }
    else if(consolaSeleccionada['codigoPostal'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el codigo postal del colegio a registrar</i>,
        icon: "info",
      });
    }
    else if(consolaSeleccionada['idcontacto'] == "")
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Favor de seleccionar un contacto para el colegio a registrar</i>,
        icon: "info",
      });
    }
    else if(consolaSeleccionada['estatus'] == 0)
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el estatus del Estado a registrar</i>,
        icon: "info",
      });
    }else{
    await axios.post(baseurl+"catalogoColegios/AgregarColegio", consolaSeleccionada)
    .then(response=>{
      peticionGet();
      y();
      MySwal.fire({
        title: <strong>Registro insertado</strong>,
        html: <i>El colegio fue agregada con exito</i>,
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
        html: <i>Ingresar el nombre de la Estado a registrar</i>,
        icon: "info",
      });
    }else if(consolaSeleccionada['idRegion'] == 0)
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Seleccionar la región del Estado a registrar</i>,
        icon: "info",
      });
    }else if(consolaSeleccionada['idEstado'] == 0)
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Seleccionar el estado a registrar</i>,
        icon: "info",
      });
    }else if(consolaSeleccionada['estatus'] == 0)
    {
      MySwal.fire({
        title: <strong>Campo vacio</strong>,
        html: <i>Ingresar el estatus de la Estado a registrar</i>,
        icon: "info",
      });
    }else{
    await axios
      .put(baseurl+"catalogoColegios/ActualizarColegio/"+ consolaSeleccionada.idColegio, consolaSeleccionada)
      .then((response) => {
        var dataNueva = datax;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.idColegio === consola.idColegio) {
            consola.homoclabe = consolaSeleccionada.homoclabe;
            consola.nombre = consolaSeleccionada.nombre;
            consola.region = consolaSeleccionada.region;
            consola.ciudad = consolaSeleccionada.ciudad;
            consola.calle = consolaSeleccionada.calle;
            consola.numExt = consolaSeleccionada.numExt;
            consola.colonia = consolaSeleccionada.colonia;
            consola.codigoPostal = consolaSeleccionada.codigoPostal;
            consola.idcontacto = consolaSeleccionada.idcontacto;
            consola.estatus = consolaSeleccionada.estatus;
          }
        });
        MySwal.fire({
          title: <strong>Registro actualizado</strong>,
          html: <i>La Estado fue actualizada con exito</i>,
          icon: "success",
        });
        x();
        setData(dataNueva);
        peticionGet();
      });
    }
  };
  const pregunta = async () => {
    MySwal.fire({
      title:
        "Seguro que quiere eliminar la ciudad " +
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
    await axios.delete(baseurl+"CatalogoCiudades/borrarCiudades/" + consolaSeleccionada.idColegio).then((response) => {
      setData(datax.filter((consola) => consola.idColegio !== consolaSeleccionada.idColegio));
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
    getRegiones();
    getEstados();
  }, []);

  const seleccionarConsola = (consola) => {
    setConsolaSeleccionada(consola);
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Ciudades</h1>
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
              title="Agregar nuevo colegio"
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
                        <th scope="col">homoclabe</th>
                        <th scope="col">nombre</th>
                        <th scope="col">Region</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Calle</th>
                        <th scope="col">Numero ext</th>
                        <th scope="col">Colonia</th>
                        <th scope="col">Codigo postal</th>
                        <th scope="col">Contacto</th>
                        <th scope="col">Estatus</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datax.map((consola) => (
                        <tr>
                          <th scope="row">{consola.idColegio}</th>
                          <td>{consola.homoclabe}</td>
                          <td>{consola.nombre}</td>
                          <td>{consola.region}</td>
                          <td>{consola.ciudad}</td>
                          <td>{consola.calle}</td>
                          <td>{consola.numExt}</td>
                          <td>{consola.colonia}</td>
                          <td>{consola.codigoPostal}</td>
                          <td>{consola.idcontacto}</td>
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
                <h5 className="modal-title">Editar ciudades</h5>
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
                            <label htmlFor="homoclabe" className="form-label">
                              Homoclabe
                            </label>
                            <input
                              name="homoclabe"
                              type="text"
                              className="form-control"
                              id="homoclabe"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.homoclabe
                              }
                            />
                          </div>
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
                            <label htmlFor="region" className="form-label">
                              Región
                            </label>
                            <select
                              name="region"
                              id="region"
                              className="form-select"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.region
                              }
                            >
                              <option value={0} selected>
                                Selecciona un Estatus
                              </option>
                              {Regiones.map((e, key) => {
                                return <option value={e.idRegion}>{e.nombre}</option>;
                            })}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="ciudad" className="form-label">
                              Ciudad
                            </label>
                            <select
                              name="ciudad"
                              id="ciudad"
                              className="form-select"
                              onChange={handleChange}                          
                               value={
                                consolaSeleccionada &&
                                consolaSeleccionada.ciudad
                              }
                            >
                              <option value={0} selected>
                                Selecciona una Ciudad
                              </option>
                              {Estados.map((e, key) => {
                                return <option value={e.idCiudad}>{e.nombre}</option>;
                            })}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="calle2" className="form-label">
                              Calle
                            </label>
                            <input
                              name="calle"
                              type="text"
                              className="form-control"
                              id="calle"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.calle
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="numeroExt" className="form-label">
                              Numero exterior
                            </label>
                            <input
                              name="numeroExt"
                              type="text"
                              className="form-control"
                              id="numeroExt"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.numExt
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="colonia2" className="form-label">
                              Colonia
                            </label>
                            <input
                              name="colonia"
                              type="text"
                              className="form-control"
                              id="colonia"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.colonia
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="codigoPostal" className="form-label">
                              Codigo postal
                            </label>
                            <input
                              name="codigoPostal"
                              type="text"
                              className="form-control"
                              id="codigoPostal"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.codigoPostal
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="contacto2" className="form-label">
                              Contacto
                            </label>
                            <input
                              name="contacto"
                              type="text"
                              className="form-control"
                              id="contacto"
                              onChange={handleChange}
                              value={
                                consolaSeleccionada &&
                                consolaSeleccionada.idcontacto
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
                <h5 className="modal-title">Agregar Colegio</h5>
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
                            <label htmlFor="homoclabe2" className="form-label">
                              Homoclabe
                            </label>
                            <input
                              name="homoclabe"
                              type="text"
                              className="form-control"
                              id="homoclabe2"
                              onChange={handleChange}
                            />
                          </div>
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
                            <label htmlFor="idRegion2" className="form-label">
                              Región
                            </label>
                            <select
                              name="region"
                              id="idRegion2"
                              className="form-select"
                              onChange={handleChange}                          
                            >
                              <option value={0} selected>
                                Selecciona una Región
                              </option>
                              {Regiones.map((e, key) => {
                                return <option value={e.idRegion}>{e.nombre}</option>;
                            })}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="ciudad2" className="form-label">
                              Ciudad
                            </label>
                            <select
                              name="ciudad"
                              id="ciudad2"
                              className="form-select"
                              onChange={handleChange}                          
                            >
                              <option value={0} selected>
                                Selecciona un estado
                              </option>
                              {Estados.map((e, key) => {
                                return <option value={e.idEstado}>{e.nombre}</option>;
                            })}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="calle2" className="form-label">
                              Calle
                            </label>
                            <input
                              name="calle"
                              type="text"
                              className="form-control"
                              id="calle2"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="numeroExt" className="form-label">
                              Numero exterior
                            </label>
                            <input
                              name="numExt"
                              type="text"
                              className="form-control"
                              id="numeroExt2"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="colonia2" className="form-label">
                              Colonia
                            </label>
                            <input
                              name="colonia"
                              type="text"
                              className="form-control"
                              id="colonia2"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="codigoPostal" className="form-label">
                              Codigo postal
                            </label>
                            <input
                              name="codigoPostal"
                              type="text"
                              className="form-control"
                              id="codigoPostal2"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="contacto2" className="form-label">
                              Contacto
                            </label>
                            <input
                              name="idcontacto"
                              type="text"
                              className="form-control"
                              id="contacto2"
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
                  Agregar Estado
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GridColegios;