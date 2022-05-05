import { Stack, Col, ListGroup, Offcanvas, Row, Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import { BsSearch, BsPersonFill } from 'react-icons/bs';
import React from 'react';

export default function WikiNavbar(props) {
  const { title, showAccountButton = true, navigation = [], extra } = props
  
  return (
    <>
    <Navbar fixed="top" expand="lg" className="ps-0, py-0">
      <Container fluid="xxl" className="px-0">
        <Col xs={3} className="d-none d-lg-flex">
          <BsSearch style={{height: '40px'}} size="50px" className="px-3" />
          <Form inline>
            <FormControl style={{height: '40px', padding: '0', backgroundColor: 'var(--background-tertiary)'}} type="text" placeholder="Search Ozu Wiki" className="search rounded-0 mr-sm-2 pe-1 border-0 shadow-none " />
          </Form>
        </Col>
        <Nav className="my-0 d-flex flex-row col col-12 col-sm-8 col-lg-6">
          {extra}
          <Nav.Item>
            <Nav.Link className="p-2" active disabled href="#">{title}</Nav.Link>
          </Nav.Item>
          {navigation.map((nav, index) => {
            return (
              <Nav.Item key={index} className={ index===0 ? 'ms-auto' : false }>
                <Nav.Link className={`p-2 ${ index===0 ? 'ms-1' : 0 }`} href={nav.href}>{nav.title}</Nav.Link>
              </Nav.Item>
            )
          })}
          {showAccountButton && <NavDropdown
            align="end"
            title={<BsPersonFill style={{height: '40px', padding: '0', color: 'rgba(0,0,0,.55)'}} size="25px" className="mx-2" />}
            id="nekonadegoe"
            className="d-sm-none"
          >
            <NavDropdown.Item href="#action3">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item variant="warning" href="#action5">
              Log out
            </NavDropdown.Item>
          </NavDropdown>}
        </Nav>
        <Nav className="d-none d-sm-flex d-flex flex-row justify-content-end col col-4 col-lg-3">
          {showAccountButton && <NavDropdown
            align="end"
            title='Ege Gungordu'
            id="offcanvasNavbarDropdown-expand-lg"
            className="account-dropdown px-1"
          >
            <NavDropdown.Item href="#action3">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item variant="warning" href="#action5">
              Log out
            </NavDropdown.Item>
          </NavDropdown>}
        </Nav>
      </Container>
    </Navbar>
    </>
  )
}