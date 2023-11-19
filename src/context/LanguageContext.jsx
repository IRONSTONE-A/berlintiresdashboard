import React, { createContext, useState } from 'react'


export const LangContext = createContext()


const LanguageContext = ({children}) => {
  const [german, setGerman] = useState(false)

  const changeLanguage = () => {
    setGerman(!german)
  }

  const values = {german, changeLanguage}
  return (
    <LangContext.Provider value = {values}>{children}</LangContext.Provider>
  )
}

export default LanguageContext