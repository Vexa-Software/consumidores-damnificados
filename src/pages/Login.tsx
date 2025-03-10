import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa"; 


const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

   
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

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
            const user = await signInWithEmailAndPassword(auth, email, password);

            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            if (user) {
                navigate("/admin/noticias");
            }
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

    const handleForgotPassword = async () => {
        console.log("handleForgotPassword se está ejecutando");

        if (!isValidEmail(email)) {
            toast.error("Por favor, ingresa un email válido para restablecer tu contraseña.");
            return;
        }

        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            console.log("Métodos de autenticación para este email:", methods);

            if (methods.length === 0) {
                toast.error("Este correo no está registrado en el sistema.");
                return;
            }

            await sendPasswordResetEmail(auth, email);
            toast.success("Correo de restablecimiento enviado. Revisa tu bandeja de entrada.");
        } catch (error: any) {
            console.error("Error al verificar el email:", error);

            if (error.code === "auth/user-not-found") {
                toast.error("Este correo no está registrado en Firebase.");
            } else {
                toast.error("Ocurrió un error al intentar restablecer la contraseña.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white py-24 px-8">
            <div className='columnaLogo mb-16'>
                <img
                    src="/assets/img/consumidores-damnificados/consulogo.png"
                    alt="Logo"
                    className='w-full h-full object-contain'
                />
            </div>

            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-center text-sky-500">
                Bienvenido
            </h1>
            <p className="text-center 2xl:text-xl py-4">
                Ingresa tu email y contraseña para acceder a tu cuenta
            </p>

            <div className="bg-white rounded-lg w-[75%] max-w-2xl mt-8">
                <form className="mt-6 xl:px-8 pb-6" onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block mb-2 text-sky-500 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sky-500 font-medium">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                    </div>


                    <div className="flex items-center mb-6">
                        <input
                            id="rememberMe"
                            type="checkbox"
                            className="mr-2"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe" className="text-gray-600 text-sm">
                            Recordarme
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#0EA5E9] text-white py-2 rounded-lg hover:bg-[#2498ce] transition disabled:opacity-50 flex items-center justify-center pr-6"
                        disabled={loading}
                    >
                        <FaSignInAlt size={18} className="mr-2" />
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </button>


                    <button
                        type="button"
                        className="w-full mt-4 text-sm text-sky-500 hover:underline"
                        onClick={handleForgotPassword}
                    >
                        Olvidé mi contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
