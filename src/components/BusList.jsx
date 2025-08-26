import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BusList = () => {

  const [buses, setBuses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/buses/')
        setBuses(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBuses()
  }, [])

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Available Buses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {bus.bus_name}
            </h3>
            <p className="text-gray-600">Bus Number: <span className="font-medium">{bus.number}</span></p>
            <p className="text-gray-600">Origin: <span className="font-medium">{bus.origin}</span></p>
            <p className="text-gray-600">Destination: <span className="font-medium">{bus.destination}</span></p>
            <p className="text-gray-600">Start Time: <span className="font-medium">{bus.start_time}</span></p>
            <p className="text-gray-600">Reach Time: <span className="font-medium">{bus.reach_time}</span></p>

            <button
              onClick={() => handleViewSeats(bus.id)}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              View Seats
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusList
