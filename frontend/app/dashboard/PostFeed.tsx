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
    nombre: string;
    imagenPerfil: string;
  };
  body: string;
  createdAt: string;
}


export default function PostFeed({ user }: { user: User | null }) {
  const [posts, setPosts] = useState<Post[]>([]); // Estado para las publicaciones
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  const defaultPosts: Post[] = [
    {
      _id: "default-1",
      autor: {
        nombre: "Jane Smith",
        imagenPerfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      body: "Just launched my new project! 🚀 #coding #webdev",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "default-2",
      autor: {
        nombre: "Alex Johnson",
        imagenPerfil: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
      body: "Beautiful day for coding outside ☀️ #programming",
      createdAt: new Date().toISOString(),
    },
  ];

const handleNewPost = async (newPost: Post) => {
  try {
    // Agrega la nueva publicación al inicio y ordena las publicaciones
    const updatedPosts = [newPost, ...posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setPosts(updatedPosts);

    // Sincroniza con el backend
    const response = await axios.get("http://localhost:5000/post");
    const backendPosts = response.data.map((post: any) => ({
      _id: post._id,
      autor: {
        nombre: post.autor?.nombre || "Anonymous",
        imagenPerfil: post.autor?.imagenPerfil || "/default-profile.png",
      },
      body: post.body || "No content available",
      createdAt: post.createdAt || new Date().toISOString(),
    }));

    // Vuelve a ordenar las publicaciones después de sincronizar con el backend
    const allPosts = [...updatedPosts, ...backendPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setPosts(allPosts);
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
            nombre: post.autor?.nombre || "Anonymous",
            imagenPerfil: post.autor?.imagenPerfil || "/default-profile.png",
          },
          body: post.body || "No content available",
          createdAt: post.createdAt || new Date().toISOString(),
        }));
        // Ordenar las publicaciones por fecha de creación (más recientes primero)
        const allPosts = [...defaultPosts, ...backendPosts].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later.");
        setPosts(defaultPosts);
      } finally {
        setLoading(false);
      }
    };    
    fetchPosts();
  }, []);
  

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
          {posts.map((post) => (
            <PostCard
              key={post._id}
              author={post.autor?.nombre || "Anonymous"}
              avatar={post.autor?.imagenPerfil || "/default-profile.png"}
              content={post.body || "No content available"}
              timestamp={post.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown time"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

