export type UserRole = 'ADMIN' | 'CLIENTE' | 'VENDEDOR';

export interface Role {
  id: number;
  name: UserRole;
}

export type Genero = 'FEMENINO' | 'MASCULINO' | 'SIN_ESPECIFICAR';

export interface User {
  id: number;
  run: string;
  nombre: string;
  apellidos: string;
  email: string;
  password?: string; // opcional al recibir datos
  fechaNacimiento: string;
  direccion: string;
  region: string;
  comuna: string;
  puntosLevelUp: number;
  codigoReferido?: string;
  genero: Genero;
  roles: Role[];
}


export interface Product {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockCritico?: number;
  categoria: string;
  imagen: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  cantidad: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  calificacion: number;
  comentario: string;
  fecha: string;
}

export interface BlogPost {
  id: string;
  titulo: string;
  extracto: string;
  contenido: string;
  autor: string;
  fecha: string;
  imagen: string;
  categoria: string;
}

export interface Region {
  nombre: string;
  comunas: string[];
}
