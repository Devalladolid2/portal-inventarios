import React, { Component } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import GridRegion from "../Regiones/GridRegion";
import Footer from "../Footer";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Regiones extends Component{

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
          <GridRegion />
          </div>
        )
    }
}

export default Regiones;