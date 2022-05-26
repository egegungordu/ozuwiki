import { Modal, Button } from 'react-bootstrap';

export default function SuccessModal(props) {
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
          Your form was sent succesfuly!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Now what?</h4>
        <p>
          Thank you for your contribution! Your submission will be reviewed by our team. When the review is complete, you will receive an email.
        </p>
        <p className="m-0">
          If you have any questions, please contact us at <a href="mailto: ozuwiki@ozu.edu.tr"> ozuwiki@ozu.edu.tr</a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}