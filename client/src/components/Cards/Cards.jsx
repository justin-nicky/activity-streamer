import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './Cards.css'

const Cards = ({ postMessageSuccess, message, id, username, messages, setPostMessageSuccess }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [editMessage, setEditMessage] = useState('')

    const getEditMessage = (id) => {
        let editMessageDetails = messages.find(message => message?.id === id)
        setEditMessage(editMessageDetails?.message)
        setIsEdit(true)
    }

    const handleEdit = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/api/messages/${id}`, { message: editMessage }, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                }
            })
            setPostMessageSuccess(value => !value)
            setIsEdit(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/messages/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                }
            })
            setPostMessageSuccess(value => !value)
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="card text-center mx-auto mt-5" key={id}>
            <div className="overflow">
                <img src="" alt=""
                    className='card-img-top'
                />
            </div>
            <div className="card-body text-dark">
                <p className="card-text text-secondary">
                    {message}
                </p>
                <span>{username}</span>
                <br />
                {isEdit && <div>
                    <textarea type="text" placeholder='Enter message'
                        value={editMessage} onChange={(e) => setEditMessage(e.target.value)} />
                </div>}
                {isEdit ? <button className='btn btn-outline-primary mx-2'
                    onClick={() => handleEdit(id)}
                >Save</button>
                    :
                    <button button className='btn btn-outline-primary mx-2'
                        onClick={() => getEditMessage(id)}
                    >Edit</button>}
                {isEdit ? <button className='btn btn-outline-danger'
                    onClick={() => setIsEdit(false)}

                >Cancel</button> :
                    <button className='btn btn-outline-danger'
                        onClick={() => handleDelete(id)}
                    >Delete</button>}
            </div>
        </div >
    )
}

export default Cards