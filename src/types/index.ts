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

export interface Product {
  id: number;

  name: string;
  slug: string;
  description: string;

  price: number;
  stock: number;
  stockCritico: number;

  featured?: boolean | null;

  createdAt?: string;
  updatedAt?: string;
}


export interface CartItem {
  productId: number;
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
