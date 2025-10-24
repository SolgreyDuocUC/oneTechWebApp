import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Tipos de páginas disponibles en la aplicación
type PageType =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'login'
  | 'register'
  | 'blog'
  | 'contact'
  | 'admin';

// Estado de navegación con página actual y datos opcionales
interface NavigationState {
  page: PageType;
  data?: any;
}

/**
 * Componente principal de la aplicación One Tech
 * Gestiona la navegación entre páginas y provee contextos globales
 */
export default function App() {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    page: 'home',
  });

  // Manejador de navegación entre páginas
  const handleNavigate = (page: string, data?: any) => {
    setNavigationState({ page: page as PageType, data });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renderizar la página correspondiente según el estado de navegación
  const renderPage = () => {
    switch (navigationState.page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'catalog':
        return <CatalogPage onNavigate={handleNavigate} initialData={navigationState.data} />;
      case 'product-detail':
        return (
          <ProductDetailPage
            productId={navigationState.data?.productId}
            onNavigate={handleNavigate}
          />
        );
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-black text-white">
          <Header onNavigate={handleNavigate} currentPage={navigationState.page} />
          <main className="flex-1">{renderPage()}</main>
          <Footer />
          <Toaster position="top-right" theme="dark" />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
