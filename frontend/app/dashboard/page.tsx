'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import PostFeed from "./PostFeed";
import ProfileSection from "../profile/ProfileSection";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          const { _id, name, email, imageProfile } = response.data;
          setUser({ _id, name, email, imageProfile });
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
            {/* Post Feed */}
            <PostFeed user={user} />
          </main>
        </div>
      </div>
    </div>
  );
}

interface User {
  _id: string;
  name: string;
  email: string;
  imageProfile?: string;
}



