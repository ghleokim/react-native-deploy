import React, { } from 'react';
import { RouteMain } from './routerModules/RouteMain';
import { Router, Switch, Route, Redirect } from './Router';

export const Routes = (Props) => {

  return (
    <Router>
      <div>
        <view style={{ height: Props.height, marginTop: Props.headerHeight, marginBottom: Props.footerHeight }} contentContainerStyle={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
          <Switch>
            <Route exact path='/' component={RouteMain} />
            <Redirect path='*' to='/' />
          </Switch>
        </view>
      </div>
    </Router>
  )
}
