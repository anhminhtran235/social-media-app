import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import withWebsocket from './hoc/withWebsocket';

function App(props) {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default withWebsocket(App);
