import { Offcanvas, Container, Row } from 'react-bootstrap';
import React from 'react';

export default function WikiOffcanvas(props) {
  
  const { show = false, setShow = () => {}, content } = props;
  
  const handleHide = () => setShow(false);
  const handleExited = () => {
    console.log('wtf')
    const html = document.documentElement
    html.removeAttribute('offcanvas')
  }
  
  React.useEffect(() => {
    const html = document.documentElement
    if (show) {
      html.setAttribute('offcanvas', 'true')
    } else {
    }
  }, [show])

  return (
    <Offcanvas className="search-offcanvas border-0" show={show} onExited={handleExited} onHide={handleHide} scroll={false} backdrop={true}>
      <Container fluid>
        <Row className="d-flex" style={{height:'40px', backgroundColor: 'var(--background-tertiary)'}}>
          <Offcanvas.Header className="p-1" closeButton />
        </Row>
        <Row>
          {content && content.props.children && content.props.children(setShow)}
        </Row>
      </Container>
    </Offcanvas>
  )
}