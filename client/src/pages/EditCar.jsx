import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import CarForm from '../components/CarForm'
import { getCar, updateCar } from '../services/CarsAPI'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [message, setMessage] = useState('Loading build...')

    useEffect(() => {
        const loadCar = async () => {
            try {
                const data = await getCar(id)
                setCar({
                    name: data.name,
                    color: data.color,
                    wheels: data.wheels,
                    package: data.package,
                    accessory: data.accessory
                })
                setMessage('')
            }
            catch (error) {
                setMessage(error.message)
            }
        }

        loadCar()
    }, [id])

    const handleUpdate = async (updatedCar) => {
        await updateCar(id, updatedCar)
        navigate(`/customcars/${id}`)
    }

    if (!car) {
        return <p className="empty-state">{message}</p>
    }
    
    return (
        <div className="page-shell">
            <section className="page-heading">
                <p>Edit Studio</p>
                <h1>Refine your build</h1>
            </section>
            <CarForm initialCar={car} submitLabel="Update Build" onSubmit={handleUpdate} />
        </div>
    )
}

export default EditCar
