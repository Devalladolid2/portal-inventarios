import React, { Component } from "react";
import Header from "../pages/Header";
import Sidebar from "../pages/Sidebar";
import Content from "../pages/Content";
import Footer from "../pages/Footer";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Home extends Component{

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
          <Content />
          </div>
        )
    }
}

export default Home;