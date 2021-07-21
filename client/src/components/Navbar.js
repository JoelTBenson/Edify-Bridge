import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <div className="d-flex justify-content-center">
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
       <Link to={'/home'} class="nav-link">Edify Bridge</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
      <Link to={'/home'} class="nav-link" >Home</Link>
      </li>
      <li class="nav-item">
      <Link to={'/classes'} class="nav-link">Classes</Link>
      </li>
      <li class="nav-item">
        <Link to={'tutors'} class="nav-link">Tutors</Link>
      </li>
      <li class="nav-item">
      <Link to={'/signup'} class="nav-link">Sign Up</Link>
      </li>
    </ul>
  </div>
</nav>
        </div>
    )
}

export default Navbar;