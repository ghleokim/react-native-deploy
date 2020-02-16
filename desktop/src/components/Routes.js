import React, { } from 'react';
import { RouteMain } from './routerModules/RouteMain';
import { RouteGuide } from './routerModules/RouteGuide';
import { RouteSeller } from './routerModules/RouteSeller';
import { RouteCustomer } from './routerModules/RouteCustomer';
import { Router, Switch, Route, Redirect } from './Router';
import { Header } from './components/Header';
import { RouteLogin} from './routerModules/RouteLogin';
import { RouteSignup } from './routerModules/RouteSignup';

export const Routes = (Props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={RouteMain} />
        <Route exact path='/login' component={RouteLogin} />
        <Route exact path='/signup' component={RouteSignup} />
        <Route exact path='/guide' component={RouteGuide} />
        <Route exact path='/guide/seller' component={RouteSeller} />
        <Route exact path='/guide/customer' component={RouteCustomer} />
        <Redirect path='*' to='/' />
      </Switch>
      <Route component={Header} />
    </Router>
  )
}
