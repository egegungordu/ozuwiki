import { Col, ListGroup, Offcanvas, Row, Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import WikiNavbar from './WikiNavbar';
import WikiArticle from './WikiArticle';
import TableOfContents from './TableOfContents';
import WikiOffcanvas from './WikiOffcanvas';
import React from 'react';
import { useWindowSize } from 'react-use';
import { BsSearch } from 'react-icons/bs';

export default function Article() {

  const markdown = `
  # Title
  ---
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  ## Subtitle
  ---
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  | Header 1 | Header 2 |
  | -------- | -------- |
  | Cell 1   | Cell 2   |
  | Cell 3   | Cell 4   |
  | Cell 5   | Cell 6   |
  | Cell 7   | Cell 8   |
    
  ## waku waku

  # GFM

  ## Autolink literals

  www.example.com, https://example.com, and contact@example.com.

  ### Escaping

  \`This is a code block\`
  
  # All headers

  ## Header 2
  ### Header 3
  #### Header 4
  ##### Header 5
  ###### Header 6
  ###### Header 6
  ###### Header 6
  ###### Header 6
  
  ## Footnote
  
  # Very long long long long long long long header

  A note[^1]

  [^1]: Big note.

  ## Strikethrough

  ~one~ or ~~two~~ tildes.

  ## Table

  | a | b  |  c |  d  |
  | - | :- | -: | :-: |

  ## Tasklist

  * [ ] to do
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
  * [x] done
    
  ## Header 2
  ### Header 3
  #### Header 4
  #### Header 4
  #### Header 4
  #### Header 4
  #### Header 4
  #### Header 4
  #### Header 4

  ## Bottom
  `

  const articleContent = {
    imageUrl: "https://picsum.photos/350", 
    imageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum eget nunc tincidunt, euismod euismod.",
    article: markdown,
    details: [
      {
        title: "Title 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum eget nunc tincidunt, euismod euismod."
      },
      {
        title: "Title 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum eget nunc tincidunt, euismod euismod."
      } 
    ]
  }

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
      <WikiArticle content={articleContent} />
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
                    <TableOfContents article={articleContent.article} compact={3} onLinkClick={handleOffcanvasLinkClick} />
                </Container>
            </div>
          </Col>
        }
      />
    </>
  );
}