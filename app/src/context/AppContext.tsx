import React, {createContext, useEffect, useState} from "react";
import IPatient from "../types/interfaces/Patient";
import IColumn from "../types/interfaces/Column";
import CardService from "../services/CardService";
import {StatusEnum} from "../types/enums/StatusEnum";
import {Preloader} from "../components/Preloader/Preloader";

interface Props {
    children: React.ReactNode;
}

export const AppContext = createContext<any>({});

const AppProvider: React.FC<Props> = ({ children }) => {
    const [cards, setCards] = useState<Array<IPatient>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [columns, setColumns] = useState<Array<IColumn>>([]);
    const [emptyResults, setEmptyResults] = useState<boolean>(false);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [toDelete, setToDelete] = useState<IPatient>({created_date: "", id: -1, patient_name: '', status: StatusEnum.PENDING, arrhythmias: []});
    const [toUpdate, setToUpdate] = useState<IPatient>({created_date: "", id: -1, patient_name: '', status: StatusEnum.PENDING, arrhythmias: []});
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            const json = await CardService.getAll();
            const initialCards: IPatient[] = json.data as IPatient[];
            setCards(initialCards);
            initColumns(initialCards);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setEmptyResults(true);
        }
    };

    useEffect(() => {
        fetchData().catch((err) => console.log(err));
    }, []);

    const initColumns = (patients: IPatient[]) => {
        const initialColumnsName = Object.keys(StatusEnum).filter((status: string) => !(parseInt(status) >= 0));
        const cols = initialColumnsName.map((columnTitle: string, index: number) => ({
            title: columnTitle,
            id: index,
            cards: patients.filter((card: IPatient) => card.status.toString() === columnTitle),
        }));
        setColumns(cols);
    }

    const handleShowConfirm = (patient: IPatient) => {
        setShowConfirm(true);
        setToDelete(patient);
    }

    const handleShowAddForm = () => setShowAddForm(true);

    const handleShowUpdateForm = (patient: IPatient) => {
        setToUpdate(patient);
        setShowUpdateForm(true);
    }

    const moveToColumn = async (patient: IPatient, destination: string) => {
        // Update the status of the patient
        const source: string = patient.status.toString();

        if (destination === StatusEnum.PENDING.toString()) {
            patient.status = StatusEnum.PENDING;
        }

        if (destination === StatusEnum.DONE.toString()) {
            patient.status = StatusEnum.DONE;
        }

        if (destination === StatusEnum.REJECTED.toString()) {
            patient.status = StatusEnum.REJECTED;
        }
        try {
            const response = await CardService.update(patient.id, patient);
            if (response.status === 200) {
                setCards([...cards.filter((card: IPatient) => card.id !== patient.id), patient]);
                initColumns(cards);
                setMessage('The Patient ' + patient.patient_name + ' successfully moved to ' + destination + ' column');
                setShowNotification(true);
            } else {
                setMessage('Unable to move ' + patient.patient_name + ' from ' + source + ' column to ' + destination + ' column');
                setShowNotification(true);
            }
        } catch (err) {
            setMessage('Error occurred while moving ' + patient.patient_name + ' to ' + destination);
            setShowNotification(true);
        }
    }

    return (
        <>
            {loading && <Preloader/>}
            {!loading &&
                <>
                    <AppContext.Provider value={{
                        cards,
                        columns,
                        emptyResults,
                        initColumns,
                        setEmptyResults,
                        handleShowAddForm,
                        handleShowConfirm,
                        setMessage,
                        setShowNotification,
                        moveToColumn,
                        setColumns,
                        showAddForm,
                        setShowAddForm,
                        showConfirm,
                        toDelete,
                        setShowConfirm,
                        setToDelete,
                        message,
                        showNotification,
                        setCards,
                        showUpdateForm,
                        setShowUpdateForm,
                        toUpdate,
                        handleShowUpdateForm,
                        setToUpdate,
                        isSearching,
                        setIsSearching,
                    }}> {children}
                    </AppContext.Provider>

                </>
            }
        </>
    )
}

export default AppProvider;