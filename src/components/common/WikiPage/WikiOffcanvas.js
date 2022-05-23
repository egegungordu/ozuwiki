/* eslint-disable react-hooks/exhaustive-deps */
import { Offcanvas, Container, Row } from 'react-bootstrap';
import React, { useContext } from 'react';
import { useWindowSize } from 'react-use';
import { WikiPageContext } from '../../../context/WikiPageContext';

export default function WikiOffcanvas(props) {

  const { children } = props;
  const { width } = useWindowSize();
  const { showOffcanvas, setShowOffcanvas } = useContext(WikiPageContext);

  const handleHide = () => setShowOffcanvas(false);
  const handleExited = () => {
    const html = document.documentElement
    html.removeAttribute('offcanvas')
  }

  React.useEffect(() => {
    if (width > 1200) {
      setShowOffcanvas(false)
    }
  }, [width])

  React.useEffect(() => {
    const html = document.documentElement
    if (showOffcanvas) {
      html.setAttribute('offcanvas', 'true')
    } else {
    }
  }, [showOffcanvas])

  return (
    <Offcanvas className="search-offcanvas border-0" show={showOffcanvas} onExited={handleExited} onHide={handleHide} scroll={false} backdrop={true}>
      <Container fluid>
        <Row className="d-flex" style={{ height: '40px', backgroundColor: 'var(--background-tertiary)' }}>
          <Offcanvas.Header className="p-1" closeButton />
        </Row>
        <Row>
          {children.Sidebar}
        </Row>
      </Container>
    </Offcanvas>
  )
}