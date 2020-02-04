import React, { } from 'react';
import { View, ScrollView } from "react-native"
import { RouteMain } from './modules/RouteMain';
import { RouteLogin } from './modules/RouteLogin';
import { RouteMap } from './modules/RouteMap';
import { RouteList } from './modules/RouteList';
import { Router, Switch, Route, Redirect } from './Router';
import { Navbar } from './components/main/Navbar';
import { RouteMypage } from './modules/RouteMypage';
import { RouteTruck } from './modules/RouteTruck';

interface Props {
  height: number;
  headerHeight: number;
  footerHeight: number;
}

export const Routes = (Props: Props) => {

  return (
    <Router>
      <View>
        <ScrollView style={{ height: Props.height, marginTop: Props.headerHeight, marginBottom: Props.footerHeight }} contentContainerStyle={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
          <Switch>
            <Route exact path='/' component={RouteMain} />
            <Route exact path='/search' component={RouteList} />
            <Route exact path='/search/:keyword' component={RouteList} />
            <Route exact path='/login' component={RouteLogin} />
            <Route exact path='/signup' component={RouteLogin} />
            <Route exact path='/map' component={RouteMap} />
            <Route exact path='/mypage' component={RouteMypage} />
            <Route exact path='/trucks/:targetId' component={RouteTruck} />
            <Redirect path='*' to='/' />
          </Switch>
        </ScrollView>
        <Route component={Navbar} />
      </View>
    </Router>
  )
}
