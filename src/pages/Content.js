import React, { Component } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Content extends Component{
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
            
        <main style={{height: "780px"}} id="main" className="main">
 
          </main>

            
        )
    }
}

export default Content;