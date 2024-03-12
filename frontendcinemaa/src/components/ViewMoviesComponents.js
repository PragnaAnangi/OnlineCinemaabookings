

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import MovieService from '../services/MovieService';
import './ViewMovieComponent.css';

const ViewMoviesComponent = () => {
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



  const filteredMovies = movies.map(({ movieID, movieName, language, duration }) => ({
    movieID,
    movieName,
    language,
    duration,
  }));

  return (
    <div className="container">
      <h2 className="text-center">Movie Details</h2>
      <Link to="/add-movie" className="btn btn-primary mb-2">
        Add Movie
      </Link>

  

      <table className="table table-bordered table-striped" >
        <thead className="thead-dark align-top">
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

export default ViewMoviesComponent;


