import React from 'react'
import { Link } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Link to="/">App</Link>
      <Link to="/home">Home</Link>
      <Link to="about">About</Link>
    </div>
   )
}

export default Layout