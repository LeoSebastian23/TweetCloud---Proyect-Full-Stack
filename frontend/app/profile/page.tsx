"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProfileSection from "../dashboard/ProfileSection";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Objeto de usuario por defecto en caso de que no haya datos
  const defaultUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    imageProfile: "/default-profile.png",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Siempre mostramos ProfileSection, incluso si no hay datos de usuario */}
        <ProfileSection user={user || defaultUser} />
      </div>
    </div>
  );
};

export default ProfilePage;
