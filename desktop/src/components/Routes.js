import React, { } from 'react';
import { RouteMain } from './routerModules/RouteMain';
import { Router, Switch, Route, Redirect } from './Router';
import { Header } from './components/Header';
import { RouteLogin} from './routerModules/RouteLogin';
import { RouteSignup } from './routerModules/RouteSignup';
import { RouteMyinfo } from './routerModules/RouteMyinfo';

export const Routes = (Props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={RouteMain} />
        <Route exact path='/login' component={RouteLogin} />
        <Route exact path='/signup' component={RouteSignup} />
        <Route exact path='/myinfo' component={RouteMyinfo} />
        <Redirect path='*' to='/' />
      </Switch>
      <Route component={Header} />
    </Router>
  )
}
