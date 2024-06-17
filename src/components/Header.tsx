import { faStackOverflow } from "@fortawesome/free-brands-svg-icons"
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { Container, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { isAuthorizedContext } from "../context/ContextData"


function Header({dash}:any) {
   const navigate = useNavigate()
   const {setIsAuthorized}:any = useContext(isAuthorizedContext)

  const handleLogout = ()=>{
    
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    alert('logout successfull')
   
      navigate('/')
    
  }
  return (
    <Navbar style={{backgroundColor:'rgb(27, 194, 158)'}}>
    <Container>
      <Link to={'/'} style={{ textDecoration:'none'}}>
          <Navbar.Brand className='text-light'>
          <FontAwesomeIcon icon={faStackOverflow} className='fa-3x' />
           <span className='fs-3'> Project Fair</span>
          </Navbar.Brand>
      </Link>
      {dash && <button type="button" className='btn btn-warning' onClick={handleLogout}> <FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>}
    </Container>
  </Navbar>
  )
}

export default Header