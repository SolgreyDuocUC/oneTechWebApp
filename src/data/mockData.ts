import { Product, User, BlogPost, Review, Region } from '../types';

/**
 * Datos simulados para el prototipo One Tech
 * Incluye regiones, productos, usuarios, posts de blog y reseñas
 */

// Lista de regiones y comunas de Chile
export const regiones: Region[] = [
  {
    nombre: 'Metropolitana',
    comunas: ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'Maipú', 'La Florida', 'Pudahuel']
  },
  {
    nombre: 'Valparaíso',
    comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Casablanca']
  },
  {
    nombre: 'Biobío',
    comunas: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chillán', 'Coronel']
  },
  {
    nombre: 'Araucanía',
    comunas: ['Temuco', 'Villarrica', 'Pucón', 'Angol']
  }
];

export const productos: Product[] = [
  {
    id: '1',
    codigo: 'KB-RGB-001',
    nombre: 'Teclado Mecánico RGB Gamer',
    descripcion: 'Teclado mecánico con switches azules, iluminación RGB personalizable y reposamanos extraíble. Perfecto para gaming y productividad.',
    precio: 89990,
    stock: 15,
    stockCritico: 5,
    categoria: 'Periféricos',
    imagen: 'https://m.media-amazon.com/images/I/71h45LTINwL._AC_SL1500_.jpg',
    featured: true
  },
  {
    id: '2',
    codigo: 'HS-7.1-002',
    nombre: 'Audífonos Gamer 7.1 Surround',
    descripcion: 'Audífonos con sonido envolvente 7.1, micrófono retráctil con cancelación de ruido e iluminación RGB.',
    precio: 69990,
    stock: 23,
    stockCritico: 8,
    categoria: 'Audio',
    imagen: 'https://media.spdigital.cl/thumbnails/products/1756390473351-arcus1_d4a0bf48_e77646b7_thumbnail_512.jpg',
    featured: true
  },
  {
    id: '3',
    codigo: 'CH-PRO-003',
    nombre: 'Silla Gamer Pro Ergonómica',
    descripcion: 'Silla ergonómica con soporte lumbar ajustable, reposabrazos 4D y reclinación hasta 180°. Ideal para largas sesiones.',
    precio: 249990,
    stock: 8,
    stockCritico: 3,
    categoria: 'Sillas',
    imagen: 'https://m.media-amazon.com/images/I/813lzbP5UoL._AC_SL1500_.jpg',
    featured: false
  },
  {
    id: '4',
    codigo: 'MON-144-004',
    nombre: 'Monitor Gaming 144Hz 27"',
    descripcion: 'Monitor curvo 27 pulgadas, tasa de refresco 144Hz, tiempo de respuesta 1ms, resolución QHD 2K.',
    precio: 349990,
    stock: 12,
    stockCritico: 4,
    categoria: 'Monitores',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_874805-MLA96135207215_102025-F.webp',
    featured: true
  },
  {
    id: '5',
    codigo: 'PS5-CTRL-005',
    nombre: 'Control DualSense PS5',
    descripcion: 'Control inalámbrico PlayStation 5 con retroalimentación háptica y gatillos adaptativos.',
    precio: 59990,
    stock: 30,
    stockCritico: 10,
    categoria: 'Consolas',
    imagen: 'https://images.unsplash.com/photo-1687713143171-b1ffd531263d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5c3RhdGlvbiUyMGNvbnNvbGUlMjBjb250cm9sbGVyfGVufDF8fHx8MTc2MDYzODkzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '6',
    codigo: 'PC-RTX-006',
    nombre: 'PC Gamer RTX 4060',
    descripcion: 'Computador gamer completo: Intel i7 13va gen, RTX 4060 8GB, 16GB RAM, SSD 1TB NVMe, RGB.',
    precio: 1299990,
    stock: 5,
    stockCritico: 2,
    categoria: 'Computadores',
    imagen: 'https://m.media-amazon.com/images/I/71ENeVg0MuL._AC_SX466_.jpg',
    featured: true
  },
  {
    id: '7',
    codigo: 'MOU-RGB-007',
    nombre: 'Mouse Gaming RGB 16000 DPI',
    descripcion: 'Mouse óptico con sensor de alta precisión, 7 botones programables y peso ajustable.',
    precio: 39990,
    stock: 42,
    stockCritico: 15,
    categoria: 'Periféricos',
    imagen: 'https://rimage.ripley.cl/home.ripley/Attachment/MKP/1299/MPM00021978732/Image-1.jpg',
    featured: false
  },
  {
    id: '8',
    codigo: 'KIT-STREAM-008',
    nombre: 'Kit Streaming Completo',
    descripcion: 'Kit para streamers: micrófono condensador, brazo articulado, luz LED ring, cámara web 1080p.',
    precio: 0,
    stock: 3,
    stockCritico: 1,
    categoria: 'Audio',
    imagen: 'https://m.media-amazon.com/images/I/61sa7TrZZzL._AC_SL1280_.jpg',
    featured: false
  }
];

