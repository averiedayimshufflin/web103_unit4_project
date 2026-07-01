export const basePrice = 85

export const carOptions = {
  color: [
    { id: 'rose-canvas', label: 'Rose Canvas', price: 10, hex: '#d9828b' },
    { id: 'sage-nylon', label: 'Sage Nylon', price: 8, hex: '#7c9a7a' },
    { id: 'cocoa-leather', label: 'Cocoa Leather', price: 32, hex: '#6b3f2a' },
    { id: 'cream-suede', label: 'Cream Suede', price: 24, hex: '#d8c3a5' }
  ],
  wheels: [
    { id: 'top-handle', label: 'Top Handle', price: 0 },
    { id: 'crossbody', label: 'Crossbody Strap', price: 18 },
    { id: 'chain', label: 'Gold Chain', price: 26 }
  ],
  package: [
    { id: 'mini', label: 'Mini', price: 0 },
    { id: 'daily', label: 'Daily Carry', price: 22 },
    { id: 'weekender', label: 'Weekender', price: 48 }
  ],
  accessory: [
    { id: 'none', label: 'None', price: 0 },
    { id: 'tassel', label: 'Tassel Charm', price: 12 },
    { id: 'laptop-sleeve', label: 'Laptop Sleeve', price: 20 }
  ]
}

export const defaultCar = {
  name: '',
  color: 'rose-canvas',
  wheels: 'top-handle',
  package: 'daily',
  accessory: 'none'
}

export const getOption = (category, id) => carOptions[category].find((option) => option.id === id)

export const getOptionLabel = (category, id) => getOption(category, id)?.label || id
