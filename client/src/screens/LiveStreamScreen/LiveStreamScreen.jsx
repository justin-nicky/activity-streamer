import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { LiveStreamItem } from '../../components'

const LiveStreamScreen = () => {
    const socket = useRef()
    const scrollRef = useRef();
    const [liveStream, setLiveStream] = useState([])
    useEffect(() => {
        socket.current = io(
            "http://localhost:5000", {
            path: '/api/socket.io',
            transports: ["websocket"],
            auth: { token: JSON.parse(localStorage.getItem("user")).token }
        });


        socket.current.on("connect", () => {
            console.log("connected");
            console.log(socket.current.id);

        });
        socket.current.on("connect_error", () => {
            console.log("error", socket.current)
            setTimeout(() => {
                socket.current.connect();
            }, 5000);
        });

        socket.current.on("disconnect", (reason) => {
            console.log("disconnected", reason);
        });
    }, [])

    useEffect(() => {
        if (socket.current) {
            socket.current.on("activity", (msg) => {
                console.log(msg);
                setLiveStream(prevmsg => [...prevmsg, msg])
            })
        }
    }, [socket])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [liveStream]);



    return (
        <div className='d-flex flex-column'>
            {
                liveStream?.map((stream) => (
                    <LiveStreamItem
                        type={stream?.type}
                        username={stream?.user?.email?.split('@')[0]}
                        scrollRef={scrollRef}
                    />

                ))
            }
        </div>
    )
}

export default LiveStreamScreen