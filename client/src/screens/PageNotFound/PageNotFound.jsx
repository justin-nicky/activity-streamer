import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
            <div className="pagenotfound_wrapper">
                <div className="pagenotfound_wrapper_details">
                    <h1>Page not found !</h1>
                    <p>The page you were looking for doesn't exist. You may have mistyped <br /> the address or the page may have removed.</p>
                    <Link to="/">
                        <button className='btn btn-outline-primary'>Go to home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound