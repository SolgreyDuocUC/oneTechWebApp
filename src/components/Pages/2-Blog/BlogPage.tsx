import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { blogPosts } from '../../../data/mockblogPost';

interface BlogPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export const BlogPage = ({ onNavigate }: BlogPageProps) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 text-[var(--neon-green)]">Blog Gamer</h1>
          <p className="text-gray-400 text-lg">
            Noticias, guías y todo sobre el mundo gaming
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#111] border border-[var(--neon-green)] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] group"
            >
              {/* Imagen */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={post.imagen}
                  alt={post.titulo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-black/70 text-[var(--neon-green)] border-[var(--neon-green)]">
                  {post.categoria}
                </Badge>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h2 className="text-xl text-white mb-3 line-clamp-2 group-hover:text-[var(--neon-green)] transition-colors">
                  {post.titulo}
                </h2>

                <p className="text-gray-400 mb-4 line-clamp-3">{post.extracto}</p>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.autor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.fecha).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>

                {/* Botón leer más */}
                <Button
                  onClick={() => alert('Vista de artículo completo (simulado)')}
                  variant="outline"
                  className="w-full border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black"
                >
                  Leer más
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-br from-[#111] to-[#1a1a1a] border-2 border-[var(--neon-green)] rounded-lg p-8 text-center">
          <h3 className="text-2xl md:text-3xl mb-4 text-[var(--neon-green)]">
            Suscríbete a Nuestro Newsletter
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Recibe las últimas noticias, ofertas exclusivas y contenido gamer directamente en tu
            correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--neon-green)]"
            />
            <Button className="bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white">
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
