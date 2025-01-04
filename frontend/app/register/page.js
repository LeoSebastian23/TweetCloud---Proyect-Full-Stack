import Link from 'next/link';

export default function Register() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className=" p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
          <form>
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Tu nombre"
            />
            <label className="block mb-2 text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="tuemail@example.com"
            />
            <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="••••••••"
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Registrarse
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            ¿Ya tienes una cuenta? <Link href="/login" className="text-blue-600 hover:underline">Inicia Sesión</Link>.
          </p>
        </div>
      </div>
    );
  }
  