import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
    const [form,setForm]=useState({
        username:'',email:'',password:''
    })
    const [message,setMessage]=useState('')

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/api/register/',form)
            setMessage("Registration Successful.")
        } catch (error) {
            setMessage("Failed to Register."+ (error.response?.data?.username || error.message))
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
                    Register
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
                        Email
                    </label>
                    <input 
                        type='email' 
                        name='email' 
                        value={form.email} 
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

                <button 
                    type='submit'
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-200"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterForm
