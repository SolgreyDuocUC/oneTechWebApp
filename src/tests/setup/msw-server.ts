import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";


let db = [
  { id: "1", nombre: "Catan", precio: 29990, stock: 10, categoria: "Juegos" },
  { id: "2", nombre: "Azul",  precio: 25990, stock: 5,  categoria: "Juegos" },
];


type Post = { id: string; title: string; excerpt: string; content: string; tags?: string[] };

let postsDb: Post[] = [
  { id: "1", title: "Primer post",  excerpt: "Intro…",       content: "Contenido largo 1", tags: ["react"] },
  { id: "2", title: "Segundo post", excerpt: "Más cosas…",   content: "Contenido largo 2", tags: ["vite"] },
  { id: "3", title: "Vitest tips",  excerpt: "Trucos…",      content: "Contenido largo 3", tags: ["vitest","rtl"] },
];
// ---- REGISTRO / UBICACIÓN ----
type Region = { id: string; nombre: string };
type Comuna = { id: string; regionId: string; nombre: string };

export const handlers = [
 
  http.get("/api/products", async () => {
    return HttpResponse.json(db);
  }),

  http.post("/api/products", async ({ request }) => {
    const body = (await request.json()) as any;
    const nuevo = { id: String(Date.now()), ...body };
    db = [nuevo, ...db];
    return HttpResponse.json(nuevo, { status: 201 });
  }),

  http.put("/api/products/:id", async ({ params, request }) => {
    const { id } = params as any;
    const patch = (await request.json()) as any;
    db = db.map((p) => (p.id === id ? { ...p, ...patch } : p));
    const actualizado = db.find((p) => p.id === id);
    return HttpResponse.json(actualizado);
  }),

  http.delete("/api/products/:id", async ({ params }) => {
    const { id } = params as any;
    db = db.filter((p) => p.id !== id);
    return HttpResponse.json({ ok: true });
  }),


  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const q = (url.searchParams.get("q") ?? "").toLowerCase();
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "2");

    let data = postsDb.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    );

    const total = data.length;
    const start = (page - 1) * pageSize;
    data = data.slice(start, start + pageSize);

    return HttpResponse.json({ data, total, page, pageSize });
  }),

  http.get("/api/posts/:id", ({ params }) => {
    const post = postsDb.find((p) => p.id === String(params.id));
    if (!post) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(post);
  }),
  
];
const regions: Region[] = [
  { id: "13", nombre: "Región Metropolitana" },
  { id: "05", nombre: "Valparaíso" },
];

const communes: Comuna[] = [
  { id: "13101", regionId: "13", nombre: "Santiago" },
  { id: "13114", regionId: "13", nombre: "La Florida" },
  { id: "5101",  regionId: "05", nombre: "Valparaíso" },
];

// GET regiones
handlers.push(
  http.get("/api/regions", () => HttpResponse.json(regions))
);

// GET comunas por región
handlers.push(
  http.get("/api/regions/:id/communes", ({ params }) => {
    const list = communes.filter(c => c.regionId === String(params.id));
    return HttpResponse.json(list);
  })
);

// GET check email
handlers.push(
  http.get("/api/users/check-email", ({ request }) => {
    const url = new URL(request.url);
    const email = (url.searchParams.get("email") ?? "").toLowerCase();
    if (email === "existe@dominio.com") {
      return HttpResponse.json({ exists: true });
    }
    return HttpResponse.json({ exists: false });
  })
);

// POST registro
handlers.push(
  http.post("/api/register", async ({ request }) => {
    const body = await request.json();
    // puedes validar mínimamente aquí si quieres
    return HttpResponse.json({ ok: true, userId: "u_" + Date.now() }, { status: 201 });
  })
);
handlers.push(
  http.post("/api/checkout", async ({ request }) => {
    
    type CheckoutItem = { id: string; nombre: string; precio: number; qty: number };
    type CheckoutBody = {
      items: CheckoutItem[];
      customer: { name: string; email: string; address: string };
    };
    
    const body = (await request.json().catch(() => null)) as CheckoutBody | null;

    if (!body || !Array.isArray(body.items) || body.items.length === 0) {
      return HttpResponse.json({ ok: false, message: "Carrito vacío" }, { status: 400 });
    }
    const c = body.customer;
    if (!c?.name || !c?.email || !c?.address) {
      return HttpResponse.json({ ok: false, message: "Datos incompletos" }, { status: 422 });
    }

    const total = body.items.reduce((acc, it) => acc + Number(it.precio) * Number(it.qty), 0);
    return HttpResponse.json(
      { ok: true, orderId: `ord_${Date.now()}`, total },
      { status: 201 }
    );
  })
);
 //REVIEWS por producto
type Review = { id: string; productId: string; user: string; rating: number; comment: string; createdAt: string };

let reviewsDb: Review[] = [
  { id: "r1", productId: "1", user: "Ana", rating: 5, comment: "Excelente",  createdAt: new Date().toISOString() },
  { id: "r2", productId: "1", user: "Luis", rating: 4, comment: "Muy bueno", createdAt: new Date().toISOString() },
];

handlers.push(
  
  http.get("/api/products/:id/reviews", ({ params }) => {
    const data = reviewsDb.filter(r => r.productId === String(params.id));
    return HttpResponse.json(data);
  }),

  // crear
  http.post("/api/products/:id/reviews", async ({ params, request }) => {
    const body = await request.json() as Partial<Review>;
    if (!body.user || !body.comment || typeof body.rating !== "number" || body.rating < 1 || body.rating > 5) {
      return HttpResponse.json({ ok: false, message: "Datos inválidos" }, { status: 422 });
    }
    const newR: Review = {
      id: "r" + Date.now(),
      productId: String(params.id),
      user: body.user!,
      rating: body.rating!,
      comment: body.comment!,
      createdAt: new Date().toISOString()
    };
    reviewsDb = [newR, ...reviewsDb];
    return HttpResponse.json(newR, { status: 201 });
  })
);

//resetear entre tests
export function resetReviews() {
  reviewsDb = [
    { id: "r1", productId: "1", user: "Ana", rating: 5, comment: "Excelente",  createdAt: new Date().toISOString() },
    { id: "r2", productId: "1", user: "Luis", rating: 4, comment: "Muy bueno", createdAt: new Date().toISOString() },
  ];
}

export const server = setupServer(...handlers);
