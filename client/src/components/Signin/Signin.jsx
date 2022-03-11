import React, { useState } from 'react'
import axios from 'axios'
import './Signin.css'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate()
    const [details, setDetails] = useState({ email: "", password: "" })
    const [userData, setUserData] = useState('')
    const [admin, setAdmin] = useState('')
    const [err, setErr] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/users/signin', details)
            if (res.status === 200) {
                navigate('/')
                localStorage.setItem('user', JSON.stringify(res.data))
            } else {
                setErr('Something went wrong')
            }
        } catch (err) {
            setErr(err.response.data.message)
        }
    }


    return (
        <form onSubmit={handleLogin}>
            <div className='form-container'>
                <div className="form-inner">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <input type="submit" value="LOGIN" />
                    <span
                        onClick={() => navigate('/signup')}
                    >Don't have an account?</span>
                    {(err !== "") ? (<div className="error">{err}</div>) : ""}
                </div>
            </div>
        </form >
    )
}

export default Signin