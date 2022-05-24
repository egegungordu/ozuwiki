import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { WikiPageContext } from '../../../context/WikiPageContext';
import { useContext } from 'react';

export default function HomeMain() {
  const navigate = useNavigate();
  const wikiPageContext = useContext(WikiPageContext);

  return (
    <Row className="h-100">
          <Col className="my-auto text-center">
            <Button onClick={() => {
              navigate('/article/CS_391')
            }}>
              Go to article
            </Button>
            <Button onClick={() => {
              wikiPageContext.setShowOffcanvas(true)
            }}>
              Click me
            </Button>
          </Col>
        </Row>
  )
}
