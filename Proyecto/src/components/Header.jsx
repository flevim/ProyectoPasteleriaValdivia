import React from 'react'
import Contacto from './Contacto'
import Acceder from './Acceder'
import Nosotros from './Nosotros'
import Inicio from './Inicio'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const Header = () => {
    return (
        <Router>

            <div className=" container d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                <div className=" container mt-2"> 
                    <h3>PasteleriaValdivia</h3>
                </div>
                <div className="btn-group">
                    <Link to="/" className="btn btn-light fs-5">
                        Inicio
                    </Link>
                    <Link to="/acceder" className="btn btn-light fs-5">
                        Acceder
                    </Link>
                    <Link to="/nosotros" className="btn btn-light fs-5">
                        Nosotros
                    </Link>
                    <Link to="/contacto" className="btn btn-light fs-5">
                        Contacto
                    </Link>
                    <Link to="/carrito" className="btn btn-light fs-5">
                        Carrito
                    </Link>
                </div>
            </div>
            <Switch>
                <Route path="/" exact >
                    <Inicio />
                </Route>
                <Route path="/Acceder" >
                    <Acceder />
                </Route>
                <Route path="/Nosotros" >
                    <Nosotros />
                </Route>
                <Route path="/Contacto" >
                    <Contacto />
                </Route>
            </Switch>


        </Router>

    )
}

export default Header
