export const getCompatibilityError = (car) => {
  if (car.color === 'midnight-black' && car.package === 'sunset') {
    return 'Midnight Black paint cannot be paired with the Sunset Open-Air package.'
  }

  if (car.wheels === 'offroad' && car.accessory === 'aero-kit') {
    return 'Off-road wheels are not compatible with the Aero Kit.'
  }

  return ''
}

export const isOptionDisabled = (car, category, optionId) => {
  if (category === 'package' && optionId === 'sunset' && car.color === 'midnight-black') {
    return true
  }

  if (category === 'color' && optionId === 'midnight-black' && car.package === 'sunset') {
    return true
  }

  if (category === 'accessory' && optionId === 'aero-kit' && car.wheels === 'offroad') {
    return true
  }

  if (category === 'wheels' && optionId === 'offroad' && car.accessory === 'aero-kit') {
    return true
  }

  return false
}
