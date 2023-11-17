import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import './NavigationBar.css'
import {Link} from 'react-router-dom'

// import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import App from "../../App.js"

function NavigationBar() {
  let pathName = useMemo(
    () => window.location.pathname,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.location.pathname],
  )

  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen])

  return (
    <div className="navBar1">
      <Navbar
        color="dark"
        dark
        className="fixed-top d-flex justify-content-between"
        expand="md"
      >
        <NavItem>
          <Link to="/" className="text-white">
            Vehicle Violations
          </Link>
        </NavItem>
        {/* <NavLink className=" text-white" to="/">
          {!isNaN(pathName.split('/')[1]) ? 'Authors' : pathName.split('/')[1]}
        </NavLink> */}
        <NavbarToggler onClick={toggle} style={{width: 'auto'}} />
        <Collapse
          className=""
          isOpen={isOpen}
          navbar
          style={{
            color: 'white',
            width: 'auto',
          }}
        >
          <Nav className="ml-auto" navbar>
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavigationBar
