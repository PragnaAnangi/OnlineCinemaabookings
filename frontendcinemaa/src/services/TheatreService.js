import axios from 'axios'

const THEATRE_BASE_REST_API_URL='http://localhost:8080';

class TheatreService{

    getAllTheatres(){
        return axios.get('http://localhost:8080/getTheatre')
    }
    createTheatre(theatre){
        return axios.post('http://localhost:8080/saveTheatre',theatre)

    }

    getTheatreByID(theatreID) {
        return axios.get('http://localhost:8080/getTheatre'+'/'+theatreID);
    }

    updateTheare(theatreID,theatre){
        return axios.put('http://localhost:8080/editTheatre'+ '/' +theatreID,theatre);
    }

    deleteTheatre(theatreID){
        return axios.delete('http://localhost:8080/deleteTheatre' + '/' +theatreID);
    }


}
export default new TheatreService();