import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate()
    const [details, setDetails] = useState({ email: "", password: "" })
    const [err, setErr] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/users/signup', details)
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
        <form onSubmit={handleSubmit}>
            <div className='form-container'>
                <div className="form-inner">
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <input type="submit" value="REGISTER" />
                    <span
                        onClick={() => navigate('/signin')}
                    >Already have an account?</span>
                    {/* <a >Already have an account?</a> */}
                    {(err != "") ? (<div className="error">{err}</div>) : ""}
                </div>
            </div>
        </form >
    )
}

export default Signup