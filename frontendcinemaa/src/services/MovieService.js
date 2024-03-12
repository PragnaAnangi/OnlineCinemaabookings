import axios from 'axios'

const MOVIE_BASE_REST_API_URL='http://localhost:8080';

class MovieService{

    getAllMovies(){
        return axios.get('http://localhost:8080/getMovie')
    }

    createMovie(movie){
        return axios.post('http://localhost:8080/saveMovie',movie)
    }

    getMovieByID(movieID){
        return axios.get('http://localhost:8080/getMovie'+'/'+movieID)
     }

    updateMovie(movieID,movie){
        
        return axios.put('http://localhost:8080/editMovie'+'/'+movieID,movie)
       
    }

    deleteMovie(movieID){
        return axios.delete('http://localhost:8080/deleteMovie'+'/'+movieID)
    }

    // async checkMovieExists(movieName) {
    //     try {
    //       const response = await axios.get(`${MOVIE_BASE_REST_API_URL}/checkMovieExists`, {
    //         params: {
    //           movieName: movieName,
    //         },
    //       });
    
    //       return response.data.exists;
    //     } catch (error) {
    //       console.error('Error checking if movie exists:', error);
    //       return false;
    //     }
    //   }

    

}

export default new MovieService();