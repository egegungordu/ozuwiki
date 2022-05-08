import { Container } from 'react-bootstrap';
import TableOfContents from './TableOfContents';
import { useWindowScroll } from 'react-use';

export default function ArticleSidebar(props) {
  const { markdown } = props.article || {};
  const { setOffcanvasShow } = props;
  const { y } = useWindowScroll()
  
  const handleClick = () => setOffcanvasShow(false);

  return (
    <>
      <h4 className="ozuwikiheader text-center my-5">Ozu Wiki</h4>
      <div className="sticky-top px-4" style={{top: 48}}>
          <h6><b>Contents</b></h6>
          <Container fluid className={`px-0 toc-container-article${y > 120 ? ' scrollable' : ''}`}>
              <TableOfContents markdown={markdown} compact={3} onLinkClick={handleClick} />
          </Container>
      </div>
    </>
  )
}