import {AppContext} from "../../context/AppContext";
import React, {useContext} from "react";
import IColumn from "../../types/interfaces/Column";
import {Alert, Container, Row} from "react-bootstrap";
import Column from "../Column/Column";
import AddPatient from "../Patient/Add";
import RemovePatient from "../Patient/Remove";
import UpdatePatient from "../Patient/Update";

const AppContent = () => {
    const context = useContext(AppContext);

    return (
        <Container className="py-5">
            {!context.emptyResults &&
                <>
                    <Row>
                        {context.columns.map((column: IColumn, index: number) => {
                            return <Column key={index} column={column}/>
                        })}
                    </Row>
                    <AddPatient/>
                    <UpdatePatient/>
                    <RemovePatient/>
                </>
            }
            {context.emptyResults &&
                <Alert variant="danger" className="text-center text-dark fw-bold">
                    Oops! it seems there is no results for your search request
                </Alert>
            }
        </Container>
    );
}

export default AppContent;