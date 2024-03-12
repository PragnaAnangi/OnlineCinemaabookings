import axios from 'axios';

const user_api='http://localhost:8080/users';


class UserService{
    getusers(){
       return axios.get(user_api);
    }
}

export default new UserService();