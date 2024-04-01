import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseurl = "http://localhost:3001/v1/usuario/getLogin";
const cookies = new Cookies();

class Login extends Component{
    state={
        form:{
            username: '',
            password: ''
        }
    }
    handlechange=async e=>{
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
       // console.log(this.state.form);
    }

    iniciarSesion=async()=>{
        const usuario = this.state.form.username;
        const contra = this.state.form.password;
        axios.defaults.withCredentials = true;
        
        await axios.get(baseurl, {params: 
            {usuario: usuario, 
             contra: contra,
             estatus: 1}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0)
            {
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('apellidos', respuesta.apellidos, {path: "/"});
                cookies.set('usuario', respuesta.usuario, {path: "/"});
                cookies.set('rol', respuesta.rol, {path: "/"});
                window.location.href="./Home";
            }else{
                alert("Usuario/Contraseña incorrecto, favor de verificar");
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
    componentDidMount(){
        if(cookies.get('usuario')){
            window.location.href="./Home";
        }
    }
    

    render(){
        return(
           <main>
  <div className="container">
    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center py-4">
              <a href="index.html" className="logo d-flex align-items-center w-auto">
                <img src="assets/img/logo.png" alt />
                <span className="d-none d-lg-block">Portal Inventarios</span>
              </a>
            </div>{/* End Logo */}
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Ingresa con tu cuenta</h5>
                  <p className="text-center small">Ingresa tu usuario &amp; contraseña para acceder</p>
                </div>
                <div className="row g-3 needs-validation">
                  <div className="col-12">
                    <label htmlFor="yourUsername" className="form-label">Usuario</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend"><span className='bi bi-person-circle'></span></span>
                      <input type="text" name="username" className="form-control" onChange={this.handlechange} required />
                      <div className="invalid-feedback">Por favor ingrese su usuario!</div>
                    </div>
                  </div>
                  <div className="col-12">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend"><span className='bi bi-lock-fill'></span></span>
                      <input type="password" name="password" className="form-control" onChange={this.handlechange} required />
                      <div className="invalid-feedback">Por favor ingrese su contraseña!</div>
                    </div>                  </div>
                  <div className="col-12">
                    <button onClick={()=> this.iniciarSesion()} className="btn btn-primary w-100" type="submit">Ingresar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

        );
    }
}

export default Login;