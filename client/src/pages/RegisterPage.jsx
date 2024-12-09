import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    const onsubmit = handleSubmit(async (values) => {
        //console.log(values);
        signup(values);
    });

    return (
        <div className='w-full h-screen flex items-center justify-center tracking-wider'>
            <div className='w-11/12 sm:w-5/12 md:w-3/12 text-sm glass'>
                <div className='w-full text-center my-3'>
                    <h2 className='text-2xl text-black font-medium'>Crea una cuenta</h2>
                </div>
                {
                    registerErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={handleSubmit(onsubmit)} className="my-2">
                    <div className="flex flex-col mx-5 my-7">
                        <div className="flex border-b-black border-b-2 py-1">
                            <input
                                type="text"
                                {...register("username", { required: true })}
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                placeholder="Ingresa tu nombre"
                            />
                            <div className="w-2/12 flex items-center justify-center">
                                <i className="fa-solid fa-user text-xl"></i>
                            </div>
                        </div>
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-2">Nombre de usuario requerido</p>
                        )}
                    </div>

                    <div className="flex flex-col mx-5 my-7">
                        <div className="flex border-b-black border-b-2 py-1">
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                placeholder="Ingresa tu correo electrónico"
                            />
                            <div className="w-2/12 flex items-center justify-center">
                                <i className="fa-solid fa-envelope text-xl"></i>
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
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                placeholder="Contraseña nueva"
                            />
                            <div className="w-2/12 flex items-center justify-center">
                                <i className="fa-solid fa-lock text-xl"></i>
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-2">Contraseña requerida</p>
                        )}
                    </div>

                    <div className="mx-5 my-7 py-2">
                        <button className="bg-black w-full h-[35px] rounded-sm text-white">
                            Registrarte
                        </button>
                    </div>
                    <Link to="/login" className="mx-5 my-5 py-2 flex items-center justify-center">
                        <p className="text-sm">Ya tienes cuenta? / Iniciar Sesión</p>
                    </Link>
                </form>

            </div>
        </div>
    )
}

export default RegisterPage