import React from 'react'
import { LiveStreamItem } from '../../components'

const LiveStreamScreen = () => {
    return (
        <div className='d-flex flex-column'>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                    <LiveStreamItem />

                ))
            }
        </div>
    )
}

export default LiveStreamScreen