import { useState } from "react";
import {
  ShoppingCart,
  LogOut,
  Menu,
  X,
  Gamepad2,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { Button } from "../ui/button";
import type { UserRole } from "@/types";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const isAdmin = (roles?: UserRole[]): boolean =>
  roles?.includes("ADMIN") ?? false;

export const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = getCartItemsCount();

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    onNavigate("home");
  };

  const navItems = [
    { label: "Inicio", page: "home" },
    { label: "Tienda", page: "catalog" },
    { label: "Blog", page: "blog" },
    { label: "Contacto", page: "contact" },
  ];

  if (isAdmin(user?.roles)) {
    navItems.push({ label: "Admin", page: "admin" });
  }

  return (
    <header className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => handleNavigate("home")}
          className="flex items-center gap-2 text-xl font-bold text-[var(--neon-green)]"
        >
          <Gamepad2 className="w-7 h-7" />
          One Tech
        </button>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavigate(item.page)}
              className={`transition-colors ${
                currentPage === item.page
                  ? "text-[var(--neon-green)]"
                  : "text-gray-300 hover:text-[var(--neon-green)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ACCIONES DESKTOP */}
        <div className="hidden md:flex items-center gap-4">
          {/* CARRITO */}
          <button
            onClick={() => handleNavigate("cart")}
            className="relative p-2 text-gray-300 hover:text-[var(--neon-green)] transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--neon-purple)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* AUTH */}
          {isAuthenticated ? (
            <>
              <Button
                onClick={() => handleNavigate("profile")}
                className="bg-transparent text-[var(--neon-green)] border border-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black"
                size="icon"
              >
                <Settings className="w-5 h-5" />
              </Button>

              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-[var(--neon-purple)] text-[var(--neon-purple)] hover:bg-[var(--neon-purple)] hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleNavigate("login")}
                className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
                size="sm"
              >
                Ingresar
              </Button>

              <Button
                onClick={() => handleNavigate("register")}
                variant="outline"
                size="sm"
                className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black"
              >
                Registrarse
              </Button>
            </>
          )}
        </div>

        {/* BOTÓN MOBILE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden px-4 py-4 border-t border-gray-800 flex flex-col gap-3"
        >
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavigate(item.page)}
              className={`text-left py-2 ${
                currentPage === item.page
                  ? "text-[var(--neon-green)]"
                  : "text-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => handleNavigate("cart")}
            className="py-2 text-gray-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Carrito ({cartCount})
          </button>

          {isAuthenticated ? (
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => handleNavigate("profile")}
                variant="outline"
                className="flex-1 border-[var(--neon-green)] text-[var(--neon-green)]"
              >
                <Settings className="w-4 h-4 mr-2" />
                Perfil
              </Button>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex-1 border-[var(--neon-purple)] text-[var(--neon-purple)]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={() => handleNavigate("login")}
                className="bg-[var(--neon-green)] text-black"
              >
                Ingresar
              </Button>

              <Button
                onClick={() => handleNavigate("register")}
                variant="outline"
                className="border-[var(--neon-green)] text-[var(--neon-green)]"
              >
                Registrarse
              </Button>
            </>
          )}
        </motion.div>
      )}
    </header>
  );
};
