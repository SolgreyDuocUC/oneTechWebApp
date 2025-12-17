import type { Product } from '../types';

export const productos: Product[] = [
  {
    id: 1,
    slug: 'KB-RGB-001',
    name: 'Teclado Mecánico RGB Gamer',
    description: 'Teclado mecánico con switches azules, iluminación RGB personalizable y reposamanos extraíble. Perfecto para gaming y productividad.',
    price: 89990,
    stock: 15,
    stockCritico: 5,
    category: 'Periféricos',
    imagen: 'https://m.media-amazon.com/images/I/71h45LTINwL._AC_SL1500_.jpg',
    featured: true
  },
  {
    id: 2,
    slug: 'HS-7.1-002',
    name: 'Audífonos Gamer 7.1 Surround',
    description: 'Audífonos con sonido envolvente 7.1, micrófono retráctil con cancelación de ruido e iluminación RGB.',
    price: 69990,
    stock: 23,
    stockCritico: 8,
    category: 'Audio',
    imagen: 'https://media.spdigital.cl/thumbnails/products/1756390473351-arcus1_d4a0bf48_e77646b7_thumbnail_512.jpg',
    featured: true
  },
  {
    id: 3,
    slug: 'CH-PRO-003',
    name: 'Silla Gamer Pro Ergonómica',
    description: 'Silla ergonómica con soporte lumbar ajustable, reposabrazos 4D y reclinación hasta 180°. Ideal para largas sesiones.',
    price: 249990,
    stock: 8,
    stockCritico: 3,
    category: 'Sillas',
    imagen: 'https://m.media-amazon.com/images/I/813lzbP5UoL._AC_SL1500_.jpg',
    featured: false
  },
  {
    id: 4,
    slug: 'MON-144-004',
    name: 'Monitor Gaming 144Hz 27"',
    description: 'Monitor curvo 27 pulgadas, tasa de refresco 144Hz, tiempo de respuesta 1ms, resolución QHD 2K.',
    price: 349990,
    stock: 12,
    stockCritico: 4,
    category: 'Monitores',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_874805-MLA96135207215_102025-F.webp',
    featured: true
  },
  {
    id: 5,
    slug: 'PS5-CTRL-005',
    name: 'Control DualSense PS5',
    description: 'Control inalámbrico PlayStation 5 con retroalimentación háptica y gatillos adaptativos.',
    price: 59990,
    stock: 30,
    stockCritico: 10,
    category: 'Consolas',
    imagen: 'https://images.unsplash.com/photo-1687713143171-b1ffd531263d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5c3RhdGlvbiUyMGNvbnNvbGUlMjBjb250cm9sbGVyfGVufDF8fHx8MTc2MDYzODkzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: 6,
    slug: 'PC-RTX-006',
    name: 'PC Gamer RTX 4060',
    description: 'Computador gamer completo: Intel i7 13va gen, RTX 4060 8GB, 16GB RAM, SSD 1TB NVMe, RGB.',
    price: 1299990,
    stock: 5,
    stockCritico: 2,
    category: 'Computadores',
    imagen: 'https://m.media-amazon.com/images/I/71ENeVg0MuL._AC_SX466_.jpg',
    featured: true
  },
  {
    id: 7,
    slug: 'MOU-RGB-007',
    name: 'Mouse Gaming RGB 16000 DPI',
    description: 'Mouse óptico con sensor de alta precisión, 7 botones programables y peso ajustable.',
    price: 39990,
    stock: 42,
    stockCritico: 15,
    category: 'Periféricos',
    imagen: 'https://rimage.ripley.cl/home.ripley/Attachment/MKP/1299/MPM00021978732/Image-1.jpg',
    featured: false
  },
  {
    id: 8,
    slug: 'KIT-STREAM-008',
    name: 'Kit Streaming Completo',
    description: 'Kit para streamers: micrófono condensador, brazo articulado, luz LED ring, cámara web 1080p.',
    price: 0,
    stock: 3,
    stockCritico: 1,
    category: 'Audio',
    imagen: 'https://m.media-amazon.com/images/I/61sa7TrZZzL._AC_SL1280_.jpg',
    featured: false
  }
];
