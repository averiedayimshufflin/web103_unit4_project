export const getCompatibilityError = (car) => {
  if (car.color === 'cream-suede' && car.package === 'weekender') {
    return 'Cream Suede is too delicate for the Weekender size.'
  }

  if (car.wheels === 'chain' && car.accessory === 'laptop-sleeve') {
    return 'The Gold Chain strap is not strong enough for the Laptop Sleeve add-on.'
  }

  return ''
}

export const isOptionDisabled = (car, category, optionId) => {
  if (category === 'package' && optionId === 'weekender' && car.color === 'cream-suede') {
    return true
  }

  if (category === 'color' && optionId === 'cream-suede' && car.package === 'weekender') {
    return true
  }

  if (category === 'accessory' && optionId === 'laptop-sleeve' && car.wheels === 'chain') {
    return true
  }

  if (category === 'wheels' && optionId === 'chain' && car.accessory === 'laptop-sleeve') {
    return true
  }

  return false
}
