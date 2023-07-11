import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import CardService from "../../services/CardService";
import {Button, Form, Modal} from "react-bootstrap";
import {arrhythmiaOptions} from "../../types/consts/arrhythmiaOptions";
import {StatusEnum} from "../../types/enums/StatusEnum";

const UpdatePatient = () => {
    const context = useContext(AppContext);
    const handleCloseUpdateForm = () => context.setShowUpdateForm(false);

    const [patientName, setPatientName] = useState<string>('');
    const [selectedArrhythmias, setSelectedArrhythmias] = useState<string[]>([]);
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        // Create a copy of the actual columns
        const newCards = [...context.cards];
        let toUpdate = context.toUpdate;

        // Check if arrhythmia is selected
        if (selectedArrhythmias?.length === 0) {
            alert('Please select at least one arrhythmia type');
            return;
        }
        if (context.toUpdate.patient_name === patientName && context.toUpdate.arrhythmias === selectedArrhythmias) {
            alert('Nothing to update!');
            return;
        }

        toUpdate.patient_name = patientName;
        toUpdate.arrhythmias = selectedArrhythmias;

        // Send the new patient to the server and update the columns
        try {
            const response = await CardService.update(toUpdate.id, toUpdate);
            if (response.status === 200) {
                context.setMessage('successfully updated');
                for (let i=0; i<newCards.length; i++) {
                    if (newCards[i].id === toUpdate.id) {
                        newCards[i] = toUpdate;
                        break;
                    }
                }
                context.setCards(newCards);
                context.setShowNotification(true);
                context.setToUpdate({created_date: "", id: -1, patient_name: '', status: StatusEnum.PENDING, arrhythmias: []});
                setSelectedArrhythmias([]);
                handleCloseUpdateForm();
            } else {
                context.setMessage('Unable to update '+ context.toUpdate.patient_name +', please try again later');
                context.setShowNotification(true);
            }
        } catch (err: any) {
            context.setMessage(err.message);
            context.setShowNotification(true);
        }

    }
    const handleArrhythmiaChange = (event: any) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option: HTMLOptionElement) => option.value);
        setSelectedArrhythmias(selectedOptions);
    };

    useEffect(() =>{
        setPatientName(context.toUpdate.patient_name);
        setSelectedArrhythmias(context.toUpdate.arrhythmias);
    }, [context.toUpdate]);

    return (
        <>
        {patientName &&

        <Modal
            size="lg"
            show={context.showUpdateForm}
            onHide={handleCloseUpdateForm}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Patient {patientName}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="patientName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Please fill in the patient name"
                            value={patientName}
                            onChange={(event) => setPatientName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="arrhythmias">
                        <Form.Label>Arrhythmias</Form.Label>
                        <Form.Control aria-required={true} as="select" multiple value={selectedArrhythmias}
                                      onChange={handleArrhythmiaChange}>
                            {arrhythmiaOptions.map((arrhythmia) => (
                                <option key={arrhythmia} value={arrhythmia}>
                                    {arrhythmia}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateForm}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        }
        </>
    )
}

export default UpdatePatient;