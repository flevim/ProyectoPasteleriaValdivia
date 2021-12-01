import React from 'react'


const Card = () => {
    return (
        <div className="card">
            <img src="https://cdn.kiwilimon.com/recetaimagen/16297/th5-640x426-8238.jpg" className="img-thumbnail" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Super Torta</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                <p class="text-end">99.999$</p>
                <button type="button" className="btn btn-dark btn-sm float-end">Agregar</button>
            </div>
        </div>
    )
}

export default Card
