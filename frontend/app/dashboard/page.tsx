'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import PostFeed from "./PostFeed";
import ProfileSection from "./ProfileSection"; // Asegúrate de que ProfileSection esté importado

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Agrega un estado de carga
  const [error, setError] = useState(null); // Agrega un estado de error

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false); // Si no hay token, dejamos de cargar
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          // Filtramos el usuario correcto, por ejemplo, por email o id
          const loggedInUser = response.data.find((user: any) => user.email === "juan.perez@example.com"); // Aquí deberías usar el email del usuario logueado
          if (loggedInUser) {
            setUser(loggedInUser); // Establece el usuario logueado
          } else {
            setError("User not found");
          }
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Cambia el estado de carga a false después de intentar obtener los datos
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Muestra un error si la solicitud falla
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
        {/* Tu barra de navegación */}
      </nav>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Section - Mostrar el perfil si hay usuario */}
          {user ? <ProfileSection user={user} /> : <p>No user found</p>}

          {/* Main Content Section */}
          <main className="w-full md:w-9/12">
            {/* Post Feed */}
            <PostFeed />
          </main>
        </div>
      </div>
    </div>
  );
}





