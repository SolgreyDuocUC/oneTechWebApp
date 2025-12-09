import { useState } from 'react';
import { ShoppingCart, LogOut, Menu, X, Gamepad2, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = getCartItemsCount();

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const navItems = [
    { label: 'Inicio', page: 'home' },
    { label: 'Tienda', page: 'catalog' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contacto', page: 'contact' }
  ];

  if (user?.rol === 'ADMIN') {
    navItems.push({ label: 'Admin', page: 'admin' });
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-black border-b-2 border-[var(--neon-green)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="bg-[var(--neon-green)] p-2 rounded-lg group-hover:bg-[var(--neon-purple)] transition-colors">
                <Gamepad2 className="w-6 h-6 text-black" />
              </div>
              <span className="text-white text-xl tracking-wider">
                ONE <span className="text-[var(--neon-green)]">TECH</span>
              </span>
            </div>

            {/* NAV DESKTOP */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`transition-colors ${
                    currentPage === item.page
                      ? 'text-[var(--neon-green)]'
                      : 'text-gray-300 hover:text-[var(--neon-green)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* RIGHT DESKTOP */}
            <div className="hidden md:flex items-center gap-4">
              {/* Carrito */}
              <button
                onClick={() => onNavigate('cart')}
                className="relative p-2 text-gray-300 hover:text-[var(--neon-green)] transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--neon-purple)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Si NO está autenticado → Ingresar / Registrarse */}
              {!isAuthenticated && (
                <>
                  <Button
                    onClick={() => onNavigate('login')}
                    className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
                    size="sm"
                  >
                    Ingresar
                  </Button>

                  <Button
                    onClick={() => onNavigate('register')}
                    variant="outline"
                    size="sm"
                    className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black"
                  >
                    Registrarse
                  </Button>
                </>
              )}

              {/* Si está autenticado → Perfil + Logout */}
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => onNavigate('profile')}
                    className="p-2 text-gray-300 hover:text-[var(--neon-green)] transition-colors"
                  >
                    <Settings className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:text-[var(--neon-green)]"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 px-4 flex flex-col gap-3">

            {/* Saludo si está autenticado */}
            {isAuthenticated && (
              <div className="text-gray-300 text-sm border-b border-gray-800 pb-3">
                Hola, <span className="text-[var(--neon-green)]">{user?.nombre}</span>
                <div>Tu espacio gamer favorito 💚</div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="mt-2 border-[var(--neon-green)] text-[var(--neon-green)] w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </div>
            )}

            {/* Items de navegación */}
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMenuOpen(false);
                }}
                className={`text-left py-2 ${
                  currentPage === item.page ? 'text-[var(--neon-green)]' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Carrito */}
            <button
              onClick={() => {
                onNavigate('cart');
                setIsMenuOpen(false);
              }}
              className="py-2 text-gray-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Carrito ({cartCount})
            </button>

            {/* Si NO está autenticado */}
            {!isAuthenticated && (
              <>
                <Button
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                  className="bg-[var(--neon-green)] text-black"
                >
                  Ingresar
                </Button>

                <Button
                  onClick={() => {
                    onNavigate('register');
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="border-[var(--neon-green)] text-[var(--neon-green)]"
                >
                  Registrar
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
