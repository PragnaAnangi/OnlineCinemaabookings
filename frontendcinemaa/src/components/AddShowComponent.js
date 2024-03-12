// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link, useParams } from 'react-router-dom';
// import './AddMovieComponent.css'; // Import the CSS file for styling
// import ShowService from '../services/ShowService';

// const AddShowComponent = () => {
//   const [movieID, setMovie] = useState('');
//   const [theatreID, setTheatre] = useState('');
//   const [timeSlot, setTimeSlot] = useState('');
//   const [pricePerSeat, setPricePerSeat] = useState('');
//   const [regularSeats_available, setRegularSeats_available] = useState('');
//   const [formErrors, setFormErrors] = useState({});
//   const navigate = useNavigate();
//   const { showID } = useParams();

//   const validateForm = () => {
//     const errors = {};

//     if (!movieID) {
//         errors.movieID = 'Movie ID is required';
//       }
  
//       if (!theatreID) {
//         errors.theatreID = 'Theatre ID is required';
//       }

//     if (!timeSlot.trim()) {
//       errors.timeSlot = 'Time Slot is required';
//     }

//     if (isNaN(parseFloat(pricePerSeat)) || parseFloat(pricePerSeat) <= 0) {
//       errors.pricePerSeat = 'Price Per Seat must be a positive number';
//     }

//     // if (isNaN(regularSeats_available) || regularSeats_available < 0) {
//     //   errors.regularSeats_available = 'Seats Available must be a non-negative number';
//     // }

//     const parsedRegularSeats = parseInt(regularSeats_available, 10);
//     if (isNaN(parsedRegularSeats) || parsedRegularSeats < 0) {
//       errors.regularSeats_available = 'Seats Available must be a non-negative integer';
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const saveOrUpdateShow = (e) => {
//     e.preventDefault();

//     const isFormValid = validateForm();
//     if (!isFormValid) {
//       // form validation failed
//       return;
//     }

//     const show = { movieID, theatreID, timeSlot, pricePerSeat, regularSeats_available };

//     if (showID) {
//         ShowService.updateShow(showID, show)
//           .then((response) => {
//             alert('Show details updated successfully!');
//             navigate('/shows');
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } else {
//         ShowService.createShow(show)
//           .then((response) => {
//             alert('Show details added successfully!');
//             navigate('/shows');
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     };

//     if (showID) {
//       ShowService.updateShow(showID, show)
//         .then((response) => {

