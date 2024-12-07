
function LoginPage() {
    return (
        <div className='w-full h-screen flex items-center justify-center tracking-wider'>
            <div className='w-11/12 sm:w-5/12 md:w-3/12 text-sm glass'>
                <div className='w-full text-center my-3'>
                    <h2 className='text-2xl text-black font-medium'>Iniciar sesion</h2>
                </div>
                <form action="" className='my-2'>

                    <div className='flex border-b-black border-b-2 mx-5 my-7 py-1'>
                        <input
                            type="email"
                            className='w-11/12 bg-transparent outline-none placeholder-black'
                            placeholder='Corrreo electronico'
                        />
                        <div className='w-2/12 flex items-center justify-center'>
                            <i class="fa-solid fa-envelope text-xl"></i>
                        </div>
                    </div>

                    <div className='flex border-b-black border-b-2 mx-5 my-7 py-1'>
                        <input
                            type="password"
                            className='w-11/12 bg-transparent outline-none placeholder-black'
                            placeholder='Contraeña'
                        />
                        <div className='w-2/12 flex items-center justify-center'>
                            <i class="fa-solid fa-lock text-xl"></i>
                        </div>
                    </div>

                    <div className='mx-5 my-7 py-2'>
                        <button className='bg-black w-full h-[35px] rounded-sm text-white'>Iniciar sesion</button>
                    </div>
                    <div className='mx-5 my-5 py-2 flex items-center justify-center'>
                        <p className='text-sm'>No tienes cuenta? / Registrarte</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage