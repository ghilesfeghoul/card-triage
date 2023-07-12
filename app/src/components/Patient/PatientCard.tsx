import React, {useContext, useMemo} from 'react';
import {ButtonGroup, Card, Dropdown, DropdownButton} from 'react-bootstrap';
import {StatusEnum} from "../../types/enums/StatusEnum";
import IPatient from "../../types/interfaces/Patient";
import {arrhythmiaColors} from "../../types/consts/arrhythmiaColors";
import {AppContext} from "../../context/AppContext";

type PatientCardProps = {
    patient: IPatient,
};

const PatientCard = ({patient}: PatientCardProps) => {
    const context = useContext(AppContext);

    return useMemo(() => {
        const date = new Date(patient.created_date);

        return (
            <Card className="mb-3 cursor-grab border-black">
                <Card.Body>
                    {patient.arrhythmias.map((arrhythmia: string, index: number) => {
                        return <span key={index}
                                     className={'badge text-white mb-2 mx-1 bg-' + arrhythmiaColors[arrhythmia]}>{arrhythmia}</span>
                    })}
                    <p className="mb-0">{patient.patient_name}</p>
                    <div className="text-right">
                        <small className="text-muted mb-1 d-inline-block">
                            Created date : {date.toLocaleDateString()}
                        </small>
                    </div>
                </Card.Body>
                <Card.Footer className="bg-white d-flex justify-content-end border-black">
                    <DropdownButton
                        as={ButtonGroup}
                        size="sm"
                        variant="light"
                        title="Actions"
                    >
                        {patient.status === StatusEnum.PENDING &&
                            <>
                                <Dropdown.Item
                                    onClick={async () => {
                                            await context.moveToColumn(patient, StatusEnum.DONE.toString())
                                        }}
                                >
                                    Move to DONE
                                </Dropdown.Item>
                                <Dropdown.Item onClick={
                                        async () => {
                                            await context.moveToColumn(patient, StatusEnum.REJECTED.toString())
                                        }}
                                >
                                    Move to REJECTED
                                </Dropdown.Item>
                            </>
                        }
                        {patient.status === StatusEnum.DONE &&
                            <>
                                <Dropdown.Item onClick={
                                        async () => {
                                            await context.moveToColumn(patient, StatusEnum.REJECTED.toString())
                                        }}
                                >
                                    Move to REJECTED
                                </Dropdown.Item>
                            </>
                        }
                        {patient.status === StatusEnum.REJECTED &&
                            <>
                                <Dropdown.Item onClick={
                                        async () => {
                                            await context.moveToColumn(patient, StatusEnum.DONE.toString())
                                        }}
                                >
                                    Move to DONE
                                </Dropdown.Item>
                            </>
                        }
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={async () => {context.handleShowUpdateForm(patient)}}>
                            Update
                        </Dropdown.Item>
                        <Dropdown.Item onClick={async () => {context.handleShowConfirm(patient)}}>
                            Delete
                        </Dropdown.Item>
                    </DropdownButton>
                </Card.Footer>
            </Card>
        );
    }, [patient.patient_name, patient.arrhythmias, context.toDelete]);
};

export default PatientCard;
