import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import TheatreService from '../services/TheatreService';
import './ViewTheatreComponent.css';

const ViewTheatreComponent = () => {
  const headerStyle = {
    color: 'Black',
    marginLeft: '20px',
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
        alert('Theatre details deleted successfully!');
        getAllTheatres();
      })
      .catch((error) => {
        console.log(error);
        alert('Error: Theatre details could not be deleted');
      });
  };

  const filteredTheatres = theatres.map(({ theatreID, theatreName, locationName, district, noOfShows, seatingCapacity, reservationCapacityRegular }) => ({
    theatreID,
    theatreName,
    locationName,
    district,
    noOfShows,
    seatingCapacity,
    reservationCapacityRegular,
  }));

  return (
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div>
          <h3 style={headerStyle}>OCTBS</h3>
        </div>
        <div className='bar'>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/theatres">Theatre Details</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movies">Movie Details</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shows">Show Details</a>
            </li>
          </ul>
        </div>
      </nav>
      <h2 className="text-center mb-4">Theatre Details</h2>
      <Link to="/add-theatre" className="btn btn-primary mb-3">
        Add Theatre
      </Link>

      <div style={{ marginLeft: 'auto', marginRight: '20px', width: '140px' }}>
        <ReactHTMLTableToExcel
          className="btn btn-success mb-2"
          table="exportTable"
          filename="theatreDetails"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>

      <table className="table table-bordered" >
        <thead className="thead-dark align-top">
          <tr>
            <th>TId</th>
            <th>Theatre Name</th>
            <th>Metro Location</th>
            <th>District</th>
            <th>Number Of Shows</th>
            <th>Seating Capacity</th>
            <th>Reservation Capacity</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTheatres.map((theatre) => (
            <tr key={theatre.theatreID}>
              <td>{theatre.theatreID}</td>
              <td>{theatre.theatreName}</td>
              <td>{theatre.locationName}</td>
              <td>{theatre.district}</td>
              <td>{theatre.noOfShows}</td>
              <td>{theatre.seatingCapacity}</td>
              <td>{theatre.reservationCapacityRegular}</td>
              <td>
                <Link to={`/edit-theatre/${theatre.theatreID}`} className="btn btn-info btn-sm mr-3">Update</Link>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTheatre(theatre.theatreID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hidden table for exporting */}
      <table id="exportTable" style={{ display: 'none' }}>
        <thead>
          <tr>
            <th>TId</th>
            <th>Theatre Name</th>
            <th>Metro Location</th>
            <th>District</th>
            <th>Number Of Shows</th>
            <th>Seating Capacity</th>
            <th>Reservation Capacity</th>
          </tr>
        </thead>
        <tbody>
          {filteredTheatres.map((theatre) => (
            <tr key={theatre.theatreID}>
              <td>{theatre.theatreID}</td>
              <td>{theatre.theatreName}</td>
              <td>{theatre.locationName}</td>
              <td>{theatre.district}</td>
              <td>{theatre.noOfShows}</td>
              <td>{theatre.seatingCapacity}</td>
              <td>{theatre.reservationCapacityRegular}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTheatreComponent;
