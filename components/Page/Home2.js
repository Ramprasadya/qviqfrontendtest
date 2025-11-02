import React from 'react'
import { NavLink } from 'react-router-dom'
function Home2() {
  return (
    <div>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><NavLink to = "/black" className="a-nav nav-link active">Black</NavLink></li>
       
        <li className="nav-item"><NavLink to ="/test"   className="a-nav nav-link active">Qr</NavLink></li>
        <li className="nav-item"><NavLink to ="/bro"    className="a-nav nav-link active">Brower</NavLink></li>
        <li className="nav-item"><NavLink to ="/meet"   className="a-nav nav-link active">Meeting</NavLink></li>
        <li className="nav-item"><NavLink to ="/hour"   className="a-nav nav-link active">hour</NavLink></li>
        <li className="nav-item"><NavLink to ="/month"   className="a-nav nav-link active">month</NavLink></li>
        <li className="nav-item"><NavLink to ="/id"     className="a-nav nav-link active">Id For Qr</NavLink></li>
        <li className="nav-item"><NavLink to ="/tb"     className="a-nav nav-link active">Table for id</NavLink></li>
        <li className="nav-item"><NavLink to ="/Dumtb"  className="a-nav nav-link active">Dummy DataTable</NavLink></li>
        
                
      </ul>
    </div>
  )
}

export default Home2
