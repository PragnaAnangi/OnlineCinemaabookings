import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import './AddMovieComponent.css';
import MovieService from '../services/MovieService';

const AddMovieComponent = () => {
  const [movieName, setMovieName] = useState('');
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isMovieExists, setIsMovieExists] = useState(false);
  const navigate = useNavigate();
  const { movieID } = useParams();

  useEffect(() => {
    const checkMovieExists = async () => {
      if (movieName.trim()) {
        try {
          const exists = await MovieService.checkMovieExists(movieName);
          setIsMovieExists(exists);
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkMovieExists();
  }, [movieName]);

  const validateForm = () => {
    const errors = {};

    if (!movieName.trim()) {
      errors.movieName = 'Movie Name is required';
    } else if (isMovieExists) {
      errors.movieName = 'Movie with this name already exists';
    }

    if (!language.trim()) {
      errors.language = 'Language is required';
    }

    
    if (!duration.trim()) {
      errors.duration = 'Duration is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const saveOrUpdateMovie = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      // form validation failed
      return;
    }

    const movie = { movieName, language, duration };

    try {
      if (movieID) {
        await MovieService.updateMovie(movieID, movie);
        alert('Movie details updated successfully');
      } else {
        await MovieService.createMovie(movie);
        alert('Movie added successfully');
      }

      navigate('/movies');
    } catch (error) {
      console.error(error);
      alert('Failed to save movie details');
    }
  };

  useEffect(() => {
    if (movieID) {
      MovieService.getMovieByID(movieID)
        .then((response) => {
          setMovieName(response.data.movieName);
          setLanguage(response.data.language);
          setDuration(response.data.duration);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [movieID]);

  const title = () => {
    return movieID ? <h2 className="text-center">Update Movie</h2> : <h2 className="text-center">Add Movie</h2>;
  };

  return (
    <div>
      <br />
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}

            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label left-label">Movie Name:</label>
                  <input
                    type="text"
                    placeholder="Enter movie name"
                    name="movieName"
                    className={`form-control ${formErrors.movieName ? 'is-invalid' : ''}`}
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    required
                    readOnly={!!movieID}
                    style={{ backgroundColor: !!movieID ? '#e9ecef' : 'inherit' }}
                  />
                  {formErrors.movieName && <div className="invalid-feedback">{formErrors.movieName}</div>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label left-label">Language:</label>
                  <select
                    name="language"
                    className={`form-control ${formErrors.language ? 'is-invalid' : ''}`}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                  >
                    <option value="">Select Language</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">English</option>
                    <option value="English">Tamil</option>
                  </select>
                  {formErrors.language && <div className="invalid-feedback">{formErrors.language}</div>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label left-label">Duration:</label>
                  <select
                  name="duration"
                  className={`form-control ${formErrors.duration ? 'is-invalid' : ''}`}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required>
                  <option value="">Select Duration</option>
                  <option value="2h">2 hr</option>
                  <option value="2h 15m">2 hr 15 min</option>
                  <option value="2h 30m">2 hr 30 min</option>
                  <option value="2h 45m">2 hr 45 min</option>
                  <option value="3h">3 hr</option>
                  <option value="3h 15m">3 hr 15 min</option>
                  <option value="3h 30m">3 hr 30 min</option>
                  <option value="3h 45m">3 hr 45 min</option>
                </select>
                  {formErrors.duration && <div className="invalid-feedback">{formErrors.duration}</div>}
                </div>
                <br></br>
                <div className="row">
                <div className="col-md-6">
                <button className="btn btn-success btn-block custom-submit-btn" onClick={(e) => saveOrUpdateMovie(e)}>
                  Submit
                </button>
              </div>
              <div className="col-md-6">
                <Link to="/movies" className="btn btn-danger btn-block custom-cancel-btn">
                  Cancel
                </Link>
              </div>
            </div>

                {/* <button className="btn btn-success" onClick={(e) => saveOrUpdateMovie(e)}>
                  Submit
                </button>
                <Link to="/movies" className="btn btn-danger">Cancel</Link> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieComponent;



