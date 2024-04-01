import React, { Component } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import GridEstados from "../Estados/GridEstados"
import Footer from "../Footer";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Estados extends Component{

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
          <GridEstados />
          </div>
        )
    }
}

export default Estados;