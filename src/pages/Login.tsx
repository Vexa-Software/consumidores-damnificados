import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            toast.error("Por favor, ingresa un email válido.");
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Inicio de sesión exitoso");
            navigate("/avisos-judiciales-admin");
        } catch (error: any) {
            let errorMessage = "Error al iniciar sesión";
            if (error.code === 'auth/user-not-found') {
                errorMessage = "Usuario no encontrado";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Contraseña incorrecta";
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white">
            {/* Header minimalista con logo y título centrado */}
            <div className="relative w-full bg-[#f7f7f7] border border-[#0EA5E9] py-6 px-12 sm:px-24 2xl:py-4 2xl:px-[13%] flex flex-row justify-between items-center">
                {/* Logo alineado a la izquierda */}
                <img
                    src="/assets/img/consumidores-damnificados/consulogo.png"
                    alt="Consumidores Damnificados"
                    className="w-[60%] h-auto lg:w-[30%] 2xl:w-[30%] 2xl:h-auto"
                />
                 {/* Texto "ADMIN PANEL" centrado */}
                 <h1 className="text-center 2xl:my-4 text-black text-[60%] sm:text-lg lg:text-lg 2xl:text-2xl font-medium sm:font-semibold">
                    Panel de Administracion
                </h1>
            </div>

            {/* Contenedor de Login */}
            <div className="bg-white shadow-2xl rounded-lg w-[75%] 2xl:w-full max-w-md mt-8 2xl:mt-20">
               
                <div className="bg-sky-500 w-full rounded-t-lg py-2">
                    <h2 className="text-lg 2xl:text-2xl font-bold text-center text-white">Iniciar Sesión</h2>
                </div>
                <form className="mt-6 2xl:mt-8 px-8 pb-6 2xl:pb-10" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Correo electronico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    

                    <button
                        type="submit"
                        className="w-full bg-[#0EA5E9] text-white py-2 rounded-lg hover:bg-[#2498ce] transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Ingresar"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
