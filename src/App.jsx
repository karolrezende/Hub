import { Route, Routes } from "react-router-dom"
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import NotFound from "./components/NotFound/NotFound"
import { useEffect, useState } from "react"
function App() {
  const [auth, setAuth] = useState(false)

  useEffect(()=>{
    function isAuth(){
      const user = localStorage.getItem('token')
  
      if(user != null){
        setAuth(true)
      }
    }isAuth()
  },[])
  return(
    <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
          <Route path='/home'element={auth ? <Home/> : <Login/>}/>
          <Route path='*'element={<NotFound/>}/>
    </Routes>
  )
}

export default App