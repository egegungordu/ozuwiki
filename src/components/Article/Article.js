import { Col, ListGroup, Offcanvas, Row, Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import WikiNavbar from './WikiNavbar';
import WikiArticle from './WikiArticle';
import React from 'react';
import { useWindowScroll } from 'react-use';

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
  
  const y = useScrollPosition(30 /*fps*/);
  
  return (
    <>
      <WikiNavbar article={articleContent.article}/>
      <WikiArticle content={articleContent} y={y} />
    </>
  );
}
//TODO : fix the lag when scrolling
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};