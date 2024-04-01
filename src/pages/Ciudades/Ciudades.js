import React, { Component } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import GridCiudades from "../Ciudades/GridCiudades"
import Footer from "../Footer";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Ciudades extends Component{

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
          <GridCiudades />
          </div>
        )
    }
}

export default Ciudades;