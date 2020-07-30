import React, { Component } from 'react'
import {BrowserRouter as Switch, Link } from 'react-router-dom'
import HelloWorldService from '../../api/inventory/HelloWorldService'


class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.state = {
      welcomeMessage: " ",
    };
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  render() {
    return (
      <div>
        <h2>Welcome</h2>
        <div className="Container">
          Welcome {this.props.match.params.name}. You can manage your inventory{" "}
          <Link to="/inventory">here</Link>
        </div>
        <div className="Container">
          Spring backend
          <button onClick={this.retrieveWelcomeMessage}>Link</button>
        </div>
        <div className="container">{this.state.welcomeMessage}</div>
      </div>
    );
  }

  retrieveWelcomeMessage() {
    // HelloWorldService.executeHelloWorldService().then(response=>
    //   this.handleSuccessfulResponse(response)
    // );

    // HelloWorldService.executeHelloWorldBeanService().then((response) =>
    // this.handleSuccessfulResponse(response)
    //  );

    HelloWorldService.executeHelloWorldPathVariableService(
      this.props.match.params.name
    ).then(response=> this.handleSuccessfulResponse(response))
    .catch(error => this.handleError(error));
  }

  handleSuccessfulResponse(response) {
    this.setState({
      welcomeMessage: response.data.massage,
    });
  }

  handleError(error) {
        console.log(error.response)
        this.setState({
            welcomeMessage: error.response.data.massage
        });
  }
}

export default WelcomeComponent