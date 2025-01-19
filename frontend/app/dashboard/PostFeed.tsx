"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import NewPostForm from "./NewPostForm"; // Asegúrate de importar tu formulario de nueva publicación

interface User {
  _id: string;
  name: string;
  email: string;
  imageProfile?: string;
}

interface Post {
  _id: string;
  autor: {
    name: string;
    imageProfile: string;
  };
  body: string;
  createdAt: string;
}

export default function PostFeed({ user }: { user: User | null }) {
  const [posts, setPosts] = useState<Post[]>([]); // Estado para las publicaciones
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error


  const handleNewPost = async (newPost: Post) => {
    try {
      // Agrega la nueva publicación al inicio y ordena las publicaciones
      const updatedPosts = [newPost, ...posts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );      

      // Sincroniza con el backend
      const response = await axios.get("http://localhost:5000/post");
      const backendPosts = response.data.map((post: any) => ({
        _id: post._id,
        autor: {
          name: post.autor?.name || "Anonymous",  // Accede a name directamente
          email: post.autor?.email || "No email",  // Agrega el email si lo necesitas
          imageProfile: post.autor?.imageProfile || "/default-profile.png",  // Accede a imageProfile
        },
        body: post.body || "No content available",
        createdAt: post.createdAt || new Date().toISOString(),
      }));
      
      // Combina y elimina publicaciones duplicadas
      const uniquePosts = [...updatedPosts, ...backendPosts].filter(
        (post, index, self) => index === self.findIndex((p) => p._id === post._id)
      );

      // Vuelve a ordenar las publicaciones
      uniquePosts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setPosts(uniquePosts);
      console.log('Posts recibidos:', uniquePosts);
    } catch (error) {
      console.error("Error updating posts:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/post");
        const backendPosts = response.data.map((post: any) => ({
          _id: post._id,
          autor: {
            name: post.autor?.name || "Anonymous",
            imageProfile: post.autor?.imageProfile || "/default-profile.png",
          },
          body: post.body || "No content available",
          createdAt: post.createdAt || new Date().toISOString(),
        }));
  
        // Solo se agregan las publicaciones del backend
        setPosts(backendPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later.");
        setPosts([]); // Si no hay posts, mejor no mostrar nada en lugar de los predeterminados.
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  

  // Log para identificar claves duplicadas (opcional para depuración)
  useEffect(() => {
    const duplicatedKeys = posts
      .map((post) => post._id)
      .filter((id, index, self) => self.indexOf(id) !== index);

    if (duplicatedKeys.length > 0) {
      console.error("Duplicated keys found:", duplicatedKeys);
    }
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-xl text-gray-800 dark:text-white">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Formulario de nueva publicación */}
        {user ? (
          <NewPostForm onPostCreated={handleNewPost} user={user} />
        ) : (
          <p>Please log in to post.</p>
        )}

        <div className="space-y-4 mt-6">
          {posts.map((post, index) => (
            <PostCard
              key={`${post._id}-${index}`} // Combina el ID con el índice para garantizar unicidad
              author={post.autor?.name || "Anonymous"}
              avatar={post.autor?.imageProfile || "/default-profile.png"}
              content={post.body || "No content available"}
              timestamp={
                post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : "Unknown time"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}


