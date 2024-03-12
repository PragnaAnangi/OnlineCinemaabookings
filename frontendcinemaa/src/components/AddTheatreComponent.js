import React, { useState, useEffect } from 'react';
import TheatreService from '../services/TheatreService';
import LocationService from '../services/LocationService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './AddTheatreComponent.css';

const AddTheatreComponent = () => {
  const [theatreName, setTheatreName] = useState('');
  const [noOfShows, setNoOfShows] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [reservationCapacityRegular, setReservationCapacityRegular] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { theatreID } = useParams();

  const [locationName, setLocationName] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [district, setDistrict] = useState('');

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setSelectedLocation(selectedLocation);

    // Fetch the corresponding district based on the selected location
    LocationService.getDistrictByLocation(selectedLocation)
      .then(response => {
        setDistrict(response.data);
      })
      .catch(error => {
        console.error('Error fetching district:', error);
      });
  };

  const validateForm = () => {
    const errors = {};

    if (!theatreName.trim()) {
      errors.theatreName = 'Theatre Name is required';
    }

    if (!district.trim()) {
      errors.district = 'District is required';
    }

    if (isNaN(noOfShows) || noOfShows <= 0) {
      errors.noOfShows = 'Number Of Shows must be a positive number';
    }

    if (isNaN(seatingCapacity) || seatingCapacity <= 0) {
      errors.seatingCapacity = 'Seating Capacity must be a positive number';
    }

    if (isNaN(reservationCapacityRegular) || reservationCapacityRegular <= 0) {
      errors.reservationCapacityRegular = 'Reservation Capacity Regular must be a positive number';
    }

    if (reservationCapacityRegular > seatingCapacity) {
      errors.reservationCapacityRegular = 'Reservation Capacity Regular must be less than Seating Capacity';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const saveOrUpdateTheatre = async (e) => {
    e.preventDefault();
  
    const isFormValid = validateForm();
    if (!isFormValid) {
      // form validation failed
      return;
    }
  
    const theatre = {
      theatreName,
      locationName: selectedLocation, // Include selectedLocation in the theatre object
      district,
      noOfShows,
      seatingCapacity,
      reservationCapacityRegular,
    };
  
    try {
      if (theatreID) {
        await TheatreService.updateTheatre(theatreID, theatre);
        alert('Theatre details updated successfully!');
      } else {
        await TheatreService.createTheatre(theatre);
        alert('Theatre details added successfully!');
      }
  
      navigate('/theatres');
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };
  

  useEffect(() => {
    if (theatreID) {
      TheatreService.getTheatreByID(theatreID)
        .then((response) => {
          setTheatreName(response.data.theatreName);
          setSelectedLocation(response.data.locationName);
          setDistrict(response.data.district);
          setNoOfShows(response.data.noOfShows);
          setSeatingCapacity(response.data.seatingCapacity);
          setReservationCapacityRegular(response.data.reservationCapacityRegular);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [theatreID]);

  useEffect(() => {
    // Fetch location names from your Spring Boot backend
    LocationService.getAllLocationNames()
      .then(response => {
        setLocationName(response.data);
      })
      .catch(error => {
        console.error('Error fetching location names:', error);
      });
  }, []);

  const title = () => {
    if (theatreID) {
      return <h2 className="text-center"> Update Theatre</h2>;
    } else {
      return <h2 className="text-center">Add Theatre</h2>;
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <br />
              <form>
                <div className="form-group mb-2">
                  <label className="form-label left-label">TheatreName</label>
                  <input
                    type="text"
                    placeholder=" Enter Theatre Name"
                    name="theatreName"
                    className={`form-control ${formErrors.theatreName ? 'is-invalid' : ''}`}
                    value={theatreName}
                    onChange={(e) => setTheatreName(e.target.value)}
                    readOnly={!!theatreID}
                    style={{ backgroundColor: !!theatreID ? '#e9ecef' : 'inherit' }}
                  />
                  {formErrors.theatreName && (
                    <div className="invalid-feedback">{formErrors.theatreName}</div>
                  )}
                </div>

                <div>
                  <label className="form-label left-label">Location:</label>
                  <select value={selectedLocation} onChange={handleLocationChange}>
                  <option value="" disabled>Select Location</option>
                    {locationName.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  <br></br>
                  <label className="form-label left-label">District:</label>
                  <input type="text" value={district} name ="district" readOnly />
                  
                </div>

                <div className="form-group mb-2">
                  <label className="form-label left-label">Number Of Shows :</label>
                  <select
                    name="noOfShows"
                    className={`form-control ${formErrors.noOfShows ? 'is-invalid' : ''}`}
                    value={noOfShows}
                    onChange={(e) => setNoOfShows(e.target.value)}
                  >
                    <option value="">Select Number Of Shows</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                  {formErrors.noOfShows && (
                    <div className="invalid-feedback">{formErrors.noOfShows}</div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label left-label">Seating Capacity : </label>
                  <input
                    type="number"
                    placeholder="Enter seating capacity"
                    name="seatingCapacity"
                    className={`form-control ${formErrors.seatingCapacity ? 'is-invalid' : ''}`}
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(e.target.value)}
                  />
                  {formErrors.seatingCapacity && (
                    <div className="invalid-feedback">{formErrors.seatingCapacity}</div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label left-label">Reservation Capacity Regular : </label>
                  <input
                    type="number"
                    placeholder="Enter reservation capacity regular"
                    name="reservationCapacityRegular"
                    className={`form-control ${formErrors.reservationCapacityRegular ? 'is-invalid' : ''}`}
                    value={reservationCapacityRegular}
                    onChange={(e) => setReservationCapacityRegular(e.target.value)}
                  />
                  {formErrors.reservationCapacityRegular && (
                    <div className="invalid-feedback">{formErrors.reservationCapacityRegular}</div>
                  )}
                </div>
                <br></br>
                <div className="row">
                <div className="col-md-6">
                  <button className="btn btn-success btn-block custom-submit-btn" onClick={(e) => saveOrUpdateTheatre(e)}>
                    Submit
                  </button>
                </div>
                <div className="col-md-6">
                  <Link to="/theatres" className="btn btn-danger btn-block custom-cancel-btn">
                    Cancel
                  </Link>
                </div>
              </div>
                {/* <button className="btn btn-success" onClick={(e) => saveOrUpdateTheatre(e)}>
                  Submit
                </button>
                <Link to="/theatres" className="btn btn-danger">
                  Cancel
                </Link> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTheatreComponent;

