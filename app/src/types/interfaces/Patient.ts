import {StatusEnum} from "../enums/StatusEnum";

export default interface IPatient {
    id: number,
    created_date: string,
    patient_name: string,
    status: StatusEnum,
    arrhythmias: string[],
}
