import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Dashboard/Home';
import ProtectedRoute from '../components/ProtectedRoute';
import RealTime from '../pages/Dashboard/Realtime';
import Metric from '../pages/Dashboard/Metric';
import Profile from '../pages/Dashboard/Profile';
import Configuration from '../pages/Dashboard/Configuration';
import Analysis from '../pages/Dashboard/Analysis';
import Report from '../pages/Dashboard/Report';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <ProtectedRoute exact path="/dashboard" component={Home} />
      <ProtectedRoute path="/realtime/" component={RealTime} />
      <ProtectedRoute path="/metrics" component={Metric} />
      <ProtectedRoute path="/initial-configuration" component={Configuration} />
      <ProtectedRoute path="/make-analysis" component={Analysis} />
      <ProtectedRoute path="/report" component={Report} />
      <ProtectedRoute path="/profile" component={Profile} />
    </Switch>
  );
}
