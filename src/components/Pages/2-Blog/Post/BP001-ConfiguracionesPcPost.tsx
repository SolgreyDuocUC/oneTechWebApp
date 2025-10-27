import { Calendar, User } from 'lucide-react';
import { Button } from '../../../ui/button';
import type { BlogPost } from '../Interface/blog';

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export const BlogDetail = ({ post, onBack }: BlogDetailProps) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-white">
      <Button onClick={onBack} variant="outline" className="mb-6 text-[var(--neon-green)] border-[var(--neon-green)]">
        ← Volver al blog
      </Button>

      <img src={post.imagen} alt={post.titulo} className="rounded-lg mb-6 w-full" />
      <h1 className="text-4xl mb-2 text-[var(--neon-green)]">{post.titulo}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" /> {post.autor}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" /> {new Date(post.fecha).toLocaleDateString('es-CL')}
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed">{post.contenido}</p>
    </div>
  );
};

/*
import { Calendar, User } from 'lucide-react';
import { Button } from '../../ui/button';
import type { BlogPost } from '../../../types/blog';

interface BlogDetailPageProps {
  post: BlogPost;
  onNavigate: (page: string, data?: any) => void;
}

export const BlogDetailPage = ({ post, onNavigate }: BlogDetailPageProps) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-white">
      <Button
        onClick={() => onNavigate('blog')}
        variant="outline"
        className="mb-6 text-[var(--neon-green)] border-[var(--neon-green)]"
      >
        ← Volver al blog
      </Button>

      <img src={post.imagen} alt={post.titulo} className="rounded-lg mb-6 w-full" />
      <h1 className="text-4xl mb-2 text-[var(--neon-green)]">{post.titulo}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" /> {post.autor}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" /> {new Date(post.fecha).toLocaleDateString('es-CL')}
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{post.contenido}</p>
    </div>
  );
};
*/

/*
🧠 3. Modifica tu BlogPage.tsx

Cuando el usuario haga clic en “Leer más”, debes navegar a blog-detail pasando el artículo:

<Button
  onClick={() => onNavigate('blog-detail', post)} // 👈 pasa el post completo
  variant="outline"
  className="w-full border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-black"
>
  Leer más
  <ArrowRight className="ml-2 w-4 h-4" />
</Button>
*/