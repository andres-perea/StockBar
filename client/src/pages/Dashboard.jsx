import React from "react";
import { Link } from "react-router-dom";
import Bebidas from "./Bebidas";
import "../Dashboard.css";
import {Layout} from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./components/logo";
import Menu from "./components/Menu";





function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <>
    
       <Layout>
    <sider className="sidebar">
      <Logo />
      <Menu />
    </sider>
    </Layout>

  
    <div className="row">
      <div className="col-sm-4">
      <h1 className="text-title">Dashboard</h1>
      </div>
      <div className="col-sm-4">
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="boton btn btn-outline-success" type="submit">Search</button>
      </form>
      </div>
      <div className="col-sm-4">
      <button className="boton" onClick={handleLogout}>Cerrar sesion</button>
    </div>
    </div>
<hr />
  <center>
    <div class="row cards">
  <div class="col-sm-4 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
</div>
</center>
    
    </>
  );
}

export default Dashboard;
