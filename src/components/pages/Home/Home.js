import WikiPage from '../../common/WikiPage/WikiPage';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

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
        {(setOffcanvasShow) => {
          return (<p>
            Im the sidebar
          </p>)
        }}
      </WikiPage.Sidebar>
      <WikiPage.Main>
        <Row className="h-100">
          <Col className="my-auto text-center">
            <Button onClick={()=>{
              navigate('/article/test')
            }}>
              Click me 
            </Button>
          </Col>
        </Row>
      </WikiPage.Main>
    </WikiPage>
  )
}