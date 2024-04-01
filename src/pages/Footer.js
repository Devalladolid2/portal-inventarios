import React, { Component } from "react";


import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Footer extends Component{
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
         <footer id="footer" className="footer">
  <div className="copyright">
    © Copyright <strong><span>Valladolid</span></strong>.
  </div>
  <div className="credits">
  </div>
</footer>

          </div>
        )
    }
}

export default Footer;