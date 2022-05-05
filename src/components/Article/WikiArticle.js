import { Col, ListGroup, Offcanvas, Row, Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import React from 'react';
import TableOfContents from './TableOfContents';
import { useWindowScroll } from 'react-use';

export default function WikiArticle(props) {
  const { 
    imageUrl = 'https://via.placeholder.com/350', 
    imageDescription = 'Image Description', 
    details = [
      {
        title: 'Title 1',
        description: 'Description 1'
      },
      {
        title: 'Title 2',
        description: 'Description 2'
      }
    ], 
    markdown} = props.article
  // scrolling is laggy in dev build
  const { y } = useWindowScroll()

  return (
    <>
    <Container fluid="xxl" style={{paddingTop: '2.5rem'}}>
      <Row>
        <Col xs={3} className="toc-column d-none d-lg-block p-0">
          <h4 className="ozuwikiheader text-center my-5">Ozu Wiki</h4>
          <div className="sticky-top ps-3" style={{top: 48}}>
              <h6><b>Contents</b></h6>
              <Container fluid className={`px-0 toc-container-article${y > 120 ? ' scrollable' : ''}`}>
                  <TableOfContents markdown={markdown} compact={3}/>
              </Container>
          </div>
        </Col>
        <Col xs={12} sm={8} lg={6} style={{zIndex: 1}} className="article-column shadow-sm p-5 order-2 order-sm-1">
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]}
            components = {{
              h1: HeadingRenderer,
              h2: HeadingRenderer,
              h3: HeadingRenderer,
              h4: HeadingRenderer,
              h5: HeadingRenderer,
              h6: HeadingRenderer,
            }}
          />
        </Col>
        <Col xs={12} sm={4} lg={3} className="details-column p-0 order-1 order-sm-2">
          <img src={imageUrl} alt="placeholder" className="img-fluid mx-auto d-block" />
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p className="m-0">
                {imageDescription}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Container fluid className="p-0">
                {details.map((detail, index) => {
                  return (
                    <Row key={index} className="py-2">
                      <Col xs={4}>
                        <h6 className="m-0"><b>{detail.title}</b></h6>
                      </Col>
                      <Col xs={8}>
                        <p className="m-0">{detail.description}</p>
                      </Col>
                    </Row>
                  )
                })}
              </Container>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
    </>
  )
}

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children)
  var text = children.reduce(flatten, '')
  var slug = text.toLowerCase().replace(/\W/g, '-')
  return React.createElement('h' + props.level, {id: slug, class: 'anchor'}, props.children)
}