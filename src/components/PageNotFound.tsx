import { Link } from "react-router-dom"



function PageNotFound() {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column" style={{height:'100vh'}}>
        <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="no image" style={{height:'450px'}} />

        <h2 className="mt-5">Look like you're lost</h2>
        <h5>The page you are looking is unavailable</h5>
        <Link to={'/'}><button className="btn btn-success mt-4">GO HOME</button></Link>
    </div>
  )
}

export default PageNotFound