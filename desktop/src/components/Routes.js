import React, { useContext } from 'react';
import { RouteMain } from './routerModules/RouteMain';
import { RouteGuide } from './routerModules/RouteGuide';
import { RouteSeller } from './routerModules/RouteSeller';
import { RouteCustomer } from './routerModules/RouteCustomer';
import { Router, Switch, Route, Redirect } from './Router';
import { Header } from './components/Header';
import { RouteAuth } from './routerModules/RouteAuth';
import { RouteSignup } from './routerModules/RouteSignup';
import { MainStoreContext } from '../store/MainStore';

export const Routes = (Props) => {
  const mainStore = useContext(MainStoreContext)

  const checkAuth = () => {
    const cookies = JSON.parse(localStorage.getItem('cookies'))
    if (cookies) {
      const expires = Date.parse(cookies.expires)
      console.log('expires: ', expires, 'now: ', Date.now())
      if (expires > Date.now()) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  mainStore.isLoggedIn = checkAuth();

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={RouteMain} />
        <Route exact path='/auth' component={RouteAuth} />
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
