import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './Cards.css'

const Cards = ({postMessageSuccess}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get('http://localhost:5000/api/messages', {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }})
                setMessages(data)
            } catch (error) {
                
            }
        }
        fetchData()
    },[postMessageSuccess])
const handleEdit=async(id)=>{

try {
    await axios.patch(`http://localhost:5000/api/messages/${id}`,message, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }})
} catch (error) {
    
}
}
const getEditMessage=(id)=>{
    let editMessage=messages.find(message=>message?.id===id)
    setMessage(editMessage?.message)
    console.log(editMessage);
    setIsEdit(true)
}



    return (
        messages.map((message) => (
        <div className="card text-center mx-auto mt-5" key={message?.id}>
            <div className="overflow">
                <img src="" alt=""
                    className='card-img-top'
                />
            </div>
            <div className="card-body text-dark">
                <p className="card-text text-secondary">
                    {message?.message}
                    </p>
                    <span>{message?.sender?.email?.split('@')[0]}</span>
                    <br />
                {isEdit && <div>
                    <textarea type="text" placeholder='Enter message' 
                    value={message} onChange={(e)=>setMessage(e.target.value)}/>
                </div>}
                {isEdit ? <button className='btn btn-outline-primary mx-2'
                onClick={()=>handleEdit(message?.id)}
                >Save</button>
                    :
                    <button button className='btn btn-outline-primary mx-2'
                        onClick={() => getEditMessage(message?.id)}
                    >Edit</button>}
                {isEdit ? <button className='btn btn-outline-danger'
                    onClick={() => setIsEdit(false)}

                >Cancel</button> :
                    <button className='btn btn-outline-danger'>Delete</button>}
            </div>
        </div >
    )))
}

export default Cards