"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PostFeed from "./PostFeed";
import NavHeader from "./NavHeader";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* NavHeader Section */}
      <NavHeader user={user || { name: "Guest", email: "guest@example.com", imageProfile: "/default-profile.png" }} />

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <PostFeed user={user} />
      </main>
    </div>
  );
}

interface User {
  _id: string;
  name: string;
  email: string;
  imageProfile?: string;
}



