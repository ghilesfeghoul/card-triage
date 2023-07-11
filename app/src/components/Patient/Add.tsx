import {Button, Form, Modal} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {StatusEnum} from "../../types/enums/StatusEnum";
import {format} from "date-fns";
import CardService from "../../services/CardService";
import {arrhythmiaOptions} from "../../types/consts/arrhythmiaOptions";
import IColumn from "../../types/interfaces/Column";

const AddPatient = () => {
    const context = useContext(AppContext);
    const handleCloseAddForm = () => context.setShowAddForm(false);

    const [patientName, setPatientName] = useState('');
    const [selectedArrhythmias, setSelectedArrhythmias] = useState<string[]>([]);
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        // Create a copy of the actual columns
        const newColumns = [...context.columns];

        // Check if arrhythmia is selected
        if (selectedArrhythmias.length === 0) {
            alert('Please select at least one arrhythmia type');
            return;
        }

        // Create a new patient
        const newPatient: any = {
            patient_name: patientName,
            arrhythmias: selectedArrhythmias,
            status: StatusEnum.PENDING,
            created_date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx")
        };

        // Send the new patient to the server and update the columns
        try {
            const response = await CardService.create(newPatient);
            if (response.status === 201) {
                context.setMessage('successfully created');
                handleCloseAddForm();
                context.cards.push(response.data);
                newColumns.find((column: IColumn) => column.title === response.data.status.toString()).cards.push(response.data);
                context.setColumns(newColumns);

                context.setShowNotification(true);

                // Reset the form
                setPatientName('');
                setSelectedArrhythmias([]);
            } else {
                context.setMessage('Unable to create patient, please try again later');
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

    return (
        <Modal
            size="lg"
            show={context.showAddForm}
            onHide={handleCloseAddForm}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add a new patient</Modal.Title>
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
                    <Button variant="secondary" onClick={handleCloseAddForm}>
                        Close
                    </Button>
                    <Button disabled={!patientName || !selectedArrhythmias.length} variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPatient;