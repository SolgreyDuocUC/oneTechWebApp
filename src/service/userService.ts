import axios from "axios";

const API_URL = 'http://localhost:8085/api/v1/users';

export const getUsers = async (): Promise<any[]> => {
    const response = await axios.get<any[]>(API_URL);
    return response.data;
};

export const getUserById = async (id: string): Promise<any> => {
    const response = await axios.get<any>(`${API_URL}/${id}`);
    return response.data;
};

export const createUser = async (userData: any): Promise<any> => {
    const response = await axios.post<any>(API_URL, userData);
    return response.data;
};

export const updateUser = async (id: string, userData: any): Promise<any> => {
    const response = await axios.put<any>(`${API_URL}/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete<void>(`${API_URL}/${id}`);
};