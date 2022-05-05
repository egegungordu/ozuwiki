import { Stack, Col, ListGroup, Offcanvas, Row, Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import { BsSearch, BsPersonFill } from 'react-icons/bs';
import { useWindowSize } from 'react-use';
import React from 'react';
import TableOfContents from './TableOfContents';

export default function WikiNavbar(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setTarget(null)
  }
  const [target, setTarget] = React.useState(null);
  const size = useWindowSize();
  
  React.useEffect(() => {
    if (size.width > 1640) {
      handleClose()
    }
  }, [size.width])
  
  const handleLinkClick = (e) => {
    e.preventDefault()
    handleClose()
    setTarget(e.target.href)
  }
  
  const handleExited = () => {
    target && setTimeout(() => {
      document.getElementById(target.split('#')[1]).scrollIntoView({behavior: 'smooth'})
    }, 10)
  }

  return (
    <>
    <Offcanvas className="search-offcanvas" onExited={handleExited} show={show} onHide={handleClose} scroll={false} backdrop={true}>
      <Container fluid>
      <Row>
        <Col className="d-flex flex-row p-0">
          <BsSearch style={{height: '40px', backgroundColor: 'var(--background-tertiary)'}} size="50px" className="px-3" />
          <Form className="flex-fill">
            <FormControl style={{height: '40px', padding: '0', backgroundColor: 'var(--background-tertiary)'}} type="text" placeholder="Search Ozu Wiki" className="search rounded-0 mr-sm-2 pe-1 border-0 shadow-none " />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="toc-column p-0">
          <h4 className="ozuwikiheader text-center my-5">Ozu Wiki</h4>
          <div className="sticky-top ps-4" style={{top: 48}}>
              <h6><b>Contents</b></h6>
              <Container fluid className={`px-0 toc-container-article`}>
                  <TableOfContents article={props.article} compact={3} onLinkClick={handleLinkClick}/>
              </Container>
          </div>
        </Col>
      </Row>
      </Container>
    </Offcanvas>
    <Navbar fixed="top" expand="lg" className="p-0">
      <Container fluid="xxl" className="px-0">
        <div className="d-none d-lg-flex col col-3">
          <BsSearch style={{height: '40px'}} size="50px" className="px-3" />
          <Form inline>
            <FormControl style={{height: '40px', padding: '0', backgroundColor: 'var(--background-tertiary)'}} type="text" placeholder="Search Ozu Wiki" className="search rounded-0 mr-sm-2 pe-1 border-0 shadow-none " />
          </Form>
        </div>
        <Nav className="my-0 d-flex flex-row col col-12 col-sm-8 col-lg-6">
          <div className="d-lg-none">
            <button style={{height: '40px'}} className="pb-2 navbar-toggler rounded-0 border-0 shadow-none" onClick={handleShow}>
              <BsSearch />
            </button>
          </div>
          <Nav.Item>
            <Nav.Link className="p-2" active disabled href="#">Article</Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-auto">
            <Nav.Link className="p-2 ms-1" href="#read">Read</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="p-2" href="#contribute">Contribute</Nav.Link>
          </Nav.Item>
          <NavDropdown
            align="end"
            title={<BsPersonFill style={{height: '40px', padding: '0'}} size="25px" className="mx-2" />}
            id="nekonadegoe"
            className="d-sm-none account-dropdown"
          >
            <NavDropdown.Item href="#action3">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item variant="warning" href="#action5">
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="d-none d-sm-flex d-flex flex-row justify-content-end col col-4 col-lg-3">
          <NavDropdown
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
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
    </>
  )
}