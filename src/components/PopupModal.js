import React from 'react';
import { Modal, ModalBody, ModalTitle, Container, ModalFooter, Button } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
const PopupModal = (props) => {
    const { title, content, onHide } = props;
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
            <ModalHeader closeButton>
                <ModalTitle id="contained-modal-title-vcenter">
                    {title}
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="show-grid">
                <Container>
                    {content}
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onHide}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default PopupModal;