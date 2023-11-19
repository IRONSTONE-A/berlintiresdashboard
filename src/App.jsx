
import './App.css'
import LanguageContext from './context/LanguageContext'
import UserContextProvider from './context/UserContext'
import AppRouter from './router/AppRouter'

function App() {
 

  return (
    <>
      <LanguageContext>
        <UserContextProvider>
          <AppRouter/>
        </UserContextProvider>
     </LanguageContext>
    </>
  )
}

export default App
