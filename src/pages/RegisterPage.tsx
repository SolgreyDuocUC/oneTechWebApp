import React, { useState } from "react";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useAuth } from "../contexts/AuthContext";
import { regiones } from "../data/mockData";
import {
  validateRUN,
  validateEmail,
  validateAge,
  formatRUN,
} from "../utils/validations";
import { toast } from "sonner";

interface RegisterPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export const RegisterPage = ({ onNavigate }: RegisterPageProps) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
    direccion: "",
    region: "",
    comuna: "",
    rol: "cliente" as "admin" | "cliente" | "vendedor",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRegion, setSelectedRegion] = useState("");

  const comunasDisponibles =
    regiones.find((r) => r.nombre === selectedRegion)?.comunas || [];

  // 🔹 Función genérica para manejar cambios en los inputs
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.run) newErrors.run = "El RUN es obligatorio";
    else if (!validateRUN(formData.run))
      newErrors.run = "RUN inválido (7-9 dígitos sin puntos ni guión)";

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellidos.trim())
      newErrors.apellidos = "Los apellidos son obligatorios";

    if (!formData.email) newErrors.email = "El correo es obligatorio";
    else if (!validateEmail(formData.email))
      newErrors.email =
        "Correo inválido. Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com";

    if (!formData.password)
      newErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 6)
      newErrors.password = "Debe tener al menos 6 caracteres";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    if (!formData.fechaNacimiento)
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    else if (!validateAge(formData.fechaNacimiento))
      newErrors.fechaNacimiento = "Debes ser mayor de 18 años";

    if (!formData.direccion.trim())
      newErrors.direccion = "La dirección es obligatoria";
    if (!formData.region) newErrors.region = "Selecciona una región";
    if (!formData.comuna) newErrors.comuna = "Selecciona una comuna";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Por favor corrige los errores del formulario");
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const success = register(userData);

    if (success) {
      toast.success("Registro exitoso. ¡Bienvenido a One Tech!");
      onNavigate("home");
    } else {
      toast.error("El correo o RUN ya están registrados");
      setErrors({
        email: "Este correo ya está registrado",
        run: "Este RUN ya está registrado",
      });
    }
  };

  // 🔹 Componente reutilizable para campos de entrada
  const Field = ({
    label,
    name,
    type = "text",
    placeholder = "",
    helper,
  }: {
    label: string;
    name: keyof typeof formData;
    type?: string;
    placeholder?: string;
    helper?: string;
  }) => (
    <div>
      <label className="text-gray-300 mb-2 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={formData[name]}
        onChange={(e) => handleChange(name, e.target.value)}
        onBlur={
          name === "run"
            ? (e) =>
                validateRUN(e.target.value) &&
                handleChange("run", formatRUN(e.target.value))
            : undefined
        }
        className="bg-[#1a1a1a] border-gray-700 text-white"
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
      {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => onNavigate("login")}
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
              <Field
                label="RUN"
                name="run"
                placeholder="12345678"
                helper="Sin puntos ni guión, 7-9 dígitos"
              />
              <Field label="Nombre" name="nombre" placeholder="Juan" />
              <Field label="Apellidos" name="apellidos" placeholder="Pérez González" />
              <Field label="Correo Electrónico" name="email" type="email" placeholder="tu@email.com" />
              <Field label="Contraseña" name="password" type="password" placeholder="••••••••" />
              <Field label="Confirmar Contraseña" name="confirmPassword" type="password" placeholder="••••••••" />
              <Field label="Fecha de Nacimiento" name="fechaNacimiento" type="date" helper="Debes ser mayor de 18 años" />
              <Field label="Dirección" name="direccion" placeholder="Av. Libertador 123" />

              {/* Región */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Región <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.region}
                  onValueChange={(value: string) => {
                    setSelectedRegion(value);
                    handleChange("region", value);
                    handleChange("comuna", "");
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
                  onValueChange={(value: string) => handleChange("comuna", value)}
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
                  onValueChange={(value: "admin" | "cliente" | "vendedor") =>
                    handleChange("rol", value)
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

            <Button
              type="submit"
              className="w-full bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Crear Cuenta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => onNavigate("login")}
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