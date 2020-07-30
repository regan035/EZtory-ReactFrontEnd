import axios from "axios";

class UserDataService {
  

  signin(body) {
    return axios.post(`http://localhost:8080/users/signin`,body);
  }

  
  createUser(user) {
    return axios.post(`http://localhost:8080/users/signup`, user);
  }
}

export default new UserDataService();