//           navigate('/shows');
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       ShowService.createShow(show)
//         .then((response) => {
//           console.log(response.data);
//           navigate('/shows');
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   useEffect(() => {
//     ShowService.getShowByID(showID)
//       .then((response) => {
//         setMovie(response.data.movie.movieID);
//         setTheatre(response.data.theatre.theatreID);
//         setTimeSlot(response.data.timeSlot);
//         setPricePerSeat(response.data.pricePerSeat);
//         setRegularSeats_available(response.data.regularSeats_available);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [showID]);

//   const title = () => {
//     if (showID) {
//       return <h2 className="text-center"> Update Show</h2>;
//     } else {
//       return <h2 className="text-center">Add Show</h2>;
//     }
//   };

//   return (
//     <div>
//       <br></br>
//       <div className="container">
//         <div className="row">
//           <div className="card col-md-6 offset-md-3 offset-md-3">
//             {title()}
//             <div className="card-body">
//               <form onSubmit={(e) => saveOrUpdateShow(e)}>
//                 <div className="form-group mb-2">
//                   <label className="form-label left-label">Movie ID:</label>
//                   <input
//                     type="number"
//                     placeholder="Enter movie id"
//                     name="movieID"
//                     className={`form-control ${formErrors.movieID ? 'is-invalid' : ''}`}
//                     value={movieID}
//                     onChange={(e) => setMovie(e.target.value)}
//                   />
//                   {formErrors.movieID && (
//                     <div className="invalid-feedback">{formErrors.movieID}</div>
//                   )}
//                 </div>
//                 <div className="form-group mb-2">
//                   <label className="form-label left-label">Theatre ID</label>
//                   <input
//                     type="number"
//                     placeholder="Enter theatre id"
//                     name="theatreID"
//                     className={`form-control ${formErrors.theatreID ? 'is-invalid' : ''}`}
//                     value={theatreID}
//                     onChange={(e) => setTheatre(e.target.value)}
//                   />
//                   {formErrors.theatreID && (
//                     <div className="invalid-feedback">{formErrors.theatreID}</div>
//                   )}
//                 </div>

//                 <button className="btn btn-success" type="submit">
//                   Submit{' '}
//                 </button>
//                 <Link to="/shows" className="btn btn-danger">
//                   Cancel
//                 </Link>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddShowComponent;


import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
// import './AddMovieComponent.css'; // Import the CSS file for styling
import './AddShowComponent.css';
import ShowService from '../services/ShowService';
import MovieService from '../services/MovieService';
import TheatreService from '../services/TheatreService';

const AddShowComponent = () => {
  const [movieID, setMovie] = useState('');
  const [theatreID, setTheatre] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [pricePerSeat, setPricePerSeat] = useState('');
  const [regularSeats_available, setRegularSeats_available] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();
  const { showID } = useParams();

  useEffect(() => {
    // Fetch movies and theatres when the component mounts
    MovieService.getAllMovies()
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));

    TheatreService.getAllTheatres()
      .then(response => setTheatres(response.data))
      .catch(error => console.error('Error fetching theatres:', error));

    // If editing a show, fetch the show details
    if (showID) {
      ShowService.getShowByID(showID)
        .then((response) => {
          setMovie(response.data.movieID);
          setTheatre(response.data.theatreID);
          setTimeSlot(response.data.timeSlot);
          setPricePerSeat(response.data.pricePerSeat);
          setRegularSeats_available(response.data.regularSeats_available);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [showID]);

  const validateForm = () => {
    const errors = {};

    if (!movieID) {
      errors.movieID = 'Movie ID is required';
    }

    if (!theatreID) {
      errors.theatreID = 'Theatre ID is required';
    }

    if (!timeSlot.trim()) {
      errors.timeSlot = 'Time Slot is required';
    }

    if (isNaN(parseFloat(pricePerSeat)) || parseFloat(pricePerSeat) <= 0) {
      errors.pricePerSeat = 'Price Per Seat must be a positive number';
    }

    const parsedRegularSeats = parseInt(regularSeats_available, 10);
    if (isNaN(parsedRegularSeats) || parsedRegularSeats < 0) {
      errors.regularSeats_available = 'Seats Available must be a non-negative integer';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const saveOrUpdateShow = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (!isFormValid) {
      // form validation failed
      return;
    }

    const show = { movieID, theatreID, timeSlot, pricePerSeat, regularSeats_available };

    if (showID) {
      ShowService.updateShow(showID, show)
        .then(() => {
          alert('Show details updated successfully!');
          navigate('/shows');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ShowService.createShow(show)
        .then(() => {
          alert('Show details added successfully!');
          navigate('/shows');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (showID) {
      return <h2 className="text-center"> Update Show</h2>;
    } else {
      return <h2 className="text-center">Add Show</h2>;
    }
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form onSubmit={(e) => saveOrUpdateShow(e)}>
                <div className="form-group mb-2">
                  <label className="form-label left-label">Movie:</label>
                  <select
                    className={`form-control ${formErrors.movieID ? 'is-invalid' : ''}`}
                    value={movieID}
                    onChange={(e) => setMovie(e.target.value)}
                  >
                    <option value="" disabled>Select Movie</option>
                    {movies.map(movie => (
                      <option key={movie.movieID} value={movie.movieID}>{movie.movieName}</option>
                    ))}
                  </select>
                  {formErrors.movieID && (
                    <div className="invalid-feedback">{formErrors.movieID}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label left-label">Theatre:</label>
                  <select
                    className={`form-control ${formErrors.theatreID ? 'is-invalid' : ''}`}
                    value={theatreID}
                    onChange={(e) => setTheatre(e.target.value)}
                  >
                    <option value="" disabled>Select Theatre</option>
                    {theatres.map(theatre => (
                      <option key={theatre.theatreID} value={theatre.theatreID}>{theatre.theatreName}</option>
                    ))}
                  </select>
                  {formErrors.theatreID && (
                    <div className="invalid-feedback">{formErrors.theatreID}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label left-label">PricePerSeat:</label>
                  <input
                    type="text"
                    placeholder="Enter price per seat"
                    name="pricePerSeat"
                    className={`form-control ${formErrors.pricePerSeat ? 'is-invalid' : ''}`}
                    value={pricePerSeat}
                    onChange={(e) => setPricePerSeat(e.target.value)}
                  />
                  {formErrors.pricePerSeat && (
                    <div className="invalid-feedback">{formErrors.pricePerSeat}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label left-label">Time Slot</label>
                  <select
                    className={`form-control ${formErrors.timeSlot ? 'is-invalid' : ''}`}
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}>
                    <option value="" disabled>Select Time Slot</option>
                    <option value="10AM">10 AM</option>
                    <option value="1PM">1 PM</option>
                    <option value="4PM">4 PM</option>
                    <option value="7PM">7 PM</option>
                    <option value="10PM">10 PM</option>
                  </select>
                  {formErrors.timeSlot && (
                    <div className="invalid-feedback">{formErrors.timeSlot}</div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label left-label">Seats Available:</label>
                  <input
                    type="text"
                    placeholder="Enter seats available"
                    name="regularSeats_available"
                    className={`form-control ${formErrors.regularSeats_available ? 'is-invalid' : ''}`}
                    value={regularSeats_available}
                    onChange={(e) => setRegularSeats_available(e.target.value)}
                  />
                  {formErrors.regularSeats_available && (
                    <div className="invalid-feedback">{formErrors.regularSeats_available}</div>
                  )}
                </div>
                
                {/* <button className="btn btn-success btn-block custom-submit-btn" type="submit">Submit</button>
                <Link to="/shows" className="btn btn-danger btn-block custom-cancel-btn">Cancel</Link> */}

              <div className="row">
                <div className="col-md-6">
                <button className="btn btn-success btn-block custom-submit-btn" type="submit">
                  Submit
                </button>
              </div>
              <div className="col-md-6">
              <Link to="/shows" className="btn btn-danger btn-block custom-cancel-btn">Cancel</Link>
              </div>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShowComponent;
