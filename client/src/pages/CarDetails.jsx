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
        navigate('/custombags')
    }

    if (!car) {
        return <p className="empty-state">{message}</p>
    }

    const fabric = getOption('color', car.color)

    return (
        <div className="page-shell">
            <section className="detail-layout">
                <div className="preview-panel detail-preview">
                    <div className={`bag-illustration strap-${car.wheels} size-${car.package} accessory-${car.accessory}`}>
                        <div className="bag-body" style={{ backgroundColor: fabric?.hex }}>
                            <div className="bag-handle"></div>
                            <div className="bag-pocket"></div>
                            {car.accessory === 'tassel' && <div className="tassel"></div>}
                            {car.accessory === 'laptop-sleeve' && <div className="laptop-sleeve"></div>}
                        </div>
                    </div>
                </div>

                <article className="detail-card">
                    <p>Custom Bag</p>
                    <h1>{car.name}</h1>
                    <h2>{formatPrice(car.price)}</h2>
                    <dl>
                        <div><dt>Fabric</dt><dd>{getOptionLabel('color', car.color)}</dd></div>
                        <div><dt>Strap</dt><dd>{getOptionLabel('wheels', car.wheels)}</dd></div>
                        <div><dt>Size</dt><dd>{getOptionLabel('package', car.package)}</dd></div>
                        <div><dt>Add-on</dt><dd>{getOptionLabel('accessory', car.accessory)}</dd></div>
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
