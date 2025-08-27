import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([])
const API=import.meta.env.VITE_API_URL
  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) {
        return
      }
      try {
        const response = await axios.get(
          `${API}/api/user/${userId}/bookings/`,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        setBookings(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookings()
  }, [userId, token])

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Booking #{index + 1}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">User:</span> {item.user}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Bus:</span> {item.bus}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Seat:</span> {item.seat}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Booking Time:</span>{' '}
                {item.booking_time}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserBookings
