export const basePrice = 24000

export const carOptions = {
  color: [
    { id: 'rally-red', label: 'Rally Red', price: 900, hex: '#c9252d' },
    { id: 'lagoon-blue', label: 'Lagoon Blue', price: 700, hex: '#1976d2' },
    { id: 'citrus-yellow', label: 'Citrus Yellow', price: 650, hex: '#f4c430' },
    { id: 'midnight-black', label: 'Midnight Black', price: 1100, hex: '#101318' }
  ],
  wheels: [
    { id: 'street', label: 'Street', price: 0 },
    { id: 'sport', label: 'Sport', price: 1300 },
    { id: 'offroad', label: 'Off-road', price: 1800 }
  ],
  package: [
    { id: 'comfort', label: 'Comfort', price: 1600 },
    { id: 'tech', label: 'Tech', price: 2400 },
    { id: 'sunset', label: 'Sunset Open-Air', price: 3200 }
  ],
  accessory: [
    { id: 'none', label: 'None', price: 0 },
    { id: 'roof-rack', label: 'Roof Rack', price: 650 },
    { id: 'aero-kit', label: 'Aero Kit', price: 1200 }
  ]
}

export const defaultCar = {
  name: '',
  color: 'rally-red',
  wheels: 'street',
  package: 'comfort',
  accessory: 'none'
}

export const getOption = (category, id) => carOptions[category].find((option) => option.id === id)

export const getOptionLabel = (category, id) => getOption(category, id)?.label || id
