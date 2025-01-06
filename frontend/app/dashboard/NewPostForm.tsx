'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define los tipos de los props
interface NewPostFormProps {
  onPostCreated: (post: { body: string; _id: string }) => void; // El post debe tener body y _id
  user: {
    _id: string;  // El user debe tener un _id
    name: string;
    imageProfile: string;
  };
}  

// Especifica el tipo de los props en el componente
export default function NewPostForm({ onPostCreated, user }: NewPostFormProps) {
  const [postText, setPostText] = useState<string>("");  // El estado debe tener tipo string
  const [loading, setLoading] = useState<boolean>(false);  // El estado debe tener tipo booleano
  const [error, setError] = useState<string>("");  // El estado de error debe ser string
  const router = useRouter();

  // El tipo del evento en el cambio de texto debe ser React.ChangeEvent<HTMLTextAreaElement>
  const handlePostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  // Cambiar el tipo de evento a FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Esto es necesario para prevenir el comportamiento por defecto de un formulario
    const token = localStorage.getItem("token");

    // Verificar si hay token y si el usuario está presente
    if (!token || !user) {
      setError("User not authenticated");
      return;
    }

    // Verificar que el texto de la publicación no esté vacío
    if (!postText.trim()) {
      setError("Post content cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError(""); // Reset error

      const response = await axios.post(
        "http://localhost:5000/post",
        {
          body: postText,
          autor: user._id, // Asegúrate de que el user tenga un _id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onPostCreated(response.data); // Llamamos al callback del dashboard
        setPostText(""); // Limpiamos el campo del formulario
      } else {
        setError("Failed to create post");
      }
    } catch (error) {
      setError("An error occurred while creating the post");
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mb-6 rounded-lg shadow-lg">
      <h3> What's on your mind?</h3>
      <form onSubmit={handleSubmit}>  {/* Usamos onSubmit en el formulario */}
        <textarea
          placeholder="What's on your mind?"
          value={postText}
          onChange={handlePostTextChange}
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={loading || !postText.trim()}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}




