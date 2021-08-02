import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Trades from '../pages/Trades';
import TradesHistory from '../pages/TradesHistory';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Trades} />
    <Route path="/trades/history" component={TradesHistory} />
  </Switch>
);

export default Routes;
