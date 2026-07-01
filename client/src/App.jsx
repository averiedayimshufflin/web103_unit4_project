import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCar title='BAG STUDIO | Customize' />
    },
    {
      path:'/custombags',
      element: <ViewCars title='BAG STUDIO | Custom Bags' />
    },
    {
      path: '/custombags/:id',
      element: <CarDetails title='BAG STUDIO | View' />
    },
    {
      path:'/customcars',
      element: <ViewCars title='BAG STUDIO | Custom Bags' />
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='BAG STUDIO | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BAG STUDIO | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
