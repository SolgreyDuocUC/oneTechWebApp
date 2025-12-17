import { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../../Pages/3-Cart/Cart/ProductCard';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useCart } from '../../../contexts/CartContext';
import { toast } from 'sonner';
import type { Product } from '../../../types';
import { getProducts } from '@/remote/service/Products/ProductService';

interface CatalogPageProps {
  onNavigate: (page: string, data?: any) => void;
  initialData?: { categoria?: string };
}

export const CatalogPage = ({ onNavigate, initialData }: CatalogPageProps) => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    getProducts()
      .then(setProductos)
      .catch(err => {
        console.error("Error al cargar productos:", err);
        toast.error('No se pudieron cargar los productos');
      });
  }, []);

  useEffect(() => {
    if (initialData?.categoria) {
      setSelectedCategory(initialData.categoria);
    }
  }, [initialData]);

  const categories = useMemo(() => {
    if (!productos || productos.length === 0) return ['all'];
    return ['all', ...Array.from(new Set(productos.map((p) => p.category)))];
  }, [productos]);

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
    toast.success('Producto agregado al carrito');
  };

  let filteredProducts = productos.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-[var(--neon-green)]">Catálogo de Productos</h1>
          <p className="text-gray-400">Explora nuestra selección completa de productos gamer</p>
        </div>

        <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-[var(--neon-green)]" />
            <h3 className="text-[var(--neon-green)]">Filtros y Búsqueda</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || selectedCategory !== 'all' || sortBy !== 'featured') && (
            <div className="mt-4">
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('featured');
                }}
                variant="outline"
                size="sm"
                className="border-[var(--neon-green)] text-[var(--neon-green)]"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>

        <div className="mb-4 text-gray-400">
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
                onViewDetails={() => onNavigate('product-detail', { productId: product.id.toString() })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">No se encontraron productos</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('featured');
              }}
              className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
