import 'bootstrap-loader';
import '../scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  createBrowserRouter, makeRouteConfig, Route, Link
} from 'found';

import { Home } from './components/home';

class AppPage extends React.Component {

  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return <div>
      <header>
        <h1>Welcome to Modern Relay!</h1>
      </header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      {this.props.children}
      <footer>
        <small>&copy; 2017, A Cool Company, Inc.</small>
      </footer>
    </div>;
  }
}

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={AppPage}>
      <Route Component={Home} />
    </Route>
  ),
});

ReactDOM.render(
  <BrowserRouter />,
  document.querySelector('main'),
);