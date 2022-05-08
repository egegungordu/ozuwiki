/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Navbar, Container } from 'react-bootstrap';
import React from 'react';
import { useMeasure } from 'react-use';
import useBreakpoint from '../../../hooks/use-breakpoint';

export default function WikiNavbar(props) {
  const { 
    sidebarRule = '',
    panelRule = '',
    sidebarExists = false,
    panelExists = false,
  } = props

  const [children, setChildren] = React.useState({});
  const [mainItems, setMainItems] = React.useState([]);
  const [sidebarRef, { width: sidebarWidth }] = useMeasure() 
  const [panelRef, { width: panelWidth }] = useMeasure() 
  const breakpoint = useBreakpoint();

  React.useLayoutEffect(() => {
    const children = {};
    if (Array.isArray(props.children)) {
      props.children.forEach(child => {
        children[child.type.displayName] = child;
      })
    } else {
      children[props.children.type.displayName] = props.children;
    }
    setChildren(children);
    const isSidebarCollapsed = sidebarWidth <= 0
    const isPanelCollapsed = panelWidth <= 0
    const mainItems = []
    if (isSidebarCollapsed) {
      children.SidebarCollapsed && mainItems.push(
        <React.Fragment key="sidebar-collapsed">
          {children.SidebarCollapsed}
        </React.Fragment>
      ) 
    }
    children.Main && mainItems.push(
      <React.Fragment key="main">
        {children.Main}
      </React.Fragment>
    )
    if (isPanelCollapsed) {
      children.PanelCollapsed && mainItems.push(
        <React.Fragment key="panel-collapsed">
          {children.PanelCollapsed.props && children.PanelCollapsed.props.children(breakpoint)}
        </React.Fragment>
      )
    }
    setMainItems(mainItems)
  }, [props.children, breakpoint, sidebarWidth, panelWidth]);
  
  React.useEffect(() => {
  }, [breakpoint, children])
  

  return (
    <>
    <Navbar id="wiki-nav" fixed="top" expand="lg" className="ps-0 py-0 d-flex flex-column">
      <Container fluid="xxl" className="px-0 px-md-5 px-xxl-0" >
        {sidebarExists && <Col ref={sidebarRef} xs={4} xl={3} className={`my-0 d-flex flex-row ${sidebarRule}`}>
          {children.Sidebar}
        </Col>}
        <Col className="my-0 d-flex flex-row">
          {mainItems}
        </Col>
        {panelExists && <Col ref={panelRef} xs={4} xl={3} className={`my-0 d-flex flex-row ${panelRule}`}>
          {children.Panel}
        </Col>}
      </Container>
      <Container fluid="xxl" className="px-0 px-md-5 px-xxl-0" id="navbar-item-fullwidth">
        {children.Fullwidth}
      </Container>
    </Navbar>
    </>
  )
}

function Main(props) {
  return props.children
}

function Sidebar(props) {
  return props.children
}

function SidebarCollapsed(props) {
  return props.children
}

function Panel(props) {
  return props.children
}

function PanelCollapsed(props) {
  return props.children(props)
}

function Fullwidth(props) {
  return props.children
}

WikiNavbar.Main = Main
WikiNavbar.Sidebar = Sidebar
WikiNavbar.SidebarCollapsed = SidebarCollapsed
WikiNavbar.Panel = Panel
WikiNavbar.PanelCollapsed = PanelCollapsed
WikiNavbar.Fullwidth = Fullwidth
WikiNavbar.Main.displayName = 'Main'
WikiNavbar.Sidebar.displayName = 'Sidebar'
WikiNavbar.SidebarCollapsed.displayName = 'SidebarCollapsed'
WikiNavbar.Panel.displayName = 'Panel'
WikiNavbar.PanelCollapsed.displayName = 'PanelCollapsed'
WikiNavbar.Fullwidth.displayName = 'Fullwidth'