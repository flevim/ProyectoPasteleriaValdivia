import React from 'react'
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
const Header = () => {
    return (
        <Router>

            <div className=" container d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                <div className=" container mt-2"> 
                    <h3>Prueba</h3>
                </div>
                <div className="btn-group">
                    <Link to="/" className="btn btn-light fs-5">
                        Inicio
                    </Link>
                    <Link to="/nosotros" className="btn btn-light fs-5">
                        Nosotros
                    </Link>
                    <Link to="/contacto" className="btn btn-light fs-5">
                        Contacto
                    </Link>
                </div>
            </div>
        </Router>

    )
}

export default Header
