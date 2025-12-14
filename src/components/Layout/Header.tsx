import { useState } from 'react';
import { ShoppingCart, LogOut, Menu, X, Gamepad2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import type { User } from '../../types/index';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const isAdmin = (user: User | null | undefined): boolean => {
  if (!user || !user.roles) return false;
  return user.roles.some(role => role.name === 'ROLE_ADMIN');
};

export const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = getCartItemsCount();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    onNavigate('home');
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Inicio', page: 'home' },
    { label: 'Tienda', page: 'catalog' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contacto', page: 'contact' }
  ];

  if (isAdmin(user)) {
    navItems.push({ label: 'Admin', page: 'admin' });
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border-b border-[var(--neon-green)] text-gray-200 px-4 py-3"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Button
              onClick={handleLogout}
              size="sm"
              variant="outline"
              className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black hidden sm:flex"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </motion.div>
      )}

      <div className="bg-black border-b-2 border-[var(--neon-green)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavigate('home')}
            >
              <div className="bg-[var(--neon-green)] p-2 rounded-lg group-hover:bg-[var(--neon-purple)] transition-colors">
                <Gamepad2 className="w-6 h-6 text-black" />
              </div>
              <span className="text-white text-xl tracking-wider">
                ONE <span className="text-[var(--neon-green)]">TECH</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
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

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => handleNavigate('cart')}
                className="relative p-2 text-gray-300 hover:text-[var(--neon-green)]"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--neon-purple)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <>
                  <Button
                    onClick={() => handleNavigate('profile')}
                    size="icon"
                    className="bg-transparent text-[var(--neon-green)] border border-[var(--neon-green)]"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="border-[var(--neon-purple)] text-[var(--neon-purple)]"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleNavigate('login-admin')}
                    variant="outline"
                    size="sm"
                    className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black"
                  >
                    ADMIN
                  </Button>

                  <Button
                    onClick={() => handleNavigate('login')}
                    size="sm"
                    className="bg-[var(--neon-green)] text-black"
                  >
                    Ingresar
                  </Button>

                  <Button
                    onClick={() => handleNavigate('register')}
                    variant="outline"
                    size="sm"
                    className="border-[var(--neon-green)] text-[var(--neon-green)]"
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => handleNavigate('cart')}
                className="relative p-2 text-gray-300"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--neon-purple)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 px-4 flex flex-col gap-3">
            {!isAuthenticated && (
              <>
                <Button
                  onClick={() => handleNavigate('login-admin')}
                  variant="outline"
                  className="border-[var(--neon-green)] text-[var(--neon-green)]"
                >
                  ADMIN
                </Button>

                <Button
                  onClick={() => handleNavigate('login')}
                  className="bg-[var(--neon-green)] text-black"
                >
                  Ingresar
                </Button>

                <Button
                  onClick={() => handleNavigate('register')}
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
