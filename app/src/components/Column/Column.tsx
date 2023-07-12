import IColumn from "../../types/interfaces/Column";
import {Button, Card, Col} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import React, {useContext, useMemo} from "react";
import {StatusEnum} from "../../types/enums/StatusEnum";
import {AppContext} from "../../context/AppContext";
import IPatient from "../../types/interfaces/Patient";
import PatientCard from "../Patient/PatientCard";

interface ColumnProps {
    column: IColumn,
}

const Column = (props: ColumnProps) => {
    const context = useContext(AppContext);

    return useMemo(() => {
        const column: IColumn = props.column;
        return (
            <Col lg={4} key={column.id}>
                <Card className="mb-3 border-black">
                    <CardHeader className="border-black d-flex justify-content-between" title={column.title}>
                        <Card.Title className="fw-bold">{column.title}</Card.Title>
                        {column.title === StatusEnum.PENDING.toString() &&
                            <Button disabled={context.isSearching} size="sm" onClick={context.handleShowAddForm} variant="dark" className="fw-bold">
                                New Patient
                            </Button>
                        }
                    </CardHeader>
                    <Card.Body>
                        {column.cards.map((card: IPatient, index: number) => {
                            return <PatientCard key={index} patient={card}/>
                        })}
                    </Card.Body>
                </Card>
            </Col>
        )
    }, [props.column.cards?.length, context.isSearching]);
}

export default Column;