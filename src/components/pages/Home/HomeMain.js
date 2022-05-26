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
          <h2>
              Welcome to the Ozu Wiki
          </h2>
          <p>
            Ozu Wiki aims to inform students about the Ozyegin University. It is made by students, for students.
            You can find any relevant information about our school here. 
            Can't find what you are looking for? You can add it by clicking <a href="">here!</a>
          </p>
            <Button onClick={() => {
              navigate('/article/CS_391')
            }}>
              Go to article
            </Button>
          </Col>
        </Row>
  )
}
