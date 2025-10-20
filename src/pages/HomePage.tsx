import React from 'react';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { productos } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const { addToCart } = useCart();
  
  const featuredProducts = productos.filter((p) => p.featured);

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    toast.success('Producto agregado al carrito');
  };

  return (
    <div className="min-h-screen">
      {}
      <section className="relative bg-gradient-to-br from-black via-[#1a1a1a] to-black py-20 px-4 border-b-2 border-[var(--neon-green)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Bienvenido a ONE TECH
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Tu tienda online de productos gamer en Chile. Experiencia personalizada, rápida y
              confiable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate('catalog')}
                className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white text-lg px-8 py-6"
              >
                Ver Catálogo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => onNavigate('blog')}
                variant="outline"
                className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black text-lg px-8 py-6"
              >
                Leer Blog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-[var(--neon-green)] rounded-lg bg-[#111] hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all">
              <div className="bg-[var(--neon-green)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-[var(--neon-green)] mb-2">Compra Rápida</h3>
              <p className="text-gray-400">
                Proceso de compra optimizado para que encuentres y adquieras tus productos en
                minutos.
              </p>
            </div>

            <div className="text-center p-6 border border-[var(--neon-purple)] rounded-lg bg-[#111] hover:shadow-[0_0_20px_rgba(122,0,255,0.2)] transition-all">
              <div className="bg-[var(--neon-purple)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[var(--neon-purple)] mb-2">Compra Segura</h3>
              <p className="text-gray-400">
                Productos de alta calidad garantizados. Tu satisfacción es nuestra prioridad.
              </p>
            </div>

            <div className="text-center p-6 border border-[var(--neon-blue)] rounded-lg bg-[#111] hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all">
              <div className="bg-[var(--neon-blue)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-[var(--neon-blue)] mb-2">Envío a Todo Chile</h3>
              <p className="text-gray-400">
                Despacho rápido y confiable a todas las regiones del país.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-[var(--neon-green)]">Productos Destacados</h2>
            <p className="text-gray-400 text-lg">
              Descubre nuestra selección de productos más populares
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={(id) => onNavigate('product-detail', { productId: id })}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate('catalog')}
              className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white text-lg px-8 py-6"
            >
              Ver Todos los Productos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 px-4 bg-[#0a0a0a] border-t-2 border-[var(--neon-green)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-4 text-[var(--neon-green)]">Sobre One Tech</h2>
          </div>
          <div className="text-gray-300 space-y-4 text-justify leading-relaxed">
            <p>
              One Tech es una tienda online creada en 2022, dedicada a la comercialización de
              productos para gamers, tales como consolas, accesorios, sillas y computadores.
              Aunque no contamos con locales físicos, realizamos envíos a todo Chile,
              garantizando una experiencia de compra rápida y confiable.
            </p>
            <p>
              <strong className="text-[var(--neon-green)]">Nuestra Misión:</strong> Entregar
              productos gamer de alta calidad en todo Chile, ofreciendo una experiencia
              personalizada, rápida y confiable.
            </p>
            <p>
              <strong className="text-[var(--neon-purple)]">Nuestra Visión:</strong> Convertirnos
              en la tienda online gamer líder del país, destacando por la innovación,
              fidelización y atención al cliente excepcional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
