import { Col, Row, Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import React from 'react';
import TableOfContents from './TableOfContents';
import { useWindowScroll } from 'react-use';
import Skeleton from 'react-loading-skeleton';
import { SkeletonArticle, SkeletonImage } from '../../common/Skeletons';

export default function WikiArticle(props) {
  const { 
    name,
    imageUrl, 
    imageDescription, 
    details = [null, null],
    markdown
  } = props.article || {}
  // scrolling is laggy in dev build
  const { y } = useWindowScroll()

  return (
    <>
    <Container fluid="xxl" className="min-vh-100 d-flex flex-column" style={{paddingTop: '2.5rem'}}>
      <Row className="flex-grow-1">
        <Col xs={3} className="toc-column d-none d-lg-block p-0">
          <h4 className="ozuwikiheader text-center my-5">Ozu Wiki</h4>
          <div className="sticky-top px-4" style={{top: 48}}>
              <h6><b>Contents</b></h6>
              <Container fluid className={`px-0 toc-container-article${y > 120 ? ' scrollable' : ''}`}>
                  <TableOfContents markdown={markdown} compact={3}/>
              </Container>
          </div>
        </Col>
        <Col xs={12} sm={8} lg={6} style={{zIndex: 1}} className="article-column shadow-sm px-5 py-4 order-2 order-sm-1">
          <div className="d-none d-sm-block">
            <h1>{name || <Skeleton />}</h1>
            <hr></hr>
          </div>
          {markdown 
            ? <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]}
                components = {{
                  h1: HeadingRenderer,
                  h2: HeadingRenderer,
                  h3: HeadingRenderer,
                  h4: HeadingRenderer,
                  h5: HeadingRenderer,
                  h6: HeadingRenderer,
                }}
              /> 
            : <SkeletonArticle />
          }
        </Col>
        <Col xs={12} sm={4} lg={3} className="details-column p-0 order-1 order-sm-2">
          <h1 className="p-3 m-0 d-sm-none" id="article-title">{name}</h1>
          {imageUrl ? <img src={imageUrl} alt="placeholder" className="img-fluid mx-auto d-block" />
            : <SkeletonImage />}
          <div className="px-3 pt-2">
            <p className="m-0">
              {imageDescription || <Skeleton />}
            </p>
            <hr className="m-2"></hr>
            <Container fluid className="p-0">
              {details.map((detail, index)  => {
                return (
                  <Row key={index} className="pb-3">
                    <Col xs={4}>
                      <h6 className="m-0">{detail ? detail.title : <Skeleton />}</h6>
                    </Col>
                    <Col xs={8}>
                      <p className="m-0">{detail ? detail.description : <Skeleton count={4}/>}</p>
                    </Col>
                  </Row>
                )
              })}
            </Container>
          </div>
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
  return React.createElement('h' + props.level, {id: slug, className: 'anchor'}, props.children)
}