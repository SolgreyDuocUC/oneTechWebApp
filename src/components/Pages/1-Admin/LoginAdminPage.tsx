import { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { useAuth } from "../../../contexts/AuthContext";

    interface LoginAdminProps {
    onNavigate: (page: string) => void;
    }

    export const LoginAdmin = ({ onNavigate }: LoginAdminProps) => {
    const { loginAdminMock } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const ok = await loginAdminMock(formData.email, formData.password);

        if (!ok) {
        toast.error("Credenciales de administrador inválidas");
        return;
        }

        toast.success("Bienvenida Admin");
        onNavigate("admin");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
            <div className="text-center mb-8">
            <h1 className="text-4xl text-[var(--neon-purple)] mb-2">
                Acceso Administrador
            </h1>
            <p className="text-gray-400">
                Panel interno One Tech
            </p>
            </div>

            <div className="bg-[#111] border border-[var(--neon-purple)] rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                <label className="text-gray-300 mb-2 block">Correo Admin</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                    type="email"
                    className="pl-10 bg-[#1a1a1a] border-gray-700 text-white"
                    value={formData.email}
                    onChange={e =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    />
                </div>
                </div>

                <div>
                <label className="text-gray-300 mb-2 block">Contraseña</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                    type="password"
                    className="pl-10 bg-[#1a1a1a] border-gray-700 text-white"
                    value={formData.password}
                    onChange={e =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    />
                </div>
                </div>

                <Button
                type="submit"
                className="w-full bg-[var(--neon-purple)] text-white hover:bg-[var(--neon-green)] hover:text-black"
                >
                <ShieldCheck className="w-5 h-5 mr-2" />
                Entrar como Admin
                </Button>
            </form>
            </div>
        </div>
        </div>
    );
    };
