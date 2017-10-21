import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route component={App}/>
          <Switch>

              {/* <Route path='/' component={App}/> */}

              <Route path="/signin" component={Signin} />
              <Route path="/signout" component={Signout} />
              <Route path="/signup" component={Signup} />
              <Route path="/feature" component={RequireAuth(Feature)} />
              <Route exact path="/" component={Welcome} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
