"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";

interface Post {
  _id: string;
  autor: {
    nombre: string;
    imagenPerfil: string;
  };
  body: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]); // Estado para las publicaciones
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Publicaciones predeterminadas (estáticas)
  const defaultPosts = [
    { 
      _id: 'default-1',
      autor: { nombre: 'Jane Smith', imagenPerfil: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
      body: 'Just launched my new project! 🚀 #coding #webdev',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'default-2',
      autor: { nombre: 'Alex Johnson', imagenPerfil: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
      body: 'Beautiful day for coding outside ☀️ #programming',
      createdAt: new Date().toISOString(),
    },
  ];

  // Obtener publicaciones desde el backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post'); // Ruta del backend
        const backendPosts = response.data; // Suponiendo que devuelve un array
        setPosts([...defaultPosts, ...backendPosts]); // Combinar predeterminados con backend
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts(defaultPosts); // Fallback a las publicaciones predeterminadas
      } finally {
        setLoading(false); // Cambiar el estado de carga
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
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
            key={post._id}
            author={post.autor?.nombre || 'Anonymous'}
            avatar={post.autor?.imagenPerfil || '/default-profile.png'}
            content={post.body || 'No content available'}
            timestamp={post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown time'}
          />
          ))}
        </div>
      </div>
    </div>
  );
}

