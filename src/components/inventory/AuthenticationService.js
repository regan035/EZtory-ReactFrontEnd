class AuthenticationService {
  registerSuccessfulSignin(user, password) {
    let userData = JSON.stringify(user);
    console.log(userData);
    sessionStorage.setItem("authenticatedUser", userData);
  }

  signout() {
    sessionStorage.removeItem("authenticatedUser");
  }

  isUserSignedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }

  getSignedInUserName() {
    let user = sessionStorage.getItem("authenticatedUser");
    console.log(user);
    if (user) {
      try {
        let userDetail = JSON.parse(user);
        return userDetail.username;
      } catch (e) {
        console.log(e);
      }
    }
    return "";
  }

getUser() {
    let user = sessionStorage.getItem("authenticatedUser");
    console.log(user);
    if (user) {
      try {
        let userDetail = JSON.parse(user);
        return userDetail;
      } catch (e) {
        console.log(e);
      }
    }
    return {};
  }

  // executeJwtAuthenticationService(username, password) {
  //   return axios.post("http://localhost:8080/authenticate", {
  //     username,
  //     password,
  //   });
  // }

  registerSuccessfulSigninForJwt(user, token) {
    let userData = JSON.stringify(user);
    console.log(userData);
    sessionStorage.setItem("authenticatedUser", userData);
    this.setupAxiosInterceptors(this.createJWTToken(token));
  }
}

export default new AuthenticationService()