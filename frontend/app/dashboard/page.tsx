'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import PostFeed from "./PostFeed";
import ProfileSection from "../profile/ProfileSection";
import NewPostForm from "./NewPostForm";

export default function DashboardPage() {
  const [user, setUser] = useState<{ _id: string; name: string; imageProfile: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]); // Estado para las publicaciones

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setError("User not authenticated");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUser(response.data); // Guarda los datos del usuario logueado
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Función para agregar una nueva publicación al estado
  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // Añadir la nueva publicación al inicio del feed
  };

  if (loading) {
    return <div className="text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
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
            {/* Formulario para nueva publicación */}
            <NewPostForm onPostCreated={handleNewPost} user={user} />

            {/* Post Feed */}
            <PostFeed posts={posts} />
          </main>
        </div>
      </div>
    </div>
  );
}






