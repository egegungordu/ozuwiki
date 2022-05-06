/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Offcanvas, Row, Navbar, Nav, NavDropdown, Form, FormControl, Container } from 'react-bootstrap';
import { BsSearch, BsPersonFill, BsHouseDoorFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useWindowSize } from 'react-use';

export default function WikiNavbar(props) {
  const { 
    title = "Title", 
    showHome = false, 
    showSearch = false, 
    showAccount = false, 
    accountName = "Account Name",
    offcanvasCloseCallback = () => {},
    offcanvasEnabled = false, 
    offcanvasContent,
    navigation = [], 
  } = props
  const [showOffcanvas, setShowOffcanvas] = React.useState(false);
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const navigate = useNavigate();
  const size = useWindowSize();
  
  React.useEffect(() => {
    offcanvasCloseCallback(() => setShowOffcanvas(false));
  }, []);

  React.useEffect(() => {
    if (size.width >= 992) {
      setShowOffcanvas(false)
    }
  }, [size.width]);
  
  const handleHome = () => {
    navigate('/')
  }
  
  React.useEffect(() => {
    const searchinput = document.getElementById('navbar-search-input')
    if(searchinput) {
      searchinput.focus()
    }
  }, [showSearchBar])
  
  const handleSearch = () => {
    setShowSearchBar(true)
  }
  
  const handleEndSearch = () => {
    setShowSearchBar(false)
  }

  const handleOffcanvasShow = () => {
    const html = document.documentElement
    const navbar = document.getElementById('wiki-nav')
    html.classList.add('offcanvas-padding')
    html.setAttribute('offcanvas', 'true')
    navbar.classList.add('offcanvas-padding')
    setShowOffcanvas(true)
  }
  
  const handleOffcanvasHide = () => {
    setShowOffcanvas(false)
  }
  
  const handleOffcanvasExited = () => {
    const html = document.documentElement
    const navbar = document.getElementById('wiki-nav')
    html.classList.remove('offcanvas-padding')
    html.setAttribute('offcanvas', 'false')
    navbar.classList.remove('offcanvas-padding')
  }
  
  return (
    <>
    {offcanvasEnabled && (
      <WikiOffcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasHide}
        onExited={handleOffcanvasExited}
        content={offcanvasContent}
      />
    )}
    <Navbar id="wiki-nav" fixed="top" expand="lg" className="ps-0, py-0">
      <Container fluid="xxl" className="px-0">
        <Col xs={3} className={'d-none d-lg-flex'}>
          <div className={`d-flex flex-row ${showSearch ? '' : 'd-none'}`}>
            <BsSearch disabled style={{height: '40px'}} size="50px" className="px-3 navbar-logo" />
            <Form className="flex-fill">
              <FormControl style={{height: '40px', padding: '0', backgroundColor: 'var(--background-tertiary)'}} type="text" placeholder="Search Ozu Wiki" className="search rounded-0 mr-sm-2 pe-1 border-0 shadow-none " />
            </Form>
          </div>
        </Col>
        <Nav className="my-0 d-flex flex-row col col-12 col-sm-8 col-lg-6">
          {offcanvasEnabled && <button className="pb-2 me-0 navbar-logo rounded-0 border-0 shadow-none d-lg-none" onClick={handleOffcanvasShow}>
            <FiMenu />
          </button>}
          {showSearch && <button disabled={showSearchBar} className="pb-2 me-0 navbar-logo rounded-0 border-0 shadow-none d-lg-none" onClick={handleSearch}>
            <BsSearch />
          </button>}
          {showHome && <button className="pb-2 me-0 navbar-logo rounded-0 border-0 shadow-none" onClick={handleHome}>
            <BsHouseDoorFill />
          </button>}
          <Nav.Item>
            <Nav.Link className="p-2" active disabled href="#">{title}</Nav.Link>
          </Nav.Item>
          {navigation.map((nav, index) => {
            return (
              <Nav.Item key={index} className={ index === 0 ? 'ms-auto' : false }>
                <Link className={`nav-link p-2 ${ index === 0 ? 'ms-1' : '' } ${ nav.active ? 'active disabled' : ''}`} to={nav.path}>{nav.title}</Link>
              </Nav.Item>
            )
          })}
          {showAccount&& <NavDropdown
            align="end"
            title={<BsPersonFill style={{height: '40px', padding: '0', color: 'rgba(0,0,0,.55)'}} size="25px" className="mx-2" />}
            id="nekonadegoe"
            className="account-dropdown d-sm-none"
          >
            <Link className="nav-link" to={'/settings'}>Settings</Link>
            <Link className="nav-link" to={'/'}>Log out</Link>
          </NavDropdown>}
        </Nav>
        <Nav className="d-none d-sm-flex d-flex flex-row justify-content-end col col-4 col-lg-3">
          {showAccount && <NavDropdown
            align="end"
            title={accountName}
            className="account-dropdown px-1"
          >
            <Link className="nav-link" to={'/settings'}>Settings</Link>
            <Link className="nav-link" to={'/'}>Log out</Link>
          </NavDropdown>}
        </Nav>
        {showSearchBar && (
          <Col xs={12} onBlur={handleEndSearch} >
            <div id="navbar-search" className="d-block d-lg-none" >
              <Form className="flex-fill">
                <FormControl onBlur={handleEndSearch} id="navbar-search-input" style={{height: '40px',  backgroundColor: 'var(--background-primary)' }} type="text" placeholder="Search Ozu Wiki" className="search rounded-0 mr-sm-2 pe-1 border-0 shadow-lg" />
              </Form>
            </div>
          </Col>  
        )}
      </Container>
    </Navbar>
    </>
  )
}

function WikiOffcanvas(props) {
  
  const { show = false, onHide, onExited, content } = props;
  
  return (
    <Offcanvas className="search-offcanvas border-0" onExited={onExited} show={show} onHide={onHide} scroll={false} backdrop={true}>
      <Container fluid>
        <Row className="d-flex" style={{height:'40px', backgroundColor: 'var(--background-tertiary)'}}>
          <Offcanvas.Header className="p-1" closeButton />
        </Row>
        <Row>
          {content}
        </Row>
      </Container>
    </Offcanvas>
  )
}