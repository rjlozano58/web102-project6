import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='nav-title'>BrewBound!🍺</div>
        <div className='links-container'>
            <div><Link to="/">Home</Link></div>
            <div><Link to="/about">About</Link></div>
        </div>
    </div>
  )
}

export default Navbar