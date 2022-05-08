import { Container, Row, Col } from 'react-bootstrap';
import { BiCopyright } from 'react-icons/bi';

export default function WikiFooter() {
  return (
    <Container fluid>
      <hr className="mt-4"></hr>
      <Row className="m-4">
        <Col className="p-1">
          <span className="text-muted">
            <small>
              Copyright
              {' '}<BiCopyright />{' '}
              2022
              Ozu Wiki
            </small>
          </span>
        </Col>
        <Col className="p-1 text-end">
          <span className="text-muted">
            <small>
              Made with the power of God and Anime
            </small>
          </span>
        </Col>
      </Row>
    </Container>
  )
}

                    
                        