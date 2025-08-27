import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null)
  const [seats, setSeats] = useState([])
  const { busId } = useParams()
  const navigate = useNavigate()
const API=import.meta.env.VITE_API_URL
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`${API}/api/buses/${busId}/`)
        setBus(response.data)
        setSeats(response.data.seats || [])
      } catch (error) {
        console.log("Error fetching ", error)
      }
    }
    fetchBusDetails()
  }, [busId])

  const handleBook = async (seatId) => {
    if (!token) {
      alert("Please login to book the seat")
      navigate('/login')
      return
    }
    try {
      await axios.post(
        `${API}/api/bookings/`,
        { seat: seatId },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      alert("Booking successful")
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat
        )
      )
    } catch (error) {
      alert(error.response?.data?.error || "Booking Failed")
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {bus && (
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">{bus.bus_name}</h2>
          <p className="text-gray-600"><span className="font-medium">Bus Number:</span> {bus.number}</p>
          <p className="text-gray-600"><span className="font-medium">Origin:</span> {bus.origin}</p>
          <p className="text-gray-600"><span className="font-medium">Destination:</span> {bus.destination}</p>
          <p className="text-gray-600"><span className="font-medium">Start Time:</span> {bus.start_time}</p>
          <p className="text-gray-600"><span className="font-medium">Reach Time:</span> {bus.reach_time}</p>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Seats</h3>
        <div className="grid grid-cols-4 gap-4">
          {seats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleBook(seat.id)}
              disabled={seat.is_booked}
              className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 
                ${seat.is_booked 
                  ? "bg-red-500 text-white cursor-not-allowed" 
                  : "bg-green-500 text-white hover:bg-green-600"}`}
            >
              {seat.seat_number}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BusSeats
