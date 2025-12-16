export type UserRole = 'ADMIN' | 'CLIENTE' | 'VENDEDOR';

export type Genero = 'FEMENINO' | 'MASCULINO' | 'SIN_ESPECIFICAR';

export interface User {
    id: number;
    run: string;
    nombre: string;
    apellidos: string;
    email: string;
    password?: string;
    fechaNacimiento: string;
    direccion: string;
    region: string;
    comuna: string;
    puntosLevelUp: number;
    codigoReferido?: string;
    genero: Genero;
    roles: UserRole[];
}

export interface UserDTO {
    id: number;
    run: string;
    nombre: string;
    apellidos: string;
    email: string;
    fechaNacimiento: string;
    direccion: string;
    region: string;
    comuna: string;
    genero: string;
    roles: string[];
    puntosLevelUp: number;
    codigoReferido?: string;
}

export interface UserCreateDTO {
    run: string;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    fechaNacimiento: string;
    direccion: string;
    region: string;
    comuna: string;
    genero: Genero;
    roleIds: number[];
}

export interface UserUpdateDTO {
    nombre?: string;
    apellidos?: string;
    direccion?: string;
    region?: string;
    comuna?: string;
    genero?: Genero;
    roleIds?: number[];
}