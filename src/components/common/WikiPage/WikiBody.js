import { Col, Row, Container } from 'react-bootstrap';
import React from 'react';

export default function WikiBody(props) {
  const { children, sidebarRule } = props;
  
  return (
    <Container id="wiki-body" fluid="xxl" className="d-flex flex-grow-1" style={{paddingTop: '2.5rem'}}>
      <Row className="flex-grow-1 px-0 px-md-5 px-xxl-0">
        {children.Sidebar && <Col xs={4} xl={3} className={`p-0 sidebar-column ${sidebarRule}`}>
          {children.Sidebar.props.children && children.Sidebar.props.children(() => {})}
        </Col>}
        <Col style={{zIndex: 1}} className="p-0 main-column shadow-sm order-2 order-sm-1 px-1">
          {children.Main}
        </Col>
        {children.Panel && <Col xs={12} sm={4} xl={3} className="p-0 panel-column order-1 order-sm-2">
          {children.Panel}
        </Col>}
      </Row>
    </Container>
  )
}