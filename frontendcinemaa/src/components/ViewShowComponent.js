// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import './ViewShowComponent.css';
// import ShowService from '../services/ShowService';

// const ViewShowComponent = () => {
//   const headerStyle = {
//     color: 'Black',
//     marginLeft: '20px',
//   };

//   const [shows, setShows] = useState([]);

//   useEffect(() => {
//     getAllShows();
//   }, []);

//   const getAllShows = () => {
//     ShowService.getAllShows()
//       .then((response) => {
//         setShows(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const deleteShow = (showID) => {
//     ShowService.deleteShow(showID)
//       .then((response) => {
//         alert('Show details deleted successfully!');
//         getAllShows();
//       })
//       .catch((error) => {
//         console.log(error);
//         alert('Error: Show details could not be deleted');
//       });
//   };

//   return (
//     <div className="container">
//       <nav className="navbar navbar-expand-md navbar-light bg-light">
//         <div>
//           <h3 style={headerStyle}>OCTBS</h3>
//         </div>
//         <div className="bar">
//           <ul className="nav justify-content-end">
//             <li className="nav-item">
//               <a className="nav-link active" aria-current="page" href="/">
//                 Home
//               </a>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link" href="/theatres">
//                 Theatre Details
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="/movies">
//                 Movie Details
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="/shows">
//                 Show Details
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>
//       <h2 className="text-center">Show Details</h2>
//       <div className="addshow">
//         <Link to="/add-show" className="btn btn-primary mb-2">
//           Add Show
//         </Link>
//       </div>

//       <div style={{ marginLeft: 'auto', marginRight: '20px', width: '140px' }}>
//         <ReactHTMLTableToExcel
//           className="btn btn-success mb-2"
//           table="exportTable"
//           filename="showDetails"
//           sheet="Sheet"
//           buttonText="Export to Excel"
//         />
//       </div>

//       <table className="table table-bordered table-striped" id="exportTable">
//         <thead>
//           <th>Show Id</th>
//           <th>Movie Name</th>
//           <th>Theatre Name</th>
//           <th>Time Slot</th>
//           <th>Price Per Seat</th>
//           <th>Seats Available</th>
//           <th>Modify Show</th>
//           <th>Delete Show</th>
//         </thead>
//         <tbody>
//           {shows.map((show) => (
//             <tr key={show.showID}>
//               <td>{show.showID}</td>
//               <td>{show.movie.movieName}</td>
//               <td>{show.theatre.theatreName}</td>
//               <td>{show.timeSlot}</td>
//               <td>{show.pricePerSeat}</td>
//               <td>{show.regularSeats_available}</td>
//               <td>
//                 <Link to={`/edit-show/${show.showID}`} className="btn btn-info btn-sm mr-3">
//                   Update
//                 </Link>
//               </td>
//               <td>
//                 <button className="btn btn-danger btn-sm" onClick={() => deleteShow(show.showID)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewShowComponent;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './ViewShowComponent.css';
import ShowService from '../services/ShowService';

const ViewShowComponent = () => {
  const headerStyle = {
    color: 'Black',
    marginLeft: '20px',
  };

  const [shows, setShows] = useState([]);

  useEffect(() => {
    getAllShows();
  }, []);

  const getAllShows = () => {
    ShowService.getAllShows()
      .then((response) => {
        setShows(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteShow = (showID) => {
    ShowService.deleteShow(showID)
      .then((response) => {
        alert('Show details deleted successfully!');
        getAllShows();
      })
      .catch((error) => {
        console.log(error);
        alert('Error: Show details could not be deleted');
      });
  };

  const filteredShows = shows.map(({ showID, movie, theatre, timeSlot, pricePerSeat, regularSeats_available }) => ({
    showID,
    movieName: movie.movieName,
    theatreName: theatre.theatreName,
    timeSlot,
    pricePerSeat,
    regularSeats_available,
  }));

  return (
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div>
          <h3 style={headerStyle}>OCTBS</h3>
        </div>
        <div className="bar">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/theatres">
                Theatre Details
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movies">
                Movie Details
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shows">
                Show Details
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <h2 className="text-center">Show Details</h2>
      <div className="addshow">
        <Link to="/add-show" className="btn btn-primary mb-2">
          Add Show
        </Link>
      </div>

      <div style={{ marginLeft: 'auto', marginRight: '20px', width: '140px' }}>
        <ReactHTMLTableToExcel
          className="btn btn-success mb-2"
          table="exportTable"
          filename="showDetails"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>

      <table className="table table-bordered table-striped" >
        <thead>
          <th>Show Id</th>
          <th>Movie Name</th>
          <th>Theatre Name</th>
          <th>Time Slot</th>
          <th>Price Per Seat</th>
          <th>Seats Available</th>
          <th>Modify Show</th>
          <th>Delete Show</th>
        </thead>
        <tbody>
          {filteredShows.map((show) => (
            <tr key={show.showID}>
              <td>{show.showID}</td>
              <td>{show.movieName}</td>
              <td>{show.theatreName}</td>
              <td>{show.timeSlot}</td>
              <td>{show.pricePerSeat}</td>
              <td>{show.regularSeats_available}</td>
              <td>
                <Link to={`/edit-show/${show.showID}`} className="btn btn-info btn-sm mr-3">
                  Update
                </Link>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteShow(show.showID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hidden table for exporting */}
      <table id="exportTable" style={{ display: 'none' }}>
        <thead>
          <tr>
            <th>Show Id</th>
            <th>Movie Name</th>
            <th>Theatre Name</th>
            <th>Time Slot</th>
            <th>Price Per Seat</th>
            <th>Seats Available</th>
          </tr>
        </thead>
        <tbody>
          {filteredShows.map((show) => (
            <tr key={show.showID}>
              <td>{show.showID}</td>
              <td>{show.movieName}</td>
              <td>{show.theatreName}</td>
              <td>{show.timeSlot}</td>
              <td>{show.pricePerSeat}</td>
              <td>{show.regularSeats_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewShowComponent;

