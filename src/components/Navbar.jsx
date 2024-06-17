import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const storedToken = localStorage.getItem('authToken')
  const navigate = useNavigate()

  const logouthandler = () => {
    const removeToken = localStorage.removeItem('authToken')
    if(!removeToken){
      navigate('/login',{reverse: true})
    }
  }

  return (
    <>
      {!storedToken && <nav className='nav-container'>
        <Link to="/" className='nav-link'><h2>SocialTalks</h2></Link>
        <div>
          <Link to="/login" className='nav-link'>Login/</Link>
          <Link to="/signup" className='nav-link'>SignUp</Link>
        </div>
      </nav>}
      {storedToken &&
        <nav className='nav-container'>
          <Link to="/" className='nav-link'><h2>SocialTalks</h2></Link>
          <ul>
            <Link to="/profile" className='nav-link'><li>Profile</li></Link>
            <Link to="/newpost" className='nav-link'><li>New Post</li></Link>
          </ul>
          <button onClick={logouthandler}>LogOut</button>
        </nav>
      }
    </>
  )
}

export default Navbar