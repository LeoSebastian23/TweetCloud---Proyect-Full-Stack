import Link from 'next/link';

export default function Login() {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
          <form>
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
              Iniciar Sesión
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            ¿No tienes una cuenta? <Link href="/register" className="text-blue-600 hover:underline">Regístrate</Link>.
          </p>
        </div>
      </div>
    );
  }
  