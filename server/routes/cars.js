import express from 'express'
import { createCar, deleteCar, getCar, getCars, updateCar } from '../controllers/cars.js'

const router = express.Router()

router.get('/cars', getCars)
router.get('/cars/:id', getCar)
router.post('/cars', createCar)
router.put('/cars/:id', updateCar)
router.delete('/cars/:id', deleteCar)

export default router
