import React, { useState } from "react";
import { Mail, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { validateEmail } from "../../../utils/validations";
import { toast } from "sonner";
import { UserService } from "@/remote/service/User/UserService";

    interface RecoveryProps {
    onNavigate: (page: string) => void;
    }

    export const RecoveryPage = ({ onNavigate }: RecoveryProps) => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const newErrors: any = {};

        if (!validateEmail(email))
        newErrors.email = "El correo no es válido (institucional o normal)";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRecovery = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
        await UserService.getByEmail(email);
        toast.success("Usuario encontrado. Continúa con el proceso de recuperación.");
        } catch {
        toast.error("No existe un usuario con ese correo.");
        setErrors({ email: "Correo no registrado" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">

            <div className="text-center mb-8">
            <h1 className="text-4xl mb-2 text-[var(--neon-green)]">Recuperar Cuenta</h1>
            <p className="text-gray-400">Ingresa tu correo registrado</p>
            </div>

            <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-8">

            <form onSubmit={handleRecovery} className="space-y-6">

                <div>
                <label className="text-gray-300 mb-2 block">Correo Electrónico</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev: any) => ({ ...prev, email: undefined }));
                    }}
                    className="pl-10 bg-[#1a1a1a] border-gray-700 text-white"
                    />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <Button
                type="submit"
                className="w-full bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
                >
                <RefreshCcw className="w-5 h-5 mr-2" />
                Recuperar Cuenta
                </Button>
            </form>

            <div className="mt-6 text-center">
                <button
                onClick={() => onNavigate("login")}
                className="text-[var(--neon-green)] hover:text-[var(--neon-purple)] transition-colors flex items-center mx-auto"
                >
                <ArrowLeft className="w-4 h-4 mr-1" /> Volver al inicio de sesión
                </button>
            </div>

            </div>

        </div>
        </div>
    );
    };
