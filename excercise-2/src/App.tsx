import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import RocketDetail from './components/RocketDetail';
import Admin from './pages/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path='/' component={Home} />
        <Route exact={true} path='/rockets/:id' component={RocketDetail} />
        <Route exact={true} path='/admin' component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
