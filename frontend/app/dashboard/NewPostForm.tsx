'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  body: string;
  autor: {
    nombre: string;
    imagenPerfil: string;
  };
  createdAt: string;
}

interface NewPostFormProps {
  onPostCreated: (post: Post) => void;
  user: {
    _id: string;
    name: string;
    imageProfile?: string;
  };
}

export default function NewPostForm({ onPostCreated, user }: NewPostFormProps) {
  const [postText, setPostText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>(""); // Para mensajes de éxito
  const router = useRouter();

  const MAX_CHAR_COUNT = 280;

  const handlePostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHAR_COUNT) {
      setPostText(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token || !user) {
      setError("User not authenticated");
      return;
    }

    if (!postText.trim()) {
      setError("Post content cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/post",
        {
          body: postText,
          autor: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onPostCreated(response.data);
        setPostText("");
        setSuccess("Post created successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to create post");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred while creating the post"
      );
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
      <h3>What's on your mind?</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          aria-label="Write your post"
          placeholder="What's on your mind?"
          value={postText}
          onChange={handlePostTextChange}
          className="w-full p-2 mt-1 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {postText.length}/{MAX_CHAR_COUNT}
        </p>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={loading || !postText.trim()}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </div>
  );
}

