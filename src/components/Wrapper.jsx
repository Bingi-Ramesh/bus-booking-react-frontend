import React from 'react'
import { Link } from 'react-router-dom'

const Wrapper = ({ token, handleLogout, children }) => {
  const logout = () => {
    handleLogout()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Bus Booking App</h1>
        <div className="flex space-x-4">
          {token ? (
            <>
              <Link to="/my-bookings">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
                  My Bookings
                </button>
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Login
              </button>
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}

export default Wrapper
