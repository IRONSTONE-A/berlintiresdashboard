import React, { createContext, useState } from 'react'


export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [admin,setAdmin] = useState(true)
    const [login, setLogin] = useState(true)
    // const admin = true

    const roleFunc = () => {
      setAdmin(!admin)
    }

    const signOut = () => {
      setLogin(false)
    }

    const signIn = () => {
      setLogin(true)
    }

    const values = {admin,roleFunc, login, signOut, signIn }
  return (
    <UserContext.Provider value = {values}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider