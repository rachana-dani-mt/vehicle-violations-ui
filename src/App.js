import React from 'react'
import './App.css'
// import { Button } from "reactstrap";

import 'bootstrap/dist/css/bootstrap.css'

import Body from './Pages/HomePage/Body'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavigationBar from './components/NavBar/NavigationBar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Body} />
        </Switch>
        <Footer />
        {/* <Body/> */}
      </Router>
    </div>
  )
}

export default App
