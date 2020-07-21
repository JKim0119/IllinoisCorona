import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={DashboardLayout} />
      </Switch>
    </HashRouter>
  );
}
