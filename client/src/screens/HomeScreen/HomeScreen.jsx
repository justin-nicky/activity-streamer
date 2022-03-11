import React, {useState} from 'react'
import axios from 'axios'
import { Cards } from '../../components'

const HomeScreen = () => {

        const [message, setMessage] = useState('')
  const [postMessageSuccess, setPostMessageSuccess] = useState(false) 
        const postMessage = async () => {
            const config={ headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }}
            try {
                await axios.post('http://localhost:5000/api/messages' , {message: message},config)
setPostMessageSuccess(true)
            } catch (error) {
                
            }
        }


    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className="row">
                <div className='row my-2'>
                    <div className='d-flex justify-content-center'>
                        <textarea type="text" placeholder='Enter message' onChange={
                            (e) => setMessage(e.target.value)
                        } />
                        <button className='btn btn-outline-success mx-2' onClick={postMessage}>+ Add</button>
                    </div>
                </div>
            
                    <div className="col-md-12" >
                        <Cards postMessageSuccess={postMessageSuccess}/>
                    </div>
                
            </div>
        </div>
    )
}

export default HomeScreen