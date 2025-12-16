import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, UserCog } from "lucide-react";
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
    import { toast } from "sonner";
    import { UserService } from "@/remote/service/User/UserService";
    import { useAuth } from "@/contexts/AuthContext";
import type { UserUpdateDTO } from "@/remote/DTO/UserDTO";

    export type Genero = "FEMENINO" | "MASCULINO" | "SIN_ESPECIFICAR";

    interface UserProfileFormData {
    nombre: string;
    apellidos: string;
    direccion: string;
    region: string;
    comuna: string;
    genero: Genero | "";
    }

    interface UserProfilePageProps {
    onNavigate: (page: string) => void;
    }

    export const UserProfilePage = ({ onNavigate }: UserProfilePageProps) => {
    const { user, logout } = useAuth();

    const [formData, setFormData] = useState<UserProfileFormData>({
        nombre: "",
        apellidos: "",
        direccion: "",
        region: "",
        comuna: "",
        genero: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const comunasDisponibles = useMemo(
        () => regiones.find((r) => r.nombre === formData.region)?.comunas || [],
        [formData.region]
    );

    useEffect(() => {
        if (!user?.email) return;

        const loadProfile = async () => {
            try {
            const fullUser = await UserService.getByEmail(user.email);

            setFormData({
                nombre: fullUser.nombre ?? "",
                apellidos: fullUser.apellidos ?? "",
                direccion: fullUser.direccion ?? "",
                region: fullUser.region ?? "",
                comuna: fullUser.comuna ?? "",
                genero: fullUser.genero ?? "SIN_ESPECIFICAR",
            });
            } catch {
            toast.error("No se pudo cargar la información del usuario");
            }
        };

        loadProfile();
    }, [user]);

    const handleChange = (key: keyof UserProfileFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
        });
    };

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

        if (!user?.email) {
            toast.error("Usuario no autenticado");
            return;
        }

        if (!validate()) {
            toast.error("Completa los campos obligatorios");
            return;
        }

        const payload: UserUpdateDTO = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            direccion: formData.direccion,
            region: formData.region,
            comuna: formData.comuna,
            genero: formData.genero as Genero,
        };

        try {
            const fullUser = await UserService.getByEmail(user.email);

            await UserService.updateUser(fullUser.id, payload);

            toast.success("Información actualizada correctamente");
        } catch {
            toast.error("No se pudo actualizar la información");
        }
    };

    const handleDeleteAccount = async () => {
        if (!user?.email) {
            toast.error("Usuario no autenticado");
            return;
        }

        const confirmed = confirm(
            "¿Estás segura de eliminar tu cuenta? Esta acción no se puede deshacer."
        );

        if (!confirmed) return;

        try {
            const fullUser = await UserService.getByEmail(user.email);

            await UserService.deleteUser(fullUser.id);

            toast.success("Cuenta eliminada");
            logout();
            onNavigate("home");
        } catch {
            toast.error("No se pudo eliminar la cuenta");
        }
    };

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
            <h1 className="text-4xl mb-2 text-[var(--neon-green)]">Configuración de Cuenta</h1>
            <p className="text-gray-400">Actualiza tus datos personales</p>
            </div>

            <div className="bg-[#111] border border-[var(--neon-green)] rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    {errors.apellidos && <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>}
                </div>

                <div>
                    <label className="text-gray-300 mb-2 block">Dirección *</label>
                    <Input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => handleChange("direccion", e.target.value)}
                    className="bg-[#1a1a1a] border-gray-700 text-white"
                    />
                    {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
                </div>

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
                    {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero}</p>}
                </div>

                <div>
                    <label className="text-gray-300 mb-2 block">Región *</label>
                    <Select
                    value={formData.region}
                    onValueChange={(value: string) =>
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
                    {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
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
                    {errors.comuna && <p className="text-red-500 text-sm mt-1">{errors.comuna}</p>}
                </div>
                </div>

                <Button
                type="submit"
                className="w-full bg-[var(--neon-green)] text-black hover:bg-[var(--neon-purple)] hover:text-white"
                >
                <UserCog className="w-5 h-5 mr-2" />
                Guardar cambios
                </Button>

                <Button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full mt-4 bg-red-600 text-white hover:bg-red-700"
                >
                Eliminar cuenta
                </Button>
            </form>
            </div>
        </div>
        </div>
    );
};
