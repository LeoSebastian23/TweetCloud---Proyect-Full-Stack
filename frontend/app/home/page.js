export default function Home() {
    return (
      <div className="text-center py-10">
        <h2 className="text-4xl font-bold mb-4">¡Bienvenido a TweetCloud!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Comparte tus pensamientos, conecta con el mundo.
        </p>
        <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Ver Publicaciones
        </Link>
      </div>
    );
  }
  