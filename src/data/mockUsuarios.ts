import type { User, Role } from '../types';

const ADMIN_ROLE: Role = {
  id: 1,
  name: 'ROLE_ADMIN',
};

const CLIENTE_ROLE: Role = {
  id: 2,
  name: 'CLIENTE',
};

export const usuarios: User[] = [
  {
    id: 1,
    run: '12345678-9',
    nombre: 'Admin',
    apellidos: 'One Tech',
    email: 'mi.calderons@duocuc.cl',
    password: 'admin123',
    fechaNacimiento: '2000-04-04',
    direccion: 'Av. Libertador 123',
    region: 'Metropolitana',
    comuna: 'Santiago',
    puntosLevelUp: 0,
    codigoReferido: 'ADMIN',
    genero: 'MASCULINO',
    roles: [ADMIN_ROLE],
  },
    {
    id: 1,
    run: '26823184-6',
    nombre: 'Admin',
    apellidos: 'One Tech',
    email: 'sol.medina@duocuc.cl',
    password: 'admin123',
    fechaNacimiento: '2002-10-11',
    direccion: 'Av. Libertador 123',
    region: 'Metropolitana',
    comuna: 'Santiago',
    puntosLevelUp: 0,
    codigoReferido: 'ADMIN',
    genero: 'FEMENINO',
    roles: [ADMIN_ROLE],
  },
  {
    id: 2,
    run: '87654321-K',
    nombre: 'Carlos',
    apellidos: 'González',
    email: 'carlos@gmail.com',
    password: 'cliente123',
    fechaNacimiento: '1995-05-15',
    direccion: 'Paseo Bulnes 456',
    region: 'Metropolitana',
    comuna: 'Providencia',
    puntosLevelUp: 250,
    codigoReferido: 'GAMER2024',
    genero: 'MASCULINO',
    roles: [CLIENTE_ROLE],
  },
  {
    id: 3,
    run: '11223344-5',
    nombre: 'Ana',
    apellidos: 'Ramírez',
    email: 'ana@example.com',
    password: 'clienta456',
    fechaNacimiento: '1988-10-20',
    direccion: 'Calle Falsa 123',
    region: 'Valparaíso',
    comuna: 'Viña del Mar',
    puntosLevelUp: 50,
    genero: 'FEMENINO',
    roles: [CLIENTE_ROLE],
  }
];