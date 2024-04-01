import React, { Component } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import GridColegios from "../Colegios/GridColegios";
import Footer from "../Footer";

import Cookies from 'universal-cookie';


const cookies = new Cookies();

class Colegios extends Component{

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
          <GridColegios />
          </div>
        )
    }
}

export default Colegios;