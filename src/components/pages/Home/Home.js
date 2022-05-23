import WikiPage from '../../common/WikiPage/WikiPage';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { WikiPageContext } from '../../../context/WikiPageContext';
import { useContext } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const wikiPageContext = useContext(WikiPageContext);

  return (
    <WikiPage
      title="Home"
      showSearch={true}
      showAccount={true}
      navigation={[
        {
          title: 'Main Page',
          path: '/',
          active: true
        }
      ]}
    >
      <WikiPage.Sidebar>
        <p>
          This is the sidebar.
        </p>
      </WikiPage.Sidebar>
      <WikiPage.Main>
        <Row className="h-100">
          <Col className="my-auto text-center">
            <Button onClick={() => {
              navigate('/article/CS_391')
            }}>
              Click me
            </Button>
            <Button onClick={() => {
              wikiPageContext.setShowOffcanvas(true)
            }}>
              Click me
            </Button>
          </Col>
        </Row>
      </WikiPage.Main>
    </WikiPage>
  )
}