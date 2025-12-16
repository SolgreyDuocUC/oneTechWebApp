import React, { useState, useMemo } from "react";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { regiones } from "../../../data/mockRegiones";
import { validateRUN, validateAge, formatRUN } from "../../../utils/validations";
import { toast } from "sonner";
import { AuthService } from "@/remote/service/User/AuthService";
import type { UserCreateDTO } from "@/remote/DTO/UserDTO";

export type Genero = "FEMENINO" | "MASCULINO" | "SIN_ESPECIFICAR";

interface RegisterFormData {
  run: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  confirmPassword: string;
  fechaNacimiento: string;
  direccion: string;
  region: string;
  comuna: string;
  genero: Genero | "";
  codigoReferido: string;
}

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

const validateEmail = (email: string) =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/.test(email);

export const RegisterPage = ({ onNavigate }: RegisterPageProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
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
    genero: "",
    codigoReferido: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const comunasDisponibles = useMemo(
    () => regiones.find((r) => r.nombre === formData.region)?.comunas || [],
    [formData.region]
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const runClean = formData.run.replace(/[^0-9kK]/g, "");

    if (!validateRUN(runClean)) newErrors.run = "RUN inválido";
    if (!formData.nombre) newErrors.nombre = "Nombre obligatorio";
    if (!formData.apellidos) newErrors.apellidos = "Apellidos obligatorios";
    if (!validateEmail(formData.email)) newErrors.email = "Correo inválido";
    if (formData.password.length < 6)
      newErrors.password = "Mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!formData.fechaNacimiento || !validateAge(formData.fechaNacimiento))
      newErrors.fechaNacimiento = "Debes ser mayor de edad";
    if (!formData.region) newErrors.region = "Selecciona una región";
    if (!formData.comuna) newErrors.comuna = "Selecciona una comuna";
    if (!formData.genero) newErrors.genero = "Selecciona un género";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Hay información inválida en tu formulario");
      return;
    }

    try {
      const payload: UserCreateDTO = {
        run: formatRUN(formData.run),
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        password: formData.password,
        fechaNacimiento: formData.fechaNacimiento,
        direccion: formData.direccion,
        region: formData.region,
        comuna: formData.comuna,
        genero: formData.genero || "SIN_ESPECIFICAR",
        codigoReferido: formData.codigoReferido || undefined,
        roleIds: [3],
      };

      await AuthService.register(payload);

      toast.success("Registro exitoso");
      onNavigate("login");
    } catch (error) {
      toast.error("No se pudo registrar");
    }
  };

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
              
              <div>
                <label className="text-gray-300 mb-2 block">RUN *</label>
                <Input
                  type="text"
                  value={formData.run}
                  onChange={(e) => handleChange("run", e.target.value)}
                  onBlur={(e) => {
                    const clean = e.target.value.replace(/[^0-9kK]/g, "");
                    if (validateRUN(clean)) {
                      setFormData((prev) => ({ ...prev, run: formatRUN(clean) }));
                    } else validate();
                  }}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.run && <p className="text-red-500 text-sm mt-1">{errors.run}</p>}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Nombre *</label>
                <Input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Apellidos *</label>
                <Input
                  type="text"
                  value={formData.apellidos}
                  onChange={(e) => handleChange("apellidos", e.target.value)}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.apellidos && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>
                )}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Correo *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Contraseña *</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Confirmar *</label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Fecha de Nacimiento *</label>
                <Input
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.fechaNacimiento && (
                  <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>
                )}
              </div>
              
              {/* Nuevo campo: Género */}
              <div>
                <label className="text-gray-300 mb-2 block">Género *</label>
                <Select
                  value={formData.genero}
                  onValueChange={(value: Genero) => handleChange("genero", value)}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                    <SelectValue placeholder="Selecciona género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FEMENINO">Femenino</SelectItem>
                    <SelectItem value="MASCULINO">Masculino</SelectItem>
                    <SelectItem value="SIN_ESPECIFICAR">Prefiero no especificar</SelectItem>
                  </SelectContent>
                </Select>
                {errors.genero && (
                  <p className="text-red-500 text-sm mt-1">{errors.genero}</p>
                )}
              </div>
              {/* Fin Nuevo campo: Género */}

              <div>
                <label className="text-gray-300 mb-2 block">Dirección *</label>
                <Input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => handleChange("direccion", e.target.value)}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                />
                {errors.direccion && (
                  <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
                )}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Región *</label>
                <Select
                  value={formData.region}
                  onValueChange={(value: any) =>
                    setFormData((prev) => ({ ...prev, region: value, comuna: "" }))
                  }
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
                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">{errors.region}</p>
                )}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Comuna *</label>
                <Select
                  value={formData.comuna}
                  onValueChange={(value: string) => handleChange("comuna", value)}
                  disabled={!formData.region || comunasDisponibles.length === 0}
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
                {errors.comuna && (
                  <p className="text-red-500 text-sm mt-1">{errors.comuna}</p>
                )}
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">Código de Referido</label>
                <Input
                  type="text"
                  value={formData.codigoReferido}
                  onChange={(e) => handleChange("codigoReferido", e.target.value)}
                  className="bg-[#1a1a1a] border-gray-700 text-white"
                  placeholder="Opcional"
                />
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