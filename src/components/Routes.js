import React, { } from 'react';
import { RouteMain } from './routerModules/RouteMain';
import { RouteLogin } from './routerModules/RouteLogin';
import { RouteSeller } from './routerModules/RouteSeller';
import { RouteCustomer } from './routerModules/RouteCustomer';
import { Router, Switch, Route, Redirect } from './Router';

export const Routes = (Props) => {

  return (
    <Router>
      <div>
        <view style={{ height: Props.height, marginTop: Props.headerHeight, marginBottom: Props.footerHeight }} contentContainerStyle={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
          <Switch>
            <Route exact path='/' component={RouteMain} />
            <Route exact path='/login' component={RouteLogin} />
            <Route exact path='/guide/seller' component={RouteSeller} />
            <Route exact path='/guide/customer' component={RouteCustomer} />
            <Redirect path='*' to='/' />
          </Switch>
        </view>
      </div>
    </Router>
  )
}
