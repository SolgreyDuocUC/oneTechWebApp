import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { validateEmail } from "../../../utils/validations";
import { toast } from "sonner";
import { UserService } from "../../../service/userService";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}


export const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};

    if (!validateEmail(formData.email))
      newErrors.email = "El correo no es válido (institucional o normal)";

    if (!formData.password)
      newErrors.password = "Contraseña obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await UserService.login(formData.email, formData.password);
      toast.success("Inicio de sesión correcto");
      onNavigate("home");
    } catch {
      toast.error("Credenciales incorrectas");
      setErrors({ password: "Correo o contraseña incorrectos" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2 text-[var(--neon-green)]">Iniciar Sesión</h1>
          <p className="text-gray-400">Ingresa a tu cuenta de One Tech</p>
        </div>

        <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="text-gray-300 mb-2 block">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors((prev: any) => ({ ...prev, email: undefined }));
                  }}
                  className="pl-10 bg-[#1a1a1a] border-gray-700 text-white"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-300 mb-2 block">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors((prev: any) => ({ ...prev, password: undefined }));
                  }}
                  className="pl-10 bg-[#1a1a1a] border-gray-700 text-white"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => onNavigate("recovery")}
                className="text-sm text-[var(--neon-green)] hover:text-[var(--neon-purple)] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => onNavigate("register")}
                className="text-[var(--neon-green)] hover:text-[var(--neon-purple)] transition-colors"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
