import { Stack, Col, ListGroup, Offcanvas, Row, Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

export default function WikiOffcanvas(props) {
  
  const { show = false, onHide, onExited, content } = props;
  
  return (
    <Offcanvas className="search-offcanvas" onExited={onExited} show={show} onHide={onHide} scroll={false} backdrop={true}>
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
          {content}
        </Row>
      </Container>
    </Offcanvas>
  )
}