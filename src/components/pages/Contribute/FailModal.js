import { Modal, Button } from 'react-bootstrap';

export default function FailModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Uh oh
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Something went wrong.</h4>
        <p>
          Your form was not sent succesfully. Please try again.
        </p>
        <p>
          If you have any questions, please contact us at <a href="mailto: ozuwiki@ozu.edu.tr"> ozuwiki@ozu.edu.tr</a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}