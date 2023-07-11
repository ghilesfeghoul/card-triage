import IPatient from "../interfaces/Patient";

export default interface IColumn {
    id: number;
    title: string;
    cards: Array<IPatient>
}