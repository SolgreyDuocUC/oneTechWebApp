import { Product, User, BlogPost, Review } from '../types';

export interface RegionSimple {
    nombre: string;
    comunas: string[];
}

// DATOS DE REGIONES Y COMUNAS

export const regiones: RegionSimple[] = [
    {
        nombre: 'XV de Arica y Parinacota',
        comunas: [
            'Arica', 'Camarones', 'Putre', 'General Lagos'
        ]
    },
    {
        nombre: 'I de Tarapacá',
        comunas: [
            'Alto Hospicio', 'Iquique', 'Huara', 'Camiña', 'Colchane', 'Pica', 'Pozo Almonte'
        ]
    },
    {
        nombre: 'II de Antofagasta',
        comunas: [
            'Tocopilla', 'María Elena', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal'
        ]
    },
    {
        nombre: 'III de Atacama',
        comunas: [
            'Chañaral', 'Diego de Almagro', 'Copiapó', 'Caldera', 'Tierra Amarilla', 'Vallenar', 'Freirina', 'Huasco', 'Alto del Carmen'
        ]
    },
    {
        nombre: 'IV de Coquimbo',
        comunas: [
            'La Serena', 'La Higuera', 'Coquimbo', 'Andacollo', 'Vicuña', 'Paihuano', 'Ovalle', 'Río Hurtado', 'Monte Patria', 'Combarbalá', 'Punitaqui', 'Illapel', 'Salamanca', 'Los Vilos', 'Canela'
        ]
    },
    {
        nombre: 'V de Valparaíso',
        comunas: [
            'La Ligua', 'Petorca', 'Cabildo', 'Zapallar', 'Papudo', 'Los Andes', 'San Esteban', 'Calle Larga', 'Rinconada', 'San Felipe', 'Putaendo', 'Santa María', 'Panquehue', 'Llaillay', 'Catemu', 'Quillota', 'La Cruz', 'Calera', 'Nogales', 'Hijuelas', 'Limache', 'Olmué', 'Valparaíso', 'Viña del Mar', 'Quintero', 'Puchuncaví', 'Quilpué', 'Villa Alemana', 'Casablanca', 'Concón', 'Juan Fernández', 'San Antonio', 'Cartagena', 'El Tabo', 'El Quisco', 'Algarrobo', 'Santo Domingo', 'Isla de Pascua'
        ]
    },
    {
        nombre: 'VI del Libertador General Bernardo O\'Higgins',
        comunas: [
            'Rancagua', 'Graneros', 'Mostazal', 'Codegua', 'Machalí', 'Olivar', 'Requinoa', 'Rengo', 'Malloa', 'Quinta de Tilcoco', 'San Vicente', 'Pichidegua', 'Peumo', 'Coltauco', 'Coinco', 'Doñihue', 'Las Cabras', 'San Fernando', 'Chimbarongo', 'Placilla', 'Nancagua', 'Chépica', 'Santa Cruz', 'Lolol', 'Pumanque', 'Palmilla', 'Peralillo', 'Pichilemu', 'Navidad', 'Litueche', 'La Estrella', 'Marchihue', 'Paredones'
        ]
    },
    {
        nombre: 'VII del Maule',
        comunas: [
            'Curicó', 'Teno', 'Romeral', 'Molina', 'Sagrada Familia', 'Hualañé', 'Licantén', 'Vichuquén', 'Rauco', 'Talca', 'Pelarco', 'Río Claro', 'San Clemente', 'Maule', 'San Rafael', 'Empedrado', 'Pencahue', 'Constitución', 'Curepto', 'Linares', 'Yerbas Buenas', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'Villa Alegre', 'San Javier', 'Cauquenes', 'Pelluhue', 'Chanco'
        ]
    },
    {
        nombre: 'XVI de Ñuble',
        comunas: [
            'Chillán', 'San Carlos', 'Ñiquén', 'San Fabián', 'Coihueco', 'Pinto', 'San Ignacio', 'El Carmen', 'Yungay', 'Pemuco', 'Bulnes', 'Quillón', 'Ránquil', 'Portezuelo', 'Coelemu', 'Treguaco', 'Cobquecura', 'Quirihue', 'Ninhue', 'San Nicolás', 'Chillán Viejo'
        ]
    },
    {
        nombre: 'VIII del Biobío',
        comunas: [
            'Alto Biobío', 'Los Angeles', 'Cabrero', 'Tucapel', 'Antuco', 'Quilleco', 'Santa Bárbara', 'Quilaco', 'Mulchén', 'Negrete', 'Nacimiento', 'Laja', 'San Rosendo', 'Yumbel', 'Concepción', 'Talcahuano', 'Penco', 'Tomé', 'Florida', 'Hualpén', 'Hualqui', 'Santa Juana', 'Lota', 'Coronel', 'San Pedro de la Paz', 'Chiguayante', 'Lebu', 'Arauco', 'Curanilahue', 'Los Alamos', 'Cañete', 'Contulmo', 'Tirua'
        ]
    },
    {
        nombre: 'IX de la Araucanía',
        comunas: [
            'Angol', 'Renaico', 'Collipulli', 'Lonquimay', 'Curacautín', 'Ercilla', 'Victoria', 'Traiguén', 'Lumaco', 'Purén', 'Los Sauces', 'Temuco', 'Lautaro', 'Perquenco', 'Vilcún', 'Cholchol', 'Cunco', 'Melipeuco', 'Curarrehue', 'Pucón', 'Villarrica', 'Freire', 'Pitrufquén', 'Gorbea', 'Loncoche', 'Toltén', 'Teodoro Schmidt', 'Saavedra', 'Carahue', 'Nueva Imperial', 'Galvarino', 'Padre las Casas'
        ]
    },
    {
        nombre: 'XIV de Los Ríos',
        comunas: [
            'Valdivia', 'Mariquina', 'Lanco', 'Máfil', 'Corral', 'Los Lagos', 'Panguipulli', 'Paillaco', 'La Unión', 'Futrono', 'Río Bueno', 'Lago Ranco'
        ]
    },
    {
        nombre: 'X de Los Lagos',
        comunas: [
            'Osorno', 'San Pablo', 'Puyehue', 'Puerto Octay', 'Purranque', 'Río Negro', 'San Juan de la Costa', 'Puerto Montt', 'Puerto Varas', 'Cochamó', 'Calbuco', 'Maullín', 'Los Muermos', 'Fresia', 'Llanquihue', 'Frutillar', 'Castro', 'Ancud', 'Quemchi', 'Dalcahue', 'Curaco de Vélez', 'Quinchao', 'Puqueldón', 'Chonchi', 'Queilén', 'Quellón', 'Chaitén', 'Hualaihué', 'Futaleufú', 'Palena'
        ]
    },
    {
        nombre: 'XI Aysén del General Carlos Ibáñez del Campo',
        comunas: [
            'Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Chile Chico', 'Río Ibánez', 'Cochrane', 'O\'Higgins', 'Tortel'
        ]
    },
    {
        nombre: 'XII de Magallanes y Antártica Chilena',
        comunas: [
            'Natales', 'Torres del Paine', 'Punta Arenas', 'Río Verde', 'Laguna Blanca', 'San Gregorio', 'Porvenir', 'Primavera', 'Timaukel', 'Cabo de Hornos', 'Antártica'
        ]
    },
    {
        nombre: 'Metropolitana de Santiago',
        comunas: [
            'Santiago', 'Independencia', 'Conchalí', 'Huechuraba', 'Recoleta', 'Providencia', 'Vitacura', 'Lo Barnechea', 'Las Condes', 'Ñuñoa', 'La Reina', 'Macul', 'Peñalolén', 'La Florida', 'San Joaquín', 'La Granja', 'La Pintana', 'San Ramón', 'San Miguel', 'La Cisterna', 'El Bosque', 'Pedro Aguirre Cerda', 'Lo Espejo', 'Estación Central', 'Cerrillos', 'Maipú', 'Quinta Normal', 'Lo Prado', 'Pudahuel', 'Cerro Navia', 'Renca', 'Quilicura', 'Colina', 'Lampa', 'Tiltil', 'Puente Alto', 'San José de Maipo', 'Pirque', 'San Bernardo', 'Buin', 'Paine', 'Calera de Tango', 'Melipilla', 'María Pinto', 'Curacaví', 'Alhué', 'San Pedro', 'Talagante', 'Peñaflor', 'Isla de Maipo', 'El Monte', 'Padre Hurtado'
        ]
    }
];

// DATOS DE PRODUCTOS, USUARIOS, BLOG Y REVIEWS 

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
        imagen: 'https://latincomputer.cl/wp-content/uploads/2024/06/teclado60b.jpeg',
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
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_814946-MLA95836949691_102025-F.webp',
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
        imagen: 'https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/prd-cl/product-medias/f63f34bb-7f6d-4f7a-af9e-ba7cac28b84f/MKYT11EO6W/MKYT11EO6W-1/1758056187064-MKYT11EO6W-1-2.jpg',
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
        imagen: 'https://cdnx.jumpseller.com/notebook-store/image/51462177/resize/540/540?1722975582',
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
        imagen: 'https://etchile.net/wp-content/uploads/2024/09/pc_gamer_4060TI-R55500-epsilon_01.jpg',
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
        imagen: 'https://cdn.shopify.com/s/files/1/0631/9590/6271/files/Rapoo_VT3S_image.jpg?v=1687930783',
        featured: false
    },
    {
        id: '8',
        codigo: 'KIT-STREAM-008',
        nombre: 'Kit Streaming Completo',
        descripcion: 'Kit para streamers: micrófono condensador, brazo articulado, luz LED ring, cámara web 1080p.',
        precio: 29990,
        stock: 3,
        stockCritico: 1,
        categoria: 'Audio',
        imagen: 'https://dojiw2m9tvv09.cloudfront.net/96688/product/X_d_nq_np_2x_891767-mlc43878147131_102020-f7493.png?18&time=1761178899',
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
        imagen: 'https://images.unsplash.com/photo-1653132491302-fbee23efb785?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMGNvbXB1dGVyfGVufDF8fHx8MTc2MDYzODkzMnww&ixlib=rb-4.1.0&q=80&w=1080',
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