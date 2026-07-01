import { basePrice, carOptions } from './carOptions'

export const calculatePrice = (car) => {
  return Object.keys(carOptions).reduce((total, category) => {
    const selected = carOptions[category].find((option) => option.id === car[category])
    return total + (selected?.price || 0)
  }, basePrice)
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price)
}
