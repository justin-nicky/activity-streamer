import React from 'react'
import { useLocation } from 'react-router-dom'
import { Signin, Signup } from '../../components'

const AuthScreen = () => {
  const location = useLocation()
  console.log({location})

  return (
    <>
    {
      location?.state?.signup === true ? <Signup /> : <Signin />}
    </>
  )
}

export default AuthScreen