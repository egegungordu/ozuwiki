/* eslint-disable react-hooks/exhaustive-deps */
import { Offcanvas, Container, Row } from 'react-bootstrap';
import React from 'react';
import { useWindowSize } from 'react-use';

export default function WikiOffcanvas(props) {
  
  const { show = false, setShow = () => {}, children } = props;
  const { width } = useWindowSize();
  
  const handleHide = () => setShow(false);
  const handleExited = () => {
    const html = document.documentElement
    html.removeAttribute('offcanvas')
  }
  
  React.useEffect(() => {
    if (width > 1200) {
      setShow(false)
    }
  }, [width])
  
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
          {children.Sidebar}
        </Row>
      </Container>
    </Offcanvas>
  )
}