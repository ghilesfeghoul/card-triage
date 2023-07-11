import {Col, Row, Toast, ToastContainer} from "react-bootstrap";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";

const AppNotif = () => {
    const context = useContext(AppContext);
    return(
        <Row>
            <Col xs={6}>
                <ToastContainer
                    className="p-3"
                    position="bottom-end"
                    style={{zIndex: 1}}
                >
                    <Toast onClose={() => context.setShowNotification(false)} show={context.showNotification} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Notification</strong>
                        </Toast.Header>
                        <Toast.Body>{context.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
        </Row>
    );
}

export default AppNotif;