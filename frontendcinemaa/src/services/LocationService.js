import axios from 'axios';

const LOCATION_BASE_REST_API_URL = 'http://localhost:8080';

class LocationService {
  getAllLocationNames() {
    return axios.get(`${LOCATION_BASE_REST_API_URL}/locationNames`);
  }

  getDistrictByLocation(location) {
    return axios.get(`${LOCATION_BASE_REST_API_URL}/district?location=${location}`);
  }
}

const locationService = new LocationService(); 

export default new LocationService();
