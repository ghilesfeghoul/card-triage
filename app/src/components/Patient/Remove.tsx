import {Button, Modal} from "react-bootstrap";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import CardService from "../../services/CardService";
import IPatient from "../../types/interfaces/Patient";
import {StatusEnum} from "../../types/enums/StatusEnum";

const RemovePatient = () => {
    const context = useContext(AppContext);

    const handleCloseConfirm = () => {
        context.setToDelete({created_date: '', id: -1, patient_name: '', status: StatusEnum.PENDING, arrhythmias: []});
        context.setShowConfirm(false);
        context.setShowNotification(true);
    }
    const handleDeletePatient = async () => {

        const response = await CardService.remove(context.toDelete.id);
        if (response.status === 200) {
            context.setMessage(`Patient ${context.toDelete.patient_name} deleted successfully`);
            let cards = context.cards;
            const toDelete = context.toDelete;
            cards = cards.filter((card: IPatient) => card.id !== toDelete.id);
            context.setCards(cards);
            context.initColumns(cards);
            handleCloseConfirm();
        } else {
            context.setMessage(`Unable to delete ${context.toDelete.patient_name}`);
            context.setShowNotification(true);
        }
    }

    return (
        <Modal
            size="lg"
            show={context.showConfirm}
            onHide={handleCloseConfirm}
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm delete patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You are about to delete {context.toDelete.patient_name} from the database, this action is
                irreversible!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleCloseConfirm}>
                    Close
                </Button>
                <Button onClick={handleDeletePatient} variant="danger" type="submit">
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RemovePatient;