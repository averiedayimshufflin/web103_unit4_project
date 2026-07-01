import express from 'express'
import { createCar, deleteCar, getCar, getCars, updateCar } from '../controllers/cars.js'

const router = express.Router()

router.get('/bags', getCars)
router.get('/bags/:id', getCar)
router.post('/bags', createCar)
router.put('/bags/:id', updateCar)
router.delete('/bags/:id', deleteCar)

export default router
