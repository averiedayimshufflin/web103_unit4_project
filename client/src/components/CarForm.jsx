import React, { useMemo, useState } from 'react'
import { carOptions, getOption } from '../utilities/carOptions'
import { calculatePrice, formatPrice } from '../utilities/carPricing'
import { getCompatibilityError, isOptionDisabled } from '../utilities/carValidation'

const categoryLabels = {
  color: 'Fabric',
  wheels: 'Strap',
  package: 'Size',
  accessory: 'Add-on'
}

const CarPreview = ({ car }) => {
  const fabric = getOption('color', car.color)

  return (
    <section className="preview-panel" aria-label="Custom bag preview">
      <div className={`bag-illustration strap-${car.wheels} size-${car.package} accessory-${car.accessory}`}>
        <div className="bag-body" style={{ backgroundColor: fabric?.hex }}>
          <div className="bag-handle"></div>
          <div className="bag-pocket"></div>
          {car.accessory === 'tassel' && <div className="tassel"></div>}
          {car.accessory === 'laptop-sleeve' && <div className="laptop-sleeve"></div>}
        </div>
      </div>
      <div className="preview-meta">
        <p>{fabric?.label}</p>
        <h2>{formatPrice(calculatePrice(car))}</h2>
      </div>
    </section>
  )
}

const CarForm = ({ initialCar, submitLabel, onSubmit, busy = false }) => {
  const [car, setCar] = useState(initialCar)
  const [message, setMessage] = useState('')

  const price = useMemo(() => calculatePrice(car), [car])
  const compatibilityError = getCompatibilityError(car)

  const updateField = (field, value) => {
    setCar((current) => ({ ...current, [field]: value }))
    setMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!car.name.trim()) {
      setMessage('Give your build a name before saving.')
      return
    }

    if (compatibilityError) {
      setMessage(compatibilityError)
      return
    }

    try {
      await onSubmit({ ...car, name: car.name.trim(), price })
    }
    catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <main className="builder-layout">
      <CarPreview car={car} />

      <form className="builder-form" onSubmit={handleSubmit}>
        <label>
          Build Name
          <input
            type="text"
            value={car.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Studio Tote"
          />
        </label>

        {Object.entries(carOptions).map(([category, options]) => (
          <fieldset key={category}>
            <legend>{categoryLabels[category]}</legend>
            <div className="option-grid">
              {options.map((option) => {
                const disabled = isOptionDisabled(car, category, option.id)
                return (
                  <label
                    className={`option-card ${car[category] === option.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                    key={option.id}
                  >
                    <input
                      type="radio"
                      name={category}
                      value={option.id}
                      checked={car[category] === option.id}
                      disabled={disabled}
                      onChange={(event) => updateField(category, event.target.value)}
                    />
                    {category === 'color' && <span className="swatch" style={{ backgroundColor: option.hex }}></span>}
                    <span>{option.label}</span>
                    <small>{option.price ? `+${formatPrice(option.price)}` : 'Included'}</small>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}

        {message && <p className="form-message">{message}</p>}
        {compatibilityError && <p className="form-message">{compatibilityError}</p>}

        <div className="form-actions">
          <strong>{formatPrice(price)}</strong>
          <button type="submit" disabled={busy}>{submitLabel}</button>
        </div>
      </form>
    </main>
  )
}

export default CarForm
