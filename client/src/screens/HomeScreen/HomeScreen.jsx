import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Cards } from '../../components'
import { useNavigate } from 'react-router-dom'

const HomeScreen = ({ SetLogout }) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [postMessageSuccess, setPostMessageSuccess] = useState(false)



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/messages', {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }
                })
                setMessages(data)
            } catch (error) {

            }
        }
        fetchData()
    }, [postMessageSuccess])

    const postMessage = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }
        }
        try {
            await axios.post('http://localhost:5000/api/messages', { message: message }, config)
            setPostMessageSuccess(value => !value)
            setMessage('')
        } catch (error) {

        }
    }


    const handleSignout = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }
        }
        try {
            await axios.post('http://localhost:5000/api/users/signout', {}, config)
            setPostMessageSuccess(value => !value)
            localStorage.removeItem("user")
            SetLogout(value => !value)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className="row">
                <div className='row my-2'>
                    <div className='d-flex justify-content-center'>
                        <textarea type="text" placeholder='Enter message' onChange={(e) => setMessage(e.target.value)} value={message} />
                        <button className='btn btn-outline-success mx-2' onClick={postMessage}>+ Add</button>
                        <button className='btn btn-outline-primary mx-2' onClick={() => navigate('/live')} >Stream Activity</button>
                        <button className='btn btn-outline-danger mx-2' onClick={handleSignout} >Signout</button>
                    </div>
                </div>

                <div className="col-md-12" >
                    {messages.map((message) => (
                        <Cards postMessageSuccess={postMessageSuccess}
                            message={message?.message}
                            id={message?.id}
                            username={message?.sender?.email?.split('@')[0]}
                            messages={messages}
                            setPostMessageSuccess={setPostMessageSuccess}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeScreen