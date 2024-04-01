import React, { Component } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Grid from "./Grid";
import Footer from "../Footer";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class UsuariosV extends Component{

    componentDidMount(){
        if(!cookies.get('usuario')){
            window.location.href="./";
        }
    }

    render(){
       
        return(
          <div>
          <Header />
          <Sidebar />
          <Grid />
          </div>
        )
    }
}

export default UsuariosV;