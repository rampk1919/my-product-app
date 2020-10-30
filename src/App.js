import logo from './logo.svg';
import './App.css';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import HomeComponent from './routerComponents/HomeComponent';
import ProductComponent from './routerComponents/ProductComponent';

function App() {
  return (
            <div className="App">
            <h1>Sharp Business System (india) pvt ltd</h1>
            <table className="table table-bordered table-striped table-danger">
              <tbody>
                <tr>
                  <td>
                    {/* Define the Links for Executing Routes */}
                    <Link to="/">Home</Link>
                  </td>
                  <td>
                    {/* Define the Links for Executing Routes */}
                    <Link to="/create/-1">Create</Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
            {/* Defining The Routing Table */}
              <Switch>
              <Route exact path="/" component={HomeComponent}></Route>
              <Route exact path="/create/:id" component={ProductComponent}></Route>
                {/*
                
                 Redirect to default if the Route path does not match 
                <Redirect to="/"/>*/}
              </Switch>
            </div>
        </div>
  );
}

export default App;
