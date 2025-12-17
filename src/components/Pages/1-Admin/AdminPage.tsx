import { useState, useEffect, useMemo } from 'react';
import {
  Package, Users, ShoppingCart, TrendingUp, Plus, Edit, Trash2, Loader2, UserPlus,
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useAuth } from '../../../contexts/AuthContext';
import type { Product, ProductCreateDTO, ProductUpdateDTO } from '../../../remote/DTO/ProductDTO';
import type { UserDTO, UserCreateDTO } from '../../../remote/DTO/UserDTO';
import {
  formatPrice, validatePrice, validateStock, validateRUN, formatRUN, validateAge,
} from '../../../utils/validations';
import { toast } from 'sonner';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../remote/service/Products/ProductService';
import { UserService } from '../../../remote/service/User/UserService';
import { regiones } from '../../../data/mockRegiones';

export type Genero = 'FEMENINO' | 'MASCULINO' | 'SIN_ESPECIFICAR';
const validateEmail = (email: string) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/.test(email);

interface AdminPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export const AdminPage = ({ onNavigate }: AdminPageProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'users'>('dashboard');
  const [productos, setProductos] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Estados para productos
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<ProductCreateDTO>>({
    slug: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    stockCritico: 0,
    category: 'Periféricos',
    imagen: '',
    featured: false,
  });
  // Estados para usuarios
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState<Partial<UserCreateDTO>>({
    run: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    direccion: '',
    region: '',
    comuna: '',
    genero: 'SIN_ESPECIFICAR',
  });
  const [newUserErrors, setNewUserErrors] = useState<Record<string, string>>({});
  const comunasDisponibles = useMemo(
    () => regiones.find((r) => r.nombre === newUser.region)?.comunas || [],
    [newUser.region],
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [productsData, usersData] = await Promise.all([
        getProducts(),
        UserService.getUsers(),
      ]);
      setProductos(productsData);
      setUsers(usersData);
    } catch (error) {
      toast.error('Error al cargar los datos del panel');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user?.roles?.includes('ADMIN')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 mb-4">Acceso Denegado</h2>
          <p className="text-gray-400 mb-6">No tienes permisos para acceder al panel de administración</p>
          <Button onClick={() => onNavigate('home')} className="bg-[var(--neon-green)] text-black">
            Volver al Inicio
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveProduct = async () => {
    if (!newProduct.slug || !newProduct.name || !newProduct.description) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }
    if ((newProduct.price || 0) <= 0) {
      toast.error('El precio debe ser un número mayor que 0');
      return;
    }
    if (!validateStock(newProduct.stock || 0)) {
      toast.error('El stock debe ser un número entero mayor o igual a 0');
      return;
    }
    setIsLoading(true);
    try {
      if (editingProduct) {
        const payload: ProductUpdateDTO = {
          ...newProduct,
        };
        await updateProduct(editingProduct.id, payload);
        toast.success('Producto actualizado correctamente');
      } else {
        const payload: ProductCreateDTO = {
          name: newProduct.name,
          slug: newProduct.slug,
          description: newProduct.description,
          price: newProduct.price || 0,
          stock: newProduct.stock || 0,
          stockCritico: newProduct.stockCritico || 0,
          category: newProduct.category || 'Periféricos',
          imagen: newProduct.imagen || '',
          featured: newProduct.featured || false,
        };
        await createProduct(payload);
        toast.success('Producto creado correctamente');
      }
      await fetchData();
      setIsCreating(false);
      setEditingProduct(null);
      setNewProduct({
        slug: '', name: '', description: '', price: 0, stock: 0,
        stockCritico: 0, category: 'Periféricos', imagen: '', featured: false,
      });
    } catch (error) {
      toast.error(`Error al ${editingProduct ? 'actualizar' : 'crear'} el producto`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setIsLoading(true);
      try {
        await deleteProduct(id);
        toast.success('Producto eliminado correctamente');
        await fetchData();
      } catch (error) {
        toast.error('Error al eliminar el producto');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCreateSeller = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const runClean = (newUser.run || '').replace(/[^0-9kK]/g, '');

    if (!validateRUN(runClean)) newErrors.run = 'RUN inválido';
    if (!newUser.nombre) newErrors.nombre = 'Nombre obligatorio';
    if (!newUser.apellidos) newErrors.apellidos = 'Apellidos obligatorios';
    if (!newUser.email || !validateEmail(newUser.email)) newErrors.email = 'Correo inválido';
    if (!newUser.password || newUser.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (!newUser.fechaNacimiento || !validateAge(newUser.fechaNacimiento)) newErrors.fechaNacimiento = 'Debe ser mayor de edad';
    if (!newUser.region) newErrors.region = 'Selecciona una región';
    if (!newUser.comuna) newErrors.comuna = 'Selecciona una comuna';

    setNewUserErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Por favor, corrige los errores en el formulario.');
      return;
    }

    setIsLoading(true);
    try {
      const payload: UserCreateDTO = {
        run: formatRUN(newUser.run!),
        nombre: newUser.nombre!,
        apellidos: newUser.apellidos!,
        email: newUser.email!,
        password: newUser.password!,
        fechaNacimiento: newUser.fechaNacimiento!,
        direccion: newUser.direccion!,
        region: newUser.region!,
        comuna: newUser.comuna!,
        genero: newUser.genero || 'SIN_ESPECIFICAR',
        roleIds: [2], // Rol de Vendedor
      };

      await UserService.register(payload);
      toast.success('Vendedor creado correctamente');
      await fetchData();
      setIsCreatingUser(false);
      setNewUser({ run: '', nombre: '', apellidos: '', email: '', password: '', fechaNacimiento: '', direccion: '', region: '', comuna: '', genero: 'SIN_ESPECIFICAR' });
    } catch (error) {
      toast.error('Error al crear el vendedor. El RUN o email pueden ya estar en uso.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
      try {
        await UserService.deleteUser(id);
        toast.success('Usuario eliminado correctamente');
        await fetchData();
      } catch (error) {
        toast.error('Error al eliminar el usuario.');
      }
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      featured: product.featured ?? false,
    });
    setIsCreating(true);
  };

  if (isLoading && productos.length === 0 && users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-[var(--neon-green)] animate-spin" />
        <span className="ml-4 text-xl text-gray-300">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-[var(--neon-green)]">Panel de Administración</h1>
          <p className="text-gray-400">Gestiona productos y usuarios de One Tech</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 transition-colors ${
              activeTab === 'dashboard'
                ? 'text-[var(--neon-green)] border-b-2 border-[var(--neon-green)]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 transition-colors ${
              activeTab === 'products'
                ? 'text-[var(--neon-green)] border-b-2 border-[var(--neon-green)]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 transition-colors ${
              activeTab === 'users'
                ? 'text-[var(--neon-green)] border-b-2 border-[var(--neon-green)]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Usuarios
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-8 h-8 text-[var(--neon-green)]" />
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl text-white mb-1">{productos.length}</div>
                <div className="text-gray-400">Total Productos</div>
              </div>

              <div className="bg-[#111] border border-[var(--neon-purple)] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <ShoppingCart className="w-8 h-8 text-[var(--neon-purple)]" />
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl text-white mb-1">156</div>
                <div className="text-gray-400">Ventas (Simulado)</div>
              </div>

              <div className="bg-[#111] border border-[var(--neon-blue)] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-[var(--neon-blue)]" />
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl text-white mb-1">{users.length}</div>
                <div className="text-gray-400">Total Usuarios</div>
              </div>

              <div className="bg-[#111] border border-yellow-500 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-8 h-8 text-yellow-500" />
                  <span className="text-xs text-yellow-500">¡Alerta!</span>
                </div>
                <div className="text-3xl text-white mb-1">
                  {productos.filter((p) => p.stockCritico && p.stock <= p.stockCritico).length}
                </div>
                <div className="text-gray-400">Stock Crítico</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-[var(--neon-green)]">Gestión de Productos</h2>
              <Button
                onClick={() => {
                  setIsCreating(true);
                  setEditingProduct(null);
                  setNewProduct({
                    slug: '',
                    name: '',
                    description: '',
                    price: 0,
                    stock: 0,
                    stockCritico: 0,
                    category: 'Periféricos',
                    imagen: '',
                    featured: false,
                  });
                }}
                className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nuevo Producto
              </Button>
            </div>

            {isCreating && (
              <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-6 mb-6">
                <h3 className="text-xl text-white mb-4">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 mb-2 block">Slug <span className="text-red-500">*</span></label>
                    <Input
                      value={newProduct.slug}
                      onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      placeholder="teclado-rgb"
                      className="bg-[#1a1a1a] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">Solo minúsculas, números y guiones (ej: teclado-gamer-rgb).</p>
                  </div>

                  <div>
                    <label className="text-gray-300 mb-2 block">Nombre <span className="text-red-500">*</span></label>
                    <Input
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Teclado Mecánico RGB"
                      className="bg-[#1a1a1a] border-gray-700 text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-gray-300 mb-2 block">Descripción <span className="text-red-500">*</span></label>
                    <Textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Descripción del producto..."
                      className="bg-[#1a1a1a] border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 mb-2 block">Precio <span className="text-red-500">*</span></label>
                    <Input
                      type="number"
                      min="0"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                      className="bg-[#1a1a1a] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">El precio no puede ser 0.</p>
                  </div>

                  <div>
                    <label className="text-gray-300 mb-2 block">Stock <span className="text-red-500">*</span></label>
                    <Input
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                      className="bg-[#1a1a1a] border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 mb-2 block">Stock Crítico</label>
                    <Input
                      type="number"
                      min="0"
                      value={newProduct.stockCritico}
                      onChange={(e) => setNewProduct({ ...newProduct, stockCritico: parseInt(e.target.value) || 0 })}
                      className="bg-[#1a1a1a] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">Nivel de stock para recibir alertas de inventario bajo.</p>
                  </div>

                  <div>
                    <label className="text-gray-300 mb-2 block">Categoría</label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value: string) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Periféricos">Periféricos</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                        <SelectItem value="Sillas">Sillas</SelectItem>
                        <SelectItem value="Monitores">Monitores</SelectItem>
                        <SelectItem value="Consolas">Consolas</SelectItem>
                        <SelectItem value="Computadores">Computadores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-gray-300 mb-2 block">URL de Imagen</label>
                    <Input
                      value={newProduct.imagen}
                      onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })}
                      placeholder="https://..."
                      className="bg-[#1a1a1a] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">Pega la URL completa de una imagen alojada en la web.</p>
                  </div>

                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newProduct.featured ?? false}
                      onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="featured" className="text-gray-300">Producto destacado</label>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={handleSaveProduct}
                    className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
                  >
                    {editingProduct ? 'Actualizar' : 'Crear'} Producto
                  </Button>
                  <Button
                    onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                    variant="outline"
                    className="border-gray-700 text-gray-300"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            <div className="relative space-y-4">
              {productos.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#111] border border-gray-800 rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="w-20 h-20 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                    {product.imagen ? (
                      <img src={product.imagen} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Package className="w-8 h-8 text-gray-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white mb-1">{product.name}</h3>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>ID: {product.id}</span>
                      <span>Stock: {product.stock}</span>
                      <span>Precio: {formatPrice(product.price)}</span>
                      <span>{product.category}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => startEdit(product)}
                      size="sm"
                      variant="outline"
                      className="border-[var(--neon-green)] text-[var(--neon-green)]"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteProduct(product.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-[var(--neon-green)]">Gestión de Usuarios</h2>
              <Button
                onClick={() => setIsCreatingUser(!isCreatingUser)}
                className="bg-[var(--neon-blue)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {isCreatingUser ? 'Cancelar' : 'Nuevo Vendedor'}
              </Button>
            </div>

            {isCreatingUser && (
              <div className="bg-[#1a1a1a] border border-[var(--neon-blue)] rounded-lg p-6 mb-8">
                <h3 className="text-xl text-white mb-4">Crear Nuevo Vendedor</h3>
                <form onSubmit={handleCreateSeller} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* RUN, Nombre, Apellidos */}
                    <div>
                      <label className="text-gray-300 mb-2 block">RUN *</label>
                      <Input value={newUser.run} onChange={(e) => setNewUser({ ...newUser, run: e.target.value })} onBlur={(e) => setNewUser({ ...newUser, run: formatRUN(e.target.value) })} className="bg-[#111] border-gray-700" />
                      {newUserErrors.run && <p className="text-red-500 text-sm mt-1">{newUserErrors.run}</p>}
                    </div>
                    <div>
                      <label className="text-gray-300 mb-2 block">Nombre *</label>
                      <Input value={newUser.nombre} onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })} className="bg-[#111] border-gray-700" />
                      {newUserErrors.nombre && <p className="text-red-500 text-sm mt-1">{newUserErrors.nombre}</p>}
                    </div>
                    <div>
                      <label className="text-gray-300 mb-2 block">Apellidos *</label>
                      <Input value={newUser.apellidos} onChange={(e) => setNewUser({ ...newUser, apellidos: e.target.value })} className="bg-[#111] border-gray-700" />
                      {newUserErrors.apellidos && <p className="text-red-500 text-sm mt-1">{newUserErrors.apellidos}</p>}
                    </div>
                    {/* Email, Contraseña, Fecha Nacimiento */}
                    <div>
                      <label className="text-gray-300 mb-2 block">Email *</label>
                      <Input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="bg-[#111] border-gray-700" />
                      {newUserErrors.email && <p className="text-red-500 text-sm mt-1">{newUserErrors.email}</p>}
                    </div>
                    <div>
                      <label className="text-gray-300 mb-2 block">Contraseña *</label>
                      <Input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="bg-[#111] border-gray-700" />
                      {newUserErrors.password && <p className="text-red-500 text-sm mt-1">{newUserErrors.password}</p>}
                    </div>
                    <div>
                      <label className="text-gray-300 mb-2 block">Fecha Nacimiento *</label>
                      <Input type="date" value={newUser.fechaNacimiento} onChange={(e) => setNewUser({ ...newUser, fechaNacimiento: e.target.value })} className="bg-[#111] border-gray-700" />
                      {newUserErrors.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{newUserErrors.fechaNacimiento}</p>}
                    </div>
                    {/* Dirección, Región, Comuna */}
                    <div>
                      <label className="text-gray-300 mb-2 block">Dirección *</label>
                      <Input value={newUser.direccion} onChange={(e) => setNewUser({ ...newUser, direccion: e.target.value })} className="bg-[#111] border-gray-700" />
                    </div>
                    <div>
                      <label className="text-gray-300 mb-2 block">Región *</label>
                      <Select value={newUser.region} onValueChange={(value) => setNewUser({ ...newUser, region: value, comuna: '' })}>
                        <SelectTrigger className="bg-[#111] border-gray-700"><SelectValue placeholder="Selecciona región" /></SelectTrigger>
                        <SelectContent>
                          {regiones.map((r) => <SelectItem key={r.nombre} value={r.nombre}>{r.nombre}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {newUserErrors.region && <p className="text-red-500 text-sm mt-1">{newUserErrors.region}</p>}
                    </div>
                    <div>
                      <label className="text-gray-300 mb-2 block">Comuna *</label>
                      <Select value={newUser.comuna} onValueChange={(value) => setNewUser({ ...newUser, comuna: value })} disabled={!newUser.region}>
                        <SelectTrigger className="bg-[#111] border-gray-700"><SelectValue placeholder="Selecciona comuna" /></SelectTrigger>
                        <SelectContent>
                          {comunasDisponibles.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {newUserErrors.comuna && <p className="text-red-500 text-sm mt-1">{newUserErrors.comuna}</p>}
                    </div>
                    {/* Género */}
                    <div>
                      <label className="text-gray-300 mb-2 block">Género *</label>
                      <Select value={newUser.genero} onValueChange={(value: Genero) => setNewUser({ ...newUser, genero: value })}>
                        <SelectTrigger className="bg-[#111] border-gray-700"><SelectValue placeholder="Selecciona género" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FEMENINO">Femenino</SelectItem>
                          <SelectItem value="MASCULINO">Masculino</SelectItem>
                          <SelectItem value="SIN_ESPECIFICAR">Prefiero no especificar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="bg-[var(--neon-blue)] text-black hover:bg-[var(--neon-purple)] hover:text-white" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <UserPlus className="w-5 h-5 mr-2" />}
                    Crear Vendedor
                  </Button>
                </form>
              </div>
            )}

            <div className="space-y-4">
                {users.map((u) => (
                  <div key={u.id} className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{u.nombre} {u.apellidos}</h3>
                      <p className="text-sm text-gray-400">{u.email}</p>
                      <p className="text-sm text-gray-500">RUN: {u.run}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        {u.roles.map((role) => (
                          <span
                            key={role}
                            className={`px-2 py-1 text-xs font-bold rounded-full text-black
                              ${role === 'ADMIN' ? 'bg-red-500' : ''}
                              ${role === 'VENDEDOR' ? 'bg-[var(--neon-blue)]' : ''}
                              ${role === 'CLIENTE' ? 'bg-[var(--neon-green)]' : ''}
                            `}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                      <Button
                        onClick={() => handleDeleteUser(u.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        disabled={u.roles.includes('ADMIN')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
