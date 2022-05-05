import { Col, ListGroup, Offcanvas, Row, Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import WikiNavbar from './WikiNavbar';
import WikiArticle from './WikiArticle';
import TableOfContents from './TableOfContents';
import WikiOffcanvas from './WikiOffcanvas';
import React from 'react';
import { useWindowSize } from 'react-use';
import { BsSearch } from 'react-icons/bs';

export default function Article() {
  const [article, setArticle] = React.useState(
    {
      imageUrl: 'https://picsum.photos/300',
      imageDescription: 'Placeholder image',
      markdown: '',
      details: [
        {
          title: 'Title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          title: 'Subtitle',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ]
    }
  );
  
  React.useEffect(() => {
    fetch('https://jaspervdj.be/lorem-markdownum/markdown.txt').then(async (response) => {
      const articleCopy = { ...article };
      articleCopy.markdown = await response.text();
      setArticle(articleCopy);
    })
  }, []);

  const [showOffcanvas, setShowOffcanvas] = React.useState(false);
  const [target, setTarget] = React.useState(null);
  const size = useWindowSize();
  
  React.useEffect(() => {
    if (size.width >= 992) {
      setShowOffcanvas(false)
    }
  }, [size.width]);
  
  const handleOffcanvasLinkClick = (e) => {
    e.preventDefault()
    setShowOffcanvas(false)
    setTarget(e.target.href)
  }
  
  const handleOffcanvasExited = () => {
    target && setTimeout(() => {
      document.getElementById(target.split('#')[1]).scrollIntoView({behavior: 'smooth'})
    }, 10)
  }
  
  const handleOffcanvasShow = () => {
    setTarget(null)
    setShowOffcanvas(true)
  }

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false)
  }
  
  return (
    <>
      <WikiNavbar 
        title="Article"
        showAccountButton={true}
        navigation={[
          {
            title: "Read",
            href: "#"
          },
          {
            title: "Contribute",
            href: "#contribute"
          },
        ]}
        extra={
          <button style={{height: '40px'}} className="pb-2 me-0 navbar-toggler rounded-0 border-0 shadow-none" onClick={handleOffcanvasShow}>
            <BsSearch />
          </button>
        }
      />
      <WikiArticle article={article}/>
      <WikiOffcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        onExited={handleOffcanvasExited}
        content={
          <Col className="toc-column p-0">
            <h4 className="ozuwikiheader text-center my-5">Ozu Wiki</h4>
            <div className="sticky-top ps-4" style={{top: 48}}>
                <h6><b>Contents</b></h6>
                <Container fluid className={`px-0 toc-container-article`}>
                    <TableOfContents markdown={article.markdown} compact={3} onLinkClick={handleOffcanvasLinkClick} />
                </Container>
            </div>
          </Col>
        }
      />
    </>
  );
}