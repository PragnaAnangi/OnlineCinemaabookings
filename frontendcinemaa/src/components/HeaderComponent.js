import React from 'react'
import {Link} from 'react-router-dom'
const HeaderComponent = () => {
    const headerStyle = {
        color: 'white', // Set the text color to white
        marginLeft: '20px' // Add left margin to move the text to the right
      };
  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>
                    <h3 style={headerStyle}>OCTBS</h3>
                </div>
                <Link to="/" className="btn btn-primary mb-3">
       Home
      </Link>
      <Link to="/theatres" className="btn btn-primary mb-3">
       Theatre Details
      </Link>
      <Link to="/movies" className="btn btn-primary mb-3">
       Movie Details
      </Link>
      <Link to="/shows" className="btn btn-primary mb-3">
       Show Details
      </Link>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent