import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({onLogin}) => {
    const API=import.meta.env.VITE_API_URL
    const [form,setForm]=useState({
        username:'',password:''
    })
    const [message,setMessage]=useState('')

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response= await axios.post(`${API}/api/login/`,form)
            console.log(response)
            setMessage("Login Successful.")
            if(onLogin){
                onLogin(response.data.token,response.data.user_id)
            }
            navigate("/my-bookings")

        } catch (error) {
            setMessage("Failed to Login."+ (error.response?.data?.username || error.message))
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        UserName
                    </label>
                    <input 
                        type='text' 
                        name='username' 
                        value={form.username} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input 
                        type='password' 
                        name='password' 
                        value={form.password} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {message && (
                    <h4 
                        className={`text-center font-semibold mb-4 ${message.includes("Successful") ? "text-green-600" : "text-red-600"}`}
                    >
                        {message}
                    </h4>
                )}
                <p class="text-gray-700">
  Dont have an account? 
  <a href="/register" class="text-blue-500 hover:text-blue-700 font-semibold">
    Register
  </a>
</p>

                <button 
                    type='submit'
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm
