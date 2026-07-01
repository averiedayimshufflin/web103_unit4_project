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
            setMessage(data.length ? '' : 'No custom bags saved yet.')
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
                <p>Saved Closet</p>
                <h1>Custom Bags</h1>
            </section>

            {message && <p className="empty-state">{message.replace('cars', 'bags')}</p>}

            <section className="cars-grid">
                {cars.map((car) => (
                    <article className="saved-car" key={car.id}>
                        <header>
                            <h2>{car.name}</h2>
                            <strong>{formatPrice(car.price)}</strong>
                        </header>
                        <p>
                            {getOptionLabel('color', car.color)}, {getOptionLabel('wheels', car.wheels)},
                            {' '}{getOptionLabel('package', car.package)} size
                        </p>
                        <footer>
                            <Link role="button" to={`/custombags/${car.id}`}>Details</Link>
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
