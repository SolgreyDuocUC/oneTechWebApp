import React from 'react';
import { ArrowRight, Zap, Shield, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { productos } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const { addToCart } = useCart();
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  
  // Configurar el plugin de autoplay
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  
  // Filtrar productos destacados
  const featuredProducts = productos.filter((p) => p.featured);
  
  // Filtrar productos por categorías para secciones específicas
  const computadores = productos.filter((p) => p.categoria === 'Computadores');
  const perifericos = productos.filter((p) => p.categoria === 'Periféricos');
  const monitores = productos.filter((p) => p.categoria === 'Monitores');

  // Efecto para actualizar el estado del carrusel
  React.useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on('select', () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Manejador para agregar productos al carrito
  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    toast.success('Producto agregado al carrito');
  };

  return (
    <div className="min-h-screen">
      {/* Carrusel de Banners Promocionales */}
      <section className="relative bg-black">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[autoplayPlugin.current]}
          setApi={setCarouselApi}
          className="w-full"
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
        >
          <CarouselContent className="ml-0">
            {/* Banner 1: Promoción Accesorios */}
            <CarouselItem className="pl-0">
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src={'https://xtech-frontend.s3.amazonaws.com/media/img/banners-cat-xtech-spa-6.jpg'}
                  alt="Descuento en accesorios pagando con tarjeta"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="max-w-7xl mx-auto px-4 w-full">
                    <div className="max-w-xl">
                      <h2 className="text-4xl md:text-5xl mb-4 text-white">
                        DESCUENTO EN <span className="text-[var(--neon-green)]">ACCESORIOS</span>
                      </h2>
                      <p className="text-xl text-gray-200 mb-6">
                        Pagando con tarjeta - www.onetech.cl
                      </p>
                      <Button
                        onClick={() => onNavigate('catalog', { categoria: 'Periféricos' })}
                        className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white text-lg px-8 py-6"
                      >
                        Ver Accesorios
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Banner 2: Promoción Audio */}
            <CarouselItem className="pl-0">
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src={'https://media.istockphoto.com/id/1208351593/es/vector/altavoz-de-sonido-en-luz-de-ne%C3%B3n-en-la-playa-concepto-futurista-de-banner-de-fiesta-nocturna.jpg?s=2048x2048&w=is&k=20&c=fx3cB8CzYU1t1b6dyQE9ILiUc6rcUiDAJkoOL0e2uP0='}
                  alt="Lo mejor en audio y sonido"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent flex items-center justify-end">
                  <div className="max-w-7xl mx-auto px-4 w-full">
                    <div className="max-w-xl ml-auto text-right">
                      <h2 className="text-4xl md:text-5xl mb-4 text-white">
                        LO MEJOR EN <span className="text-[var(--neon-purple)]">AUDIO Y SONIDO</span>
                      </h2>
                      <p className="text-xl text-gray-200 mb-6">
                        Disfruta de lo mejor - www.onetech.cl
                      </p>
                      <Button
                        onClick={() => onNavigate('catalog', { categoria: 'Audio' })}
                        className="bg-[var(--neon-purple)] text-white hover:bg-[var(--neon-green)] hover:text-black text-lg px-8 py-6"
                      >
                        Ver Audio
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Banner 3: Computadores Gamer */}
            <CarouselItem className="pl-0">
              <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-[#1a1a1a] via-black to-[#1a1a1a]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                      COMPUTADORES GAMER
                    </h2>
                    <p className="text-2xl text-gray-300 mb-8">
                      La mejor tecnología para tu setup
                    </p>
                    <Button
                      onClick={() => onNavigate('catalog', { categoria: 'Computadores' })}
                      className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white text-lg px-8 py-6"
                    >
                      Ver Computadores
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Botones de navegación personalizados */}
          <CarouselPrevious 
            className="left-4 bg-[var(--neon-green)] hover:bg-[var(--neon-purple)] text-black hover:text-white border-0 w-12 h-12 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]"
          >
            <ChevronLeft className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselNext 
            className="right-4 bg-[var(--neon-green)] hover:bg-[var(--neon-purple)] text-black hover:text-white border-0 w-12 h-12 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]"
          >
            <ChevronRight className="w-6 h-6" />
          </CarouselNext>

          {/* Indicadores de puntos */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current
                    ? 'bg-[var(--neon-green)] w-8'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir al banner ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-8 px-4 bg-[#0a0a0a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 border border-[var(--neon-green)]/30 rounded-lg bg-[#111] hover:border-[var(--neon-green)] transition-all">
              <div className="bg-[var(--neon-green)] w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-[var(--neon-green)] mb-1">Compra Rápida</h3>
                <p className="text-gray-400 text-sm">
                  Proceso optimizado en minutos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-[var(--neon-purple)]/30 rounded-lg bg-[#111] hover:border-[var(--neon-purple)] transition-all">
              <div className="bg-[var(--neon-purple)] w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[var(--neon-purple)] mb-1">Compra Segura</h3>
                <p className="text-gray-400 text-sm">
                  Productos garantizados de calidad
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-[var(--neon-blue)]/30 rounded-lg bg-[#111] hover:border-[var(--neon-blue)] transition-all">
              <div className="bg-[var(--neon-blue)] w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-[var(--neon-blue)] mb-1">Envío a Todo Chile</h3>
                <p className="text-gray-400 text-sm">
                  Despacho rápido a todas las regiones
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl text-[var(--neon-green)] mb-2">Productos Destacados</h2>
              <p className="text-gray-400">Los más vendidos de la semana</p>
            </div>
            <Button
              onClick={() => onNavigate('catalog')}
              variant="outline"
              className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black hidden md:flex"
            >
              Ver Todos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={(id) => onNavigate('product-detail', { productId: id })}
              />
            ))}
          </div>

          {/* Botón móvil para ver todos */}
          <div className="text-center mt-8 md:hidden">
            <Button
              onClick={() => onNavigate('catalog')}
              className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white w-full"
            >
              Ver Todos los Productos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Sección de Computadores */}
      {computadores.length > 0 && (
        <section className="py-12 px-4 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl text-[var(--neon-purple)] mb-2">Computadores Gamer</h2>
                <p className="text-gray-400">Potencia para tus juegos favoritos</p>
              </div>
              <Button
                onClick={() => onNavigate('catalog', { categoria: 'Computadores' })}
                variant="outline"
                className="border-[var(--neon-purple)] text-[var(--neon-purple)] hover:bg-[var(--neon-purple)] hover:text-white hidden md:flex"
              >
                Ver Más
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {computadores.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={(id) => onNavigate('product-detail', { productId: id })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección de Periféricos */}
      {perifericos.length > 0 && (
        <section className="py-12 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl text-[var(--neon-green)] mb-2">Periféricos Gaming</h2>
                <p className="text-gray-400">Mejora tu experiencia de juego</p>
              </div>
              <Button
                onClick={() => onNavigate('catalog', { categoria: 'Periféricos' })}
                variant="outline"
                className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black hidden md:flex"
              >
                Ver Más
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {perifericos.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={(id) => onNavigate('product-detail', { productId: id })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección de Monitores */}
      {monitores.length > 0 && (
        <section className="py-12 px-4 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl text-[var(--neon-blue)] mb-2">Monitores Gaming</h2>
                <p className="text-gray-400">Alta resolución y velocidad</p>
              </div>
              <Button
                onClick={() => onNavigate('catalog', { categoria: 'Monitores' })}
                variant="outline"
                className="border-[var(--neon-blue)] text-[var(--neon-blue)] hover:bg-[var(--neon-blue)] hover:text-black hidden md:flex"
              >
                Ver Más
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {monitores.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={(id) => onNavigate('product-detail', { productId: id })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección Informativa - Sobre One Tech */}
      <section className="py-16 px-4 bg-black border-t-2 border-[var(--neon-green)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl mb-4 text-[var(--neon-green)]">Sobre One Tech</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-purple)] mx-auto mb-8"></div>
          </div>
          <div className="text-gray-300 space-y-6 text-justify leading-relaxed">
            <p>
              One Tech es una tienda online creada en 2022, dedicada a la comercialización de
              productos para gamers, tales como consolas, accesorios, sillas y computadores.
              Aunque no contamos con locales físicos, realizamos envíos a todo Chile,
              garantizando una experiencia de compra rápida y confiable.
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 border border-[var(--neon-green)]/30 rounded-lg bg-[#0a0a0a]">
                <h3 className="text-[var(--neon-green)] mb-3">Nuestra Misión</h3>
                <p className="text-gray-400">
                  Entregar productos gamer de alta calidad en todo Chile, ofreciendo una experiencia
                  personalizada, rápida y confiable.
                </p>
              </div>
              <div className="p-6 border border-[var(--neon-purple)]/30 rounded-lg bg-[#0a0a0a]">
                <h3 className="text-[var(--neon-purple)] mb-3">Nuestra Visión</h3>
                <p className="text-gray-400">
                  Convertirnos en la tienda online gamer líder del país, destacando por la innovación,
                  fidelización y atención al cliente excepcional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
