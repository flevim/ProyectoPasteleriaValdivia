import React from 'react'

const Acceder = () => {
    return (
        <div className="mt-5">
            <hr />
            <h3 className="text-center">Acceso o registro de usuario</h3>

            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form>
                        <input 
                            type="usuario"
                            className="form-control mb-2"
                            placeholder="Ingrese usuario"                        
                        />
                        <input 
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese un password"                        
                        />
                        <div class="d-grid gap-2">
                            <button class="btn btn-dark btn-primary" type="button">Registrarse</button>
                            <button class="btn btn-info btn-primary" type="button">¿Ya tienes cuenta?</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Acceder
