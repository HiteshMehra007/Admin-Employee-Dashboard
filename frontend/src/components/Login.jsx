import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const { login } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if(response.ok){
                login(formData.username);
                navigate('/')
            }
            else{
                setError(result.error || "Something went wrong !");
            }
        } catch (err) {
            setError("Failed to connect to the server.");
            console.log("Failed to connect to the server\n", err);
        }
    }

  return (
    <div className='flex justify-center items-center h-screen m-0 bg-[#f4f4f4]'>
        <div className='bg-[#fff] p-5 border rounded-lg shadow-md w-[300px]'>
            <h1 className='text-center text-bold text-3xl mb-10'>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" name="username" required 
                    className='w-full p-3 mb-5 rounded-md border-solid border-[#ccc] border-2'
                    onChange={handleInputChange}
                    value={formData.username}
                />
                <input type="password" placeholder="Password" name="password" required 
                    className='w-full p-3 mb-5 rounded-md border-solid border-[#ccc] border-2'
                    onChange={handleInputChange}
                    value={formData.password}
                />
                <Link to="/register" className='pl-2 underline text-blue-500'>Dont&#39;s have an account?</Link>
                <button type="submit" className='mt-3 w-full p-3 bg-green-700 text-white border-none rounded-md text-base'>Login</button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    </div>
  )
}

export default Login