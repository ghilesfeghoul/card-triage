import {AppContext} from "../../context/AppContext";
import React, {useCallback, useContext, useMemo, useRef, useState} from "react";
import {Container, Form, InputGroup, Navbar} from "react-bootstrap";
import logo from "../../logo.svg";
import {arrhythmiaColors} from "../../types/consts/arrhythmiaColors";
import IPatient from "../../types/interfaces/Patient";

const AppNavbar = () => {
    const context = useContext(AppContext);
    const inputs = useRef<Array<HTMLInputElement>>([]);
    const [filteredCards, setFilteredCards] = useState<IPatient[]>(context.cards);
    const handleInputs = useCallback((el: any) => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    }, []);

    return useMemo(() => {
        const nothing = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        }

        const handleSearch = () => {
            const searchValue = inputs.current[0]?.value.toLowerCase() || '';
            const selectValue = inputs.current[1]?.value || '';
            const cards = context.cards;

            context.setIsSearching(true);
            if (!searchValue && !selectValue) {
                context.setIsSearching(false);
            }

            const filtered = cards.filter((card: IPatient) => {
                const matchSearch = card.patient_name.toLowerCase().includes(searchValue);
                const matchSelect = selectValue === '' || card.arrhythmias.includes(selectValue);
                return matchSearch && matchSelect;
            });

            // Increase the performance by not rendering the non-corresponding columns
            if (!arrayEquals(filtered, filteredCards)) {
                setFilteredCards(filtered);
                if (filtered.length) {
                    context.setEmptyResults(false);
                } else {
                    context.setEmptyResults(true);
                }
                context.initColumns(filtered);
            }
        }

        const arrayEquals = (a: IPatient[], b: IPatient[]) => {
            return a.length === b.length &&
                a.every((val: IPatient, index: number) => val === b[index]);
        }

        const handleSelectChange = () => {
            handleSearch();
        }

        return (
            <Navbar className="bg-body-tertiary">
                <Container className="d-grid d-md-flex">
                    <Navbar.Brand className="text-center">
                        <img
                            alt="Patient Card Triage"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Patient Card Triage
                    </Navbar.Brand>
                    <Form onSubmit={nothing} className="d-flex">
                        <InputGroup className="m-3">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onKeyUp={handleSearch}
                                ref={handleInputs}
                                disabled={!context.cards?.length}
                            />
                            <Form.Select
                                ref={handleInputs}
                                onChange={handleSelectChange}
                                aria-label="Default select example"
                                disabled={!context.cards?.length}
                            >
                                <option value="">Arrhythmia type</option>
                                {
                                    Object.keys(arrhythmiaColors).map((arrhythmia: string, index: number) => {
                                        return <option value={arrhythmia} key={index}>{arrhythmia}</option>
                                    })
                                }
                            </Form.Select>
                        </InputGroup>
                    </Form>
                </Container>
            </Navbar>
        )
    }, [context.columns, context.isSearching]);
}

export default AppNavbar;