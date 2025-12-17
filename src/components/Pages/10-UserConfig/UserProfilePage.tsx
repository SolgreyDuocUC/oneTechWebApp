import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, UserCog, Lock, HelpCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UserService } from "@/remote/service/User/UserService";
import { useAuth } from "@/contexts/AuthContext";
import type { UserUpdateDTO } from "@/remote/DTO/UserDTO";
import type { ChangePasswordDTO } from "@/remote/DTO/ChangePasswordDTO";
import type { DeleteAccountDTO } from "@/remote/DTO/DeleteAccountDTO";
import { regiones } from "@/data/mockRegiones";

export type Genero = "FEMENINO" | "MASCULINO" | "SIN_ESPECIFICAR";

interface UserProfileFormData {
    nombre: string;
    apellidos: string;
    email: string;
    direccion: string;
    region: string;
    comuna: string;
    genero: Genero | "";
    }

    interface UserProfilePageProps {
    onNavigate: (page: string) => void;
    }

    export const UserProfilePage = ({ onNavigate }: UserProfilePageProps) => {
    const { user, logout, loading: authLoading } = useAuth();

    const [formData, setFormData] = useState<UserProfileFormData>({
        nombre: "",
        apellidos: "",
        email: "",
        direccion: "",
        region: "",
        comuna: "",
        genero: "",
    });

    const [loading, setLoading] = useState(true);

    const [passwordData, setPasswordData] = useState<ChangePasswordDTO>({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [deletePassword, setDeletePassword] = useState("");
    const [, setErrors] = useState<Record<string, string>>({});


    useEffect(() => {
        if (authLoading) return;
        if (!user?.id) {
            toast.error("Debes iniciar sesión para ver tu perfil.");
            onNavigate("login");
            return;
        }

        const loadProfile = async () => {
            try {
                const fullUser = await UserService.getUserById(user.id);
                setFormData({
                    nombre: fullUser.nombre ?? "",
                    apellidos: fullUser.apellidos ?? "",
                    email: user.email ?? "",
                    direccion: fullUser.direccion ?? "",
                    region: fullUser.region ?? "",
                    comuna: fullUser.comuna ?? "",
                    genero: fullUser.genero ?? "SIN_ESPECIFICAR",
                });
            } catch (error) {
                toast.error("No se pudo cargar la información del usuario");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user, authLoading, onNavigate]);

    const comunasDisponibles = useMemo(
        () => regiones.find((r) => r.nombre === formData.region)?.comunas || [],
        [formData.region]
    );


    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.nombre) newErrors.nombre = "Nombre obligatorio";
        if (!formData.apellidos) newErrors.apellidos = "Apellidos obligatorios";
        if (!formData.direccion) newErrors.direccion = "Dirección obligatoria";
        if (!formData.region) newErrors.region = "Selecciona una región";
        if (!formData.comuna) newErrors.comuna = "Selecciona una comuna";
        if (!formData.genero) newErrors.genero = "Selecciona un género";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.id) return;

        if (!validate()) {
        toast.error("Completa los campos obligatorios");
        return;
        }

        const payload: UserUpdateDTO = {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        direccion: formData.direccion,
        region: formData.region,
        comuna: formData.comuna,
        genero: formData.genero as Genero,
        };

        try {
        await UserService.updateUser(user.id, payload);
        toast.success("Información actualizada correctamente");
        } catch {
        toast.error("No se pudo actualizar la información");
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.id) return;

        if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmNewPassword
        ) {
        toast.error("Completa todos los campos");
        return;
        }

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
        }

        try {
        await UserService.changePassword(user.id, passwordData);
        toast.success("Contraseña actualizada correctamente");

        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
        } catch {
        toast.error("Contraseña actual incorrecta");
        }
    };

    const handleDeleteAccount = async () => {
        if (!user?.id) return;

        if (!deletePassword) {
        toast.error("Debes ingresar tu contraseña");
        return;
        }

        const confirmed = confirm(
        "¿Estás segura de eliminar tu cuenta? Esta acción no se puede deshacer."
        );

        if (!confirmed) return;

        try {
            const payload: DeleteAccountDTO = {
                password: deletePassword,
            };
            await UserService.deleteUser(user.id, payload);
            toast.success("Cuenta eliminada correctamente");
            logout();
            onNavigate("home");
        } catch {
            toast.error(
                "No se pudo eliminar la cuenta. Verifica tu contraseña."
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-2 text-[var(--neon-green)]">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Cargando tu perfil...</span>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
            <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            className="mb-6 text-[var(--neon-green)] hover:text-[var(--neon-purple)]"
            >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
            </Button>

            <div className="text-center mb-8">
            <h1 className="text-4xl mb-2 text-[var(--neon-green)]">
                Configuración de Cuenta
            </h1>
            <p className="text-gray-400">Administra tu información y seguridad</p>
            </div>

            {/* MIS DATOS */}
            <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <label className="text-gray-300 mb-2 block">Nombre</label>
                        <Input value={formData.nombre} onChange={e => setFormData(f => ({ ...f, nombre: e.target.value }))} className="bg-[#1a1a1a] border-gray-700 text-white" />
                    </div>
                    <div className="relative">
                        <label className="text-gray-300 mb-2 block">Apellidos</label>
                        <Input value={formData.apellidos} onChange={e => setFormData(f => ({ ...f, apellidos: e.target.value }))} className="bg-[#1a1a1a] border-gray-700 text-white" />
                    </div>
                </div>

                <div>
                    <label className="text-gray-300 mb-2 block">Correo Electrónico</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input type="email" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} className="pl-10 bg-[#1a1a1a] border-gray-700 text-white" />
                    </div>
                </div>

                <div>
                    <label className="text-gray-300 mb-2 block">Dirección</label>
                    <Input value={formData.direccion} onChange={e => setFormData(f => ({ ...f, direccion: e.target.value }))} placeholder="Ej: Av. Siempreviva 742" className="bg-[#1a1a1a] border-gray-700 text-white" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-gray-300 mb-2 block">Región</label>
                        <Select
                            value={formData.region}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value, comuna: "" }))}
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
                    </div>
                    <div>
                        <label className="text-gray-300 mb-2 block">Comuna</label>
                        <Select
                            value={formData.comuna}
                            onValueChange={(value) => setFormData(f => ({ ...f, comuna: value }))}
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
                    </div>
                </div>

                <div>
                    <label className="text-gray-300 mb-2 block">Género</label>
                    <select
                        value={formData.genero}
                        onChange={e => setFormData(f => ({ ...f, genero: e.target.value as Genero }))}
                        className="w-full p-2 bg-[#1a1a1a] border border-gray-700 text-white rounded-md h-10"
                    >
                        <option value="SIN_ESPECIFICAR">Sin especificar</option>
                        <option value="FEMENINO">Femenino</option>
                        <option value="MASCULINO">Masculino</option>
                    </select>
                </div>

                <Button
                type="submit"
                className="w-full bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
                >
                <UserCog className="w-5 h-5 mr-2" />
                Guardar cambios
                </Button>
            </form>
            </div>

            {/* CAMBIAR CONTRASEÑA */}
            <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-8 mt-10">
            <h2 className="text-2xl mb-6 text-[var(--neon-green)] flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Cambiar contraseña
            </h2>

            <form onSubmit={handlePasswordChange} className="space-y-6">
                <Input
                type="password"
                placeholder="Contraseña actual"
                value={passwordData.currentPassword}
                onChange={(e) =>
                    setPasswordData((p) => ({
                    ...p,
                    currentPassword: e.target.value,
                    }))
                }
                className="bg-[#1a1a1a] border-gray-700 text-white"
                />

                <Input
                type="password"
                placeholder="Nueva contraseña"
                value={passwordData.newPassword}
                onChange={(e) =>
                    setPasswordData((p) => ({
                    ...p,
                    newPassword: e.target.value,
                    }))
                }
                className="bg-[#1a1a1a] border-gray-700 text-white"
                />

                <Input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={passwordData.confirmNewPassword}
                onChange={(e) =>
                    setPasswordData((p) => ({
                    ...p,
                    confirmNewPassword: e.target.value,
                    }))
                }
                className="bg-[#1a1a1a] border-gray-700 text-white"
                />

                <Button
                type="submit"
                className="w-full bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
                >
                Guardar nueva contraseña
                </Button>

                <Button
                type="button"
                variant="ghost"
                onClick={() =>
                    toast.info(
                    "Si no recuerdas tu contraseña, puedes recuperarla desde la pantalla de inicio de sesión."
                    )
                }
                className="w-full text-gray-400 hover:text-[var(--neon-green)]"
                >
                <HelpCircle className="w-4 h-4 mr-2" />
                ¿No recuerdas tu contraseña?
                </Button>
            </form>
            </div>

            {/* ELIMINAR CUENTA */}
            <div className="bg-[#111] border border-red-600 rounded-lg p-8 mt-10">
            <h2 className="text-2xl mb-4 text-red-500">Eliminar cuenta</h2>

            <Input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="bg-[#1a1a1a] border-gray-700 text-white mb-4"
            />

            <Button
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white hover:bg-red-700"
            >
                Eliminar cuenta permanentemente
            </Button>
            </div>
        </div>
        </div>
    );
};
