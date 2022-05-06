/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React from 'react';
import WikiNavbar from '../../common/WikiNavbar';
import TableOfContents from './TableOfContents';
import WikiArticle from './WikiArticle';
import { getArticle } from '../../../api/ArticleAPI';

export default function Article() {
  const [article, setArticle] = React.useState(null);
  const [closeOffcanvas, setCloseOffcanvas] = React.useState(() => {});
  const params = useParams();
  
  const handleOffcanvasLinkClick = () => {
    closeOffcanvas()
  }
  
  React.useEffect(() => {
    const asyncSet = async () => {
      const response = await getArticle(params.articleName);
      setArticle(response)
    }
    asyncSet()
  }, []);
  
  return (
    <>
      <WikiArticle article={article}/>
      <WikiNavbar 
        title="Article"
        showHome={true}
        showSearch={true}
        showAccount={true}
        offcanvasEnabled={true}
        offcanvasCloseCallback={(offcanvasClose) => {
          setCloseOffcanvas(() => offcanvasClose)
        }}
        offcanvasContent={
          <Col className="toc-column p-0">
            <h4 className="ozuwikiheader text-center my-5">Ozu Wiki</h4>
            <div className="sticky-top px-5" style={{top: 48}}>
                <h6><b>Contents</b></h6>
                <Container fluid className={`px-0 toc-container-article`}>
                    <TableOfContents markdown={article && article.markdown} compact={3} onLinkClick={handleOffcanvasLinkClick} />
                </Container>
            </div>
          </Col>
        }
        navigation={[
          {
            title: "Read",
            path: `/article/${params.articleName}`,
            active: true
          },
          {
            title: "Contribute",
            path: `/article/${params.articleName}/contribute`,
          },
        ]}
      />
    </>
  )
}
      