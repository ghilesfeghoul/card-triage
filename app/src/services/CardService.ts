import http from '../api/http-common';
import IPatient from "../types/interfaces/Patient";

const getAll = async () => {
    return await http.get<Array<IPatient>>("/cards");
};

const create = async (data: IPatient) => {
    return await http.post<IPatient>("/cards", data);
};

const update = async (id: any, data: IPatient) => {
    return await http.put<any>(`/cards/${id}`, data);
};

const remove = async (id: any) => {
    return await http.delete<any>(`/cards/${id}`);
};

const CardService = {
    getAll,
    create,
    update,
    remove,
}

export default CardService;