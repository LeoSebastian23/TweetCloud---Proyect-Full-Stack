'use client';

import { useState } from "react";
import axios from "axios";

interface Post {
  _id: string;
  body: string;
  autor: {
    name: string;
    imageProfile: string;
  };
  createdAt: string;
}

interface NewPostFormProps {
  onPostCreated: (post: Post) => void;
}

export default function NewPostForm({ onPostCreated }: NewPostFormProps) {
  const [postText, setPostText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const MAX_CHAR_COUNT = 280;

  const handlePostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHAR_COUNT) {
      setPostText(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
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
        { body: postText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        onPostCreated(response.data);
        setPostText("");
      } else {
        setError("Failed to create post");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
      <h3>What's on your mind?</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={postText}
          onChange={handlePostTextChange}
          placeholder="What's on your mind?"
          className="w-full p-2 mt-1 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-600"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {postText.length}/{MAX_CHAR_COUNT}
        </p>
        <button
          type="submit"
          className="px-6 py-1 bg-emerald-500 text-white rounded-lg"
          disabled={loading || !postText.trim()}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}






