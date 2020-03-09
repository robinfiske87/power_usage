import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import Feed from './components/Feed';
import Chart from './components/Chart';
import About from './components/About';
import Contact from './components/Contact';
import NoMatch from './components/NoMatch';




function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Layout>
        <Router>
          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/chart" component={Chart} />
            <Route path="/home" component={Feed} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route component={NoMatch} />
          </Switch>
          </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
