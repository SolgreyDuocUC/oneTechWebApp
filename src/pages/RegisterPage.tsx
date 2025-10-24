import React, { useState } from 'react';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { regiones } from '../data/mockData';
import {
  validateRUN,
  validateEmail,
  validateAge,
  formatRUN,
} from '../utils/validations';
import { toast } from 'sonner@2.0.3';

interface RegisterPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export const RegisterPage = ({ onNavigate }: RegisterPageProps) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    direccion: '',
    region: '',
    comuna: '',
    rol: 'cliente' as 'admin' | 'cliente' | 'vendedor',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRegion, setSelectedRegion] = useState('');

  const comunasDisponibles =
    regiones.find((r) => r.nombre === selectedRegion)?.comunas || [];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Validar RUN
    if (!formData.run) {
      newErrors.run = 'El RUN es obligatorio';
    } else if (!validateRUN(formData.run)) {
      newErrors.run = 'RUN inválido (7-9 dígitos sin puntos ni guión)';
    }

    // Validar nombre y apellidos
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son obligatorios';
    }

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email =
        'Correo inválido. Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com';
    }

    // Validar password
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar fecha de nacimiento
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    } else if (!validateAge(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Debes ser mayor de 18 años para registrarte';
    }

    // Validar dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    }

    // Validar región y comuna
    if (!formData.region) {
      newErrors.region = 'Debes seleccionar una región';
    }
    if (!formData.comuna) {
      newErrors.comuna = 'Debes seleccionar una comuna';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Por favor corrige los errores del formulario');
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const success = register(userData);

    if (success) {
      toast.success('Registro exitoso. Bienvenido a One Tech!');
      onNavigate('home');
    } else {
      toast.error('El correo o RUN ya están registrados');
      setErrors({
        email: 'Este correo ya está registrado',
        run: 'Este RUN ya está registrado',
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => onNavigate('login')}
          variant="ghost"
          className="mb-6 text-[var(--neon-green)] hover:text-[var(--neon-purple)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a iniciar sesión
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2 text-[var(--neon-green)]">Crear Cuenta</h1>
          <p className="text-gray-400">Únete a la comunidad gamer de One Tech</p>
        </div>

        <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RUN */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  RUN <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="12345678"
                  value={formData.run}
                  onChange={(e) => {
                    setFormData({ ...formData, run: e.target.value });
                    setErrors({ ...errors, run: undefined });
                  }}
                  onBlur={(e) => {
                    if (validateRUN(e.target.value)) {
                      setFormData({ ...formData, run: formatRUN(e.target.value) });
                    }
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.run && <p className="text-red-500 text-sm mt-1">{errors.run}</p>}
                <p className="text-xs text-gray-500 mt-1">Sin puntos ni guión, 7-9 dígitos</p>
              </div>

              {/* Nombre */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Juan"
                  value={formData.nombre}
                  onChange={(e) => {
                    setFormData({ ...formData, nombre: e.target.value });
                    setErrors({ ...errors, nombre: undefined });
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
              </div>

              {/* Apellidos */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Apellidos <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Pérez González"
                  value={formData.apellidos}
                  onChange={(e) => {
                    setFormData({ ...formData, apellidos: e.target.value });
                    setErrors({ ...errors, apellidos: undefined });
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.apellidos && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors({ ...errors, email: undefined });
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors({ ...errors, password: undefined });
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Confirmar Contraseña <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Fecha de nacimiento */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Fecha de Nacimiento <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => {
                    setFormData({ ...formData, fechaNacimiento: e.target.value });
                    setErrors({ ...errors, fechaNacimiento: undefined });
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.fechaNacimiento && (
                  <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Debes ser mayor de 18 años</p>
              </div>

              {/* Dirección */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Av. Libertador 123"
                  value={formData.direccion}
                  onChange={(e) => {
                    setFormData({ ...formData, direccion: e.target.value });
                    setErrors({ ...errors, direccion: undefined });
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.direccion && (
                  <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
                )}
              </div>

              {/* Región */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Región <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => {
                    setSelectedRegion(value);
                    setFormData({ ...formData, region: value, comuna: '' });
                    setErrors({ ...errors, region: undefined });
                  }}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                    <SelectValue placeholder="Selecciona región" />
                  </SelectTrigger>
                  <SelectContent>
                    {regiones.map((region) => (
                      <SelectItem key={region.nombre} value={region.nombre}>
                        {region.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
              </div>

              {/* Comuna */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Comuna <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.comuna}
                  onValueChange={(value) => {
                    setFormData({ ...formData, comuna: value });
                    setErrors({ ...errors, comuna: undefined });
                  }}
                  disabled={!formData.region}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                    <SelectValue placeholder="Selecciona comuna" />
                  </SelectTrigger>
                  <SelectContent>
                    {comunasDisponibles.map((comuna) => (
                      <SelectItem key={comuna} value={comuna}>
                        {comuna}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.comuna && <p className="text-red-500 text-sm mt-1">{errors.comuna}</p>}
              </div>

              {/* Rol */}
              <div>
                <label className="text-gray-300 mb-2 block">Tipo de Usuario</label>
                <Select
                  value={formData.rol}
                  onValueChange={(value: 'admin' | 'cliente' | 'vendedor') =>
                    setFormData({ ...formData, rol: value })
                  }
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botón submit */}
            <Button
              type="submit"
              className="w-full bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Crear Cuenta
            </Button>
          </form>

          {/* Link a login */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-[var(--neon-green)] hover:text-[var(--neon-purple)] transition-colors"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
