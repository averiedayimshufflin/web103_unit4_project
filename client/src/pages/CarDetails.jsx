import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { deleteCar, getCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/carPricing'
import { getOption, getOptionLabel } from '../utilities/carOptions'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [message, setMessage] = useState('Loading build...')

    useEffect(() => {
        const loadCar = async () => {
            try {
                const data = await getCar(id)
                setCar(data)
                setMessage('')
            }
            catch (error) {
                setMessage(error.message)
            }
        }

        loadCar()
    }, [id])

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/customcars')
    }

    if (!car) {
        return <p className="empty-state">{message}</p>
    }

    const paint = getOption('color', car.color)

    return (
        <div className="page-shell">
            <section className="detail-layout">
                <div className="preview-panel detail-preview">
                    <div className={`car-illustration wheels-${car.wheels} package-${car.package} accessory-${car.accessory}`}>
                        <div className="car-body" style={{ backgroundColor: paint?.hex }}>
                            <div className="car-window"></div>
                            <div className="car-light"></div>
                            {car.accessory === 'roof-rack' && <div className="roof-rack"></div>}
                            {car.accessory === 'aero-kit' && <div className="aero-kit"></div>}
                        </div>
                        <div className="wheel wheel-left"></div>
                        <div className="wheel wheel-right"></div>
                    </div>
                </div>

                <article className="detail-card">
                    <p>Custom Build</p>
                    <h1>{car.name}</h1>
                    <h2>{formatPrice(car.price)}</h2>
                    <dl>
                        <div><dt>Paint</dt><dd>{getOptionLabel('color', car.color)}</dd></div>
                        <div><dt>Wheels</dt><dd>{getOptionLabel('wheels', car.wheels)}</dd></div>
                        <div><dt>Package</dt><dd>{getOptionLabel('package', car.package)}</dd></div>
                        <div><dt>Accessory</dt><dd>{getOptionLabel('accessory', car.accessory)}</dd></div>
                    </dl>
                    <footer>
                        <Link role="button" to={`/edit/${car.id}`}>Edit Build</Link>
                        <button className="contrast" onClick={handleDelete}>Delete</button>
                    </footer>
                </article>
            </section>
        </div>
    )
}

export default CarDetails
