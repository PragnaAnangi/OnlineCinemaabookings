import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import TheatreService from '../services/TheatreService';
import './ViewTheatreComponent.css';

const UserTheatrelist= () => {
  const navigate=useNavigate();
  const headerStyle = {
    color: 'white', // Set the text color to white
    marginLeft: '20px' // Add left margin to move the text to the right
};
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    getAllTheatres();
  }, []);

  const getAllTheatres = () => {
    TheatreService.getAllTheatres()
      .then((response) => {
        setTheatres(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTheatre = (theatreID) => {
    TheatreService.deleteTheatre(theatreID)
      .then((response) => {
        getAllTheatres();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const viewShows = (theatreID, noOfShows) => {
  //   if (noOfShows === 0) {
  //     alert('There are no shows currently for this theatre.');

  //   } else {
  //     navigate("/viewshow/" + theatreID);
  //   }
  // };



  return (
    <div className="container">
      <div>
        <header>
            {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>
                    <h3 style={headerStyle}>OCTBS</h3>
                </div>
                <Link to="/" className="btn btn-primary mb-3">
       Home
      </Link>
       <Link to="/userTheatres" className="btn btn-primary mb-3">
       Theatre Details
      </Link>
      <Link to="/userShow" className="btn btn-primary mb-3">
       Show Details and Book Ticket
      </Link>
      <Link to="/shows" className="btn btn-primary mb-3">
       Show Details
      </Link> 
            </nav> */}
        </header>
    </div>
      <h2 className="text-center mb-4">Theatre Details</h2>
      <Link to="/gotohome" className="btn btn-primary mb-3">
        Home
      </Link>
      <table className="table table-bordered">
        <thead className="thead-dark align-top">
          <tr>
            <th>TId</th>
            <th>Theatre Name</th>
            <th>Metro Location</th>
            <th>District</th>
            <th>Number Of Shows</th>
            <th>Seating Capacity</th>
            <th>Reservation Capacity</th>
            <td>View Shows</td>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {theatres.map((theatre) => (
            <tr key={theatre.theatreID}>
              <td>{theatre.theatreID}</td>
              <td>{theatre.theatreName}</td>
              <td>{theatre.locationName}</td>
              <td>{theatre.district}</td>
              <td>{theatre.noOfShows}</td>
              <td>{theatre.seatingCapacity}</td>
              <td>{theatre.reservationCapacityRegular}</td>
              <td>
                <button onClick={(e) => navigate("/viewshow/"+theatre.theatreID)}>
                  View Shows
                </button>
                </td>
              {/* <td>
                <div className="btn-group">
                  <Link to={`/edit-theatre/${theatre.theatreID}`} className="btn btn-info btn-sm mr-3">
                    Update
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTheatre(theatre.theatreID)}
                    style={{ marginLeft: '4px' }}>Delete
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default UserTheatrelist;

