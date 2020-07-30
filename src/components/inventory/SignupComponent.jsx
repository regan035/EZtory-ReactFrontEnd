import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'

import UserDataServcice from "../../api/user/UserDataService";
class SigninComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasSigninFailed: false,
            showSucessMessage: false,
            formData:{}

        }
        this.handleChange = this.handleChange.bind(this)
        this.signinClicked = this.signinClicked.bind(this);
        this.signupClicked=this.signupClicked.bind(this);
    }



    handleChange(event) {
        console.log(this.state)
        this.setState({formData:{...this.state.formData,[event.target.name]: event.target.value}
        })

    }

    signupClicked(){
UserDataServcice.createUser(this.state.formData).then(() =>
  this.props.history.push("/signin")
);


    }


    signinClicked() {
        if (this.state.username === 'admin' && this.state.password === 'password') {
            AuthenticationService.registerSuccessfulSignin(this.state.username, this.state.password);
            this.props.history.push(`/inventory`)
            this.setState({ showSucessMessage: true })
            this.setState({ hasSigninFailed: false })
        }
        else {
            console.log('no go')
            this.setState({ showSucessMessage: false })
            this.setState({ hasSigninFailed: true })
        }
    }

    // AuthenticationService.executeJwtAuthenticationService(thia.state.username,this.state.password).then((response)=>{
    //     AuthenticationService.registerSuccessfulSigninForJwt(this.state.username,response.data.token)
    //     this.props.history.push(`/Welcome/{this.state.username}`).catch(()=>{

    //     })
    // })

    render() {
        const {formData}=this.state;
        return (
          // <div>
          //     Username:
          //     <input
          //         type="text"
          //         name="username"
          //         value={this.state.username}
          //         onChange={this.handleChange}
          //     />
          // Password:
          //     <input
          //         type="password"
          //         name="password"
          //         value={this.state.password}
          //         onChange={this.handleChange}
          //     />
          //     <button onClick={this.signinClicked}>Signin</button>
          //     {this.state.hasSigninFailed && <div>Invalid Credentials</div>}
          //     {this.state.showSucessMessage && <div>Login Successful</div>}
          // </div>
          <section>
            <div className="container modal-dialog text-center">
              <div className="row">
                <div className="card-body">
                  <div className="col-md-12 modal-content">
                    <div className="col-12 user-img">
                      <img src={require("../asset/face1.png")} />
                    </div>

                    <h2>Warehouse Management Application</h2>
                    <h3>Sign Up Form</h3>
                    <form className="login">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">User Name</label>

                        <input
                          className="form-control"
                          placeholder="Username"
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                          className="form-control"
                          placeholder="Password"
                          id="password-input"
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">First Name</label>

                        <input
                          className="form-control"
                          placeholder="First Name"
                          type="text"
                          name="fName"
                          value={formData.fName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Last Name</label>

                        <input
                          className="form-control"
                          placeholder="Last Name"
                          type="text"
                          name="lName"
                          value={formData.lName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>

                        <input
                          className="form-control"
                          placeholder="Email"
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div
                        style={{ display: "none" }}
                        id="alert"
                        className="alert alert-danger"
                        role="alert"
                      >
                        <span
                          className="glyphicon glyphicon-exclamation-sign"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Error:</span>{" "}
                        <span className="msg"></span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.signupClicked}
                      >
                        Sign Up
                      </button>
                      {this.state.hasSigninFailed && (
                        <div>Invalid Credentials</div>
                      )}{" "}
                      {this.state.showSucessMessage && (
                        <div>Login Successful</div>
                      )}
                    </form>
                    <br />
                    <p>
                      Already have an account? Please{" "}
                      <a href="/signin">sign In.</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

    }
}

export default SigninComponent;