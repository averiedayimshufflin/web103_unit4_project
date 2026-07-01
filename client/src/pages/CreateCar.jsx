import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import CarForm from '../components/CarForm'
import { createCar } from '../services/CarsAPI'
import { defaultCar } from '../utilities/carOptions'

const CreateCar = () => {
    const navigate = useNavigate()

    const handleCreate = async (car) => {
        const savedCar = await createCar(car)
        navigate(`/custombags/${savedCar.id}`)
    }

    return (
        <div className="page-shell">
            <section className="page-heading">
                <p>Design Studio</p>
                <h1>Build a custom bag</h1>
            </section>
            <CarForm initialCar={defaultCar} submitLabel="Save Build" onSubmit={handleCreate} />
        </div>
    )
}

export default CreateCar
