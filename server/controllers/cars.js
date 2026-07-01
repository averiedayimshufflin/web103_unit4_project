import { pool, usingPostgres } from '../config/database.js'

let demoCars = [
  {
    id: 1,
    name: 'Studio Tote',
    color: 'rose-canvas',
    wheels: 'top-handle',
    package: 'daily',
    accessory: 'tassel',
    price: 129,
    created_at: new Date().toISOString()
  }
]

const requiredFields = ['name', 'color', 'wheels', 'package', 'accessory', 'price']

const cleanCar = (body) => ({
  name: String(body.name || '').trim(),
  color: body.color,
  wheels: body.wheels,
  package: body.package,
  accessory: body.accessory,
  price: Number(body.price)
})

const validateCar = (car) => {
  const missing = requiredFields.filter((field) => !car[field] && car[field] !== 0)

  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(', ')}`
  }

  if (car.color === 'cream-suede' && car.package === 'weekender') {
    return 'Cream Suede is too delicate for the Weekender size.'
  }

  if (car.wheels === 'chain' && car.accessory === 'laptop-sleeve') {
    return 'The Gold Chain strap is not strong enough for the Laptop Sleeve add-on.'
  }

  if (!Number.isInteger(car.price) || car.price <= 0) {
    return 'Price must be a positive whole number.'
  }

  return null
}

export const getCars = async (_, res) => {
  try {
    if (!usingPostgres) {
      res.status(200).json(demoCars)
      return
    }

    const results = await pool.query('SELECT * FROM custom_bags ORDER BY created_at DESC, id DESC')
    res.status(200).json(results.rows)
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCar = async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!usingPostgres) {
      const car = demoCars.find((item) => item.id === id)
      car ? res.status(200).json(car) : res.status(404).json({ error: 'Bag not found' })
      return
    }

    const results = await pool.query('SELECT * FROM custom_bags WHERE id = $1', [id])
    results.rows[0] ? res.status(200).json(results.rows[0]) : res.status(404).json({ error: 'Bag not found' })
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createCar = async (req, res) => {
  try {
    const car = cleanCar(req.body)
    const validationError = validateCar(car)

    if (validationError) {
      res.status(400).json({ error: validationError })
      return
    }

    if (!usingPostgres) {
      const newCar = {
        id: demoCars.length ? Math.max(...demoCars.map((item) => item.id)) + 1 : 1,
        ...car,
        created_at: new Date().toISOString()
      }
      demoCars = [newCar, ...demoCars]
      res.status(201).json(newCar)
      return
    }

    const results = await pool.query(
      `INSERT INTO custom_bags (name, color, wheels, package, accessory, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [car.name, car.color, car.wheels, car.package, car.accessory, car.price]
    )
    res.status(201).json(results.rows[0])
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateCar = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const car = cleanCar(req.body)
    const validationError = validateCar(car)

    if (validationError) {
      res.status(400).json({ error: validationError })
      return
    }

    if (!usingPostgres) {
      const index = demoCars.findIndex((item) => item.id === id)
      if (index === -1) {
        res.status(404).json({ error: 'Bag not found' })
        return
      }
      demoCars[index] = { ...demoCars[index], ...car }
      res.status(200).json(demoCars[index])
      return
    }

    const results = await pool.query(
      `UPDATE custom_bags
       SET name = $1, color = $2, wheels = $3, package = $4, accessory = $5, price = $6
       WHERE id = $7
       RETURNING *`,
      [car.name, car.color, car.wheels, car.package, car.accessory, car.price, id]
    )
    results.rows[0] ? res.status(200).json(results.rows[0]) : res.status(404).json({ error: 'Bag not found' })
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteCar = async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!usingPostgres) {
      const carExists = demoCars.some((item) => item.id === id)
      demoCars = demoCars.filter((item) => item.id !== id)
      carExists ? res.status(204).send() : res.status(404).json({ error: 'Bag not found' })
      return
    }

    const results = await pool.query('DELETE FROM custom_bags WHERE id = $1 RETURNING *', [id])
    results.rows[0] ? res.status(204).send() : res.status(404).json({ error: 'Bag not found' })
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}