export const usuarios: User[] = [
  {
    id: '1',
    run: '12345678',
    nombre: 'Admin',
    apellidos: 'One Tech',
    email: 'admin@duoc.cl',
    password: 'admin123',
    fechaNacimiento: '1990-01-01',
    direccion: 'Av. Libertador 123',
    region: 'Metropolitana',
    comuna: 'Santiago',
    rol: 'admin',
    puntosLevelUp: 0,
    codigoReferido: 'ADMIN2024'
  },
  {
    id: '2',
    run: '87654321',
    nombre: 'Carlos',
    apellidos: 'González',
    email: 'carlos@gmail.com',
    password: 'cliente123',
    fechaNacimiento: '1995-05-15',
    direccion: 'Paseo Bulnes 456',
    region: 'Metropolitana',
    comuna: 'Providencia',
    rol: 'cliente',
    puntosLevelUp: 250,
    codigoReferido: 'GAMER2024'
  }
];


export const blogPosts: BlogPost[] = [
  {
    id: '1',
    titulo: 'Las mejores configuraciones de PC para gaming en 2025',
    extracto: 'Descubre las especificaciones ideales para armar tu PC gamer según tu presupuesto.',
    contenido: 'En este artículo exploramos las mejores configuraciones de PC gaming para diferentes rangos de precio...',
    autor: 'One Tech Team',
    fecha: '2025-01-15',
    imagen: 'https://images.pexels.com/photos/7046976/pexels-photo-7046976.jpeg?_gl=1*161grab*_ga*MTU5ODgyMTE4OC4xNzYxMzYzNTM4*_ga_8JE65Q40S6*czE3NjEzNjM1MzgkbzEkZzEkdDE3NjEzNjM1NTAkajQ4JGwwJGgw',
    categoria: 'Hardware'
  },
  {
    id: '2',
    titulo: 'Guía: Cómo elegir el monitor perfecto para gaming',
    extracto: 'Tasa de refresco, tiempo de respuesta y resolución. Todo lo que necesitas saber.',
    contenido: 'Elegir el monitor adecuado puede marcar la diferencia en tu experiencia gaming...',
    autor: 'One Tech Team',
    fecha: '2025-01-10',
    imagen: 'https://images.unsplash.com/photo-1758410473607-e78a23fd6e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yJTIwc2NyZWVufGVufDF8fHx8MTc2MDYzODkzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    categoria: 'Periféricos'
  },
  {
    id: '3',
    titulo: 'Top 5 accesorios indispensables para gamers',
    extracto: 'Los accesorios que todo gamer necesita para mejorar su setup.',
    contenido: 'Más allá del PC o consola, estos accesorios elevarán tu experiencia de juego...',
    autor: 'One Tech Team',
    fecha: '2025-01-05',
    imagen: 'https://images.unsplash.com/photo-1629429408719-a64b3ae484e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGtleWJvYXJkJTIwbW91c2V8ZW58MXx8fHwxNzYwNjM4OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    categoria: 'Accesorios'
  }
];

// Reseñas de productos realizadas por usuarios
export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '2',
    userName: 'Carlos González',
    calificacion: 5,
    comentario: 'Excelente teclado, los switches azules suenan increíbles y la iluminación RGB es personalizable al detalle.',
    fecha: '2025-01-12'
  },
  {
    id: '2',
    productId: '2',
    userId: '2',
    userName: 'Carlos González',
    calificacion: 4,
    comentario: 'Muy buenos audífonos, el sonido 7.1 es impresionante. Solo el micrófono podría ser un poco mejor.',
    fecha: '2025-01-10'
  },
  {
    id: '3',
    productId: '4',
    userId: '2',
    userName: 'Carlos González',
    calificacion: 5,
    comentario: 'El mejor monitor que he tenido. Los 144Hz hacen una diferencia enorme en juegos competitivos.',
    fecha: '2025-01-08'
  }
];
