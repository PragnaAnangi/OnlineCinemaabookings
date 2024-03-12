import axios from 'axios'

const THEATRE_BASE_REST_API_URL='http://localhost:8080';

class ShowService{

    getAllShows(){
        return axios.get('http://localhost:8080/getShow')
    }
    createShow(show){
        return axios.post('http://localhost:8080/saveShow',show);    
    }

    getShowByID(showID) {
        return axios.get('http://localhost:8080/getShow'+'/'+showID);
    }

    updateShow(showID,show){
        return axios.put('http://localhost:8080/editShow'+ '/' +showID,show);
    }

    deleteShow(showID){
        return axios.delete('http://localhost:8080/deleteShow' + '/' +showID);
    }


}
export default new ShowService();