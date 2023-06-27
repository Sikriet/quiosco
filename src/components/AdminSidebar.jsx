import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminSidebar() {

    // Asignarle "auth" al middleware para temas de validaciones
    const { logout } = useAuth({middleware: 'auth'});

    return (
        <aside className="md:w-72 h-screen">
            {/* Contenedor Principal */}
            <div className="p-4">
                {/* Logo */}
                <img
                    src="/img/logo.svg"
                    alt="imagen logotipo"
                    className="w-40"
                />
            </div>

            {/* Navegación */}
            <nav className='flex flex-col p-4'>
                {/* Enlace a la página "Ordenes" */}
                <Link to="/admin" className='font-bold text-lg'>Ordenes</Link>
                {/* Enlace a la página "Productos" */}
                <Link to="/admin/productos" className='font-bold text-lg'>Productos</Link>
            </nav>

            {/* Botón de Cerrar Sesión */}
            <div className='my-5 px-5'>
                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate hover:bg-red-600"
                    onClick={logout}
                >
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    )
}
