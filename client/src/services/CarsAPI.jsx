const API_BASE = '/api/cars'

const parseResponse = async (response) => {
  if (response.status === 204) {
    return null
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong.')
  }

  return data
}

export const getAllCars = async () => {
  const response = await fetch(API_BASE)
  return parseResponse(response)
}

export const getCar = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`)
  return parseResponse(response)
}

export const createCar = async (car) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
  return parseResponse(response)
}

export const updateCar = async (id, car) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
  return parseResponse(response)
}

export const deleteCar = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  })
  return parseResponse(response)
}
