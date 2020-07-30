import React,{Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import SigninComponent from './SigninComponent'
import SignupComponent from './SignupComponent'

import InventoryComponent from './InventoryComponent'
import ErrorComponent from './ErrorComponent'
import SignoutComponent from './SignoutComponent'
import WelcomeComponent from './WelcomeComponent'
import InventoryDetails from './InventoryDetails'
import '../asset/style.css'
import ConsumeComponent from './ConsumeComponent'

class EZtoryApp extends Component{
    render(){
        return (
          <div className="InventoryApp">
            <Router>
              <Switch>
                <Route path="/" exact component={SigninComponent} />
                <Route path="/signin" component={SigninComponent} />
                <Route path="/signup" component={SignupComponent} />
                <AuthenticatedRoute
                  path="/welcome/:name"
                  component={WelcomeComponent}
                />
                <AuthenticatedRoute
                  path="/inventory/:id"
                  component={InventoryDetails}
                />
                <AuthenticatedRoute
                  path="/consume/:id"
                  component={ConsumeComponent}
                />
                <AuthenticatedRoute
                  path="/inventory"
                  component={InventoryComponent}
                />

                <AuthenticatedRoute
                  path="/signout"
                  component={SignoutComponent}
                />
                <Route component={ErrorComponent} />
              </Switch>
            </Router>
          </div>
        );
    }
   
}





export default EZtoryApp