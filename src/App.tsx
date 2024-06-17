import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import { useContext } from 'react'
import { isAuthorizedContext } from './context/ContextData'
import PageNotFound from './components/PageNotFound'

function App() {
const {isAuthorized}:any = useContext(isAuthorizedContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/project' element={<Project/>} />
        <Route path='/dashBoard' element={isAuthorized?<Dashboard dash={true}/>:<PageNotFound/>} />
        <Route path='/login' element={<Auth register={false}/>} />
        <Route path='/register' element={<Auth register={true} />} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
