import React, { useEffect, useRef } from 'react'
import Moment from 'react-moment';
import './LiveStreamItem.css'

const LiveStreamItem = ({ username, type, scrollRef }) => {




    let message;
    if (type === 'message:added') {
        message = `${username} added a message.`
    } else if (type === 'message:updated') {
        message = `${username} updated a message.`
    } else if (type === 'message:deleted') {
        message = `${username} deleted a message.`
    } else if (type === 'logout') {
        message = `${username} logged out`
    } else if (type === 'login') {
        message = `${username} logged in`
    }



    return (
        <div className='chatitem' ref={scrollRef}>
            <div className='chatitem_content'>
                <div className="chatitem_chatmsg">{message}</div>
                <div className="chatitem_chatmeta">
                    <span className="chatitem_chatmeta_time"><Moment format='h:mm:ss a'>{Date.now()}</Moment></span>
                </div>
            </div>
        </div>
    )
}

export default LiveStreamItem