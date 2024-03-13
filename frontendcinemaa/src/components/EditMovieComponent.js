

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import MovieService from '../services/MovieService';
import './ViewMovieComponent.css';

const ViewMovieComponent = () => {
  const headerStyle = {
    color: 'Black',
    marginLeft: '20px',
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = () => {
    MovieService.getAllMovies()
      .then((response) => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMovie = (movieID) => {
    MovieService.deleteMovie(movieID)
      .then((response) => {
        alert('Movie details deleted successfully');
        getAllMovies();
      })
      .catch((error) => {
        console.log(error);
        alert('Error: Movie details could not be deleted');
      });
  };

  const filteredMovies = movies.map(({ movieID, movieName, language, duration }) => ({
    movieID,
    movieName,
    language,
    duration,
  }));

  return (
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div>
          <h3 style={headerStyle}>OCTBS</h3>
        </div>
        <div className="bar">
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/theatres">
                Theatre Details
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/movies">
                Movie Details
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/shows">
                Show Details
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <h2 className="text-center">Movie Details</h2>
      <Link to="/add-movie" className="btn btn-primary mb-2">
        Add Movie
      </Link>

      <div style={{ marginLeft: 'auto', marginRight: '20px', width: '140px' }}>
        <ReactHTMLTableToExcel
          className="btn btn-success mb-2"
          table="exportTable"
          filename="movieDetails"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>

      <Link to="/moviesii" className="btn btn-danger btn-block custom-cancel-btn">
                  Import
                </Link>

      <table className="table table-bordered table-striped" >
        <thead className="thead-dark align-top">
          <tr>
            <th>Movie Id</th>
            <th>Movie Name</th>
            <th>Language</th>
            <th>Duration</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.movieID}>
              <td>{movie.movieID}</td>
              <td>{movie.movieName}</td>
              <td>{movie.language}</td>
              <td>{movie.duration}</td>
              <td>
                <Link to={`/edit-movie/${movie.movieID}`} className="btn btn-info btn-sm mr-3">
                  Update
                </Link>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteMovie(movie.movieID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hidden table for exporting */}
      <table  id="exportTable" style={{ display: 'none' }}>
        <thead>
          <tr>
            <th>Movie Id</th>
            <th>Movie Name</th>
            <th>Language</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.movieID}>
              <td>{movie.movieID}</td>
              <td>{movie.movieName}</td>
              <td>{movie.language}</td>
              <td>{movie.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMovieComponent;


