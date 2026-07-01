import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { deleteCar, getAllCars } from '../services/CarsAPI'
import { formatPrice } from '../utilities/carPricing'
import { getOptionLabel } from '../utilities/carOptions'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [message, setMessage] = useState('Loading builds...')

    const loadCars = async () => {
        try {
            const data = await getAllCars()
            setCars(data)
            setMessage(data.length ? '' : 'No custom cars saved yet.')
        }
        catch (error) {
            setMessage(error.message)
        }
    }

    useEffect(() => {
        loadCars()
    }, [])

    const handleDelete = async (id) => {
        await deleteCar(id)
        setCars((current) => current.filter((car) => car.id !== id))
    }
    
    return (
        <div className="page-shell">
            <section className="page-heading">
                <p>Saved Garage</p>
                <h1>Custom Cars</h1>
            </section>

            {message && <p className="empty-state">{message}</p>}

            <section className="cars-grid">
                {cars.map((car) => (
                    <article className="saved-car" key={car.id}>
                        <header>
                            <h2>{car.name}</h2>
                            <strong>{formatPrice(car.price)}</strong>
                        </header>
                        <p>
                            {getOptionLabel('color', car.color)} paint, {getOptionLabel('wheels', car.wheels)} wheels,
                            {' '}{getOptionLabel('package', car.package)} package
                        </p>
                        <footer>
                            <Link role="button" to={`/customcars/${car.id}`}>Details</Link>
                            <Link role="button" className="secondary" to={`/edit/${car.id}`}>Edit</Link>
                            <button className="contrast" onClick={() => handleDelete(car.id)}>Delete</button>
                        </footer>
                    </article>
                ))}
            </section>
        </div>
    )
}

export default ViewCars
