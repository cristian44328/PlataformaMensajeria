import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from "../schemas/auth";
import { useEffect } from "react";


function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    },
    );
    const { signin, errors: loginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onsubmit = (data) => signin(data);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/chats");
        }
    }, [isAuthenticated]);

    return (
        <div className="w-full h-screen flex items-center justify-center tracking-wider">
            <div className="w-11/12 sm:w-5/12 md:w-3/12 text-sm glass">
                <div className="w-full text-center my-3">
                    <h2 className="text-2xl text-black font-medium">Iniciar Sesion</h2>
                </div>
                {
                    loginErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white my-1" key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={handleSubmit(onsubmit)} className="my-2">

                    <div className="flex flex-col mx-5 my-7">
                        <div className="flex border-b-black border-b-2 py-1">
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-11/12 bg-transparent outline-none placeholder-black text-black" // Añadido text-black
                                placeholder="Ingresa tu correo electrónico"
                            />
                            <div className="w-2/12 flex items-center justify-center">
                                <i className="fa-solid fa-envelope text-black text-xl"></i> {/* Icono con color negro */}
                            </div>
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-2">Correo electrónico requerido</p>
                        )}
                    </div>

                    <div className="flex flex-col mx-5 my-7">
                        <div className="flex border-b-black border-b-2 py-1">
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className="w-11/12 bg-transparent outline-none placeholder-black text-black" // Añadido text-black
                                placeholder="Contraseña nueva"
                            />
                            <div className="w-2/12 flex items-center justify-center">
                                <i className="fa-solid fa-lock text-black text-xl"></i> {/* Icono con color negro */}
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-2">Contraseña requerida</p>
                        )}
                    </div>

                    <div className="mx-5 my-7 py-2">
                        <button className="bg-black w-full h-[35px] rounded-sm text-white">
                            Iniciar Sesion
                        </button>
                    </div>
                    <Link to="/register" className="mx-5 my-5 py-2 flex items-center justify-center">
                        <p className="text-sm text-black">No tienes cuenta? / Registrarte</p> {/* Color negro para el texto */}
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default LoginPage