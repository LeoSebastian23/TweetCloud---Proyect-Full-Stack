"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa el hook useRouter
import Link from "next/link";
import { Cloud, Github } from "lucide-react";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(""); // Estado para el mensaje de éxito/error
  const router = useRouter(); // Inicializa el hook useRouter
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      ); // Ajusta la URL según tu backend
      if (response.status === 201) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/"); // Redirige a la página de login
        }, 2000); // Espera 2 segundos antes de redirigir
      } else {
        setMessage("Registration failed: " + response.data.message);
      }
    } catch (error) {
      // Refinar el tipo del error
      if (axios.isAxiosError(error)) {
        // Si el error es específico de Axios
        setMessage(`An error occurred during registration: ${error.response?.data?.message || error.message}`);
      } else if (error instanceof Error) {
        // Si es otro tipo de error
        setMessage(`An unexpected error occurred: ${error.message}`);
      } else {
        // Si no se puede determinar el tipo del error
        setMessage("An unknown error occurred.");
      }
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const goBack = () => {
    router.back(); // Llama al método back() para ir a la página anterior
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mountainMeadow-50 to-mountainMeadow-900 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center p-4">
          <div className="flex items-center justify-center">
            <Cloud className="h-8 w-8 text-mountainMeadow-500 dark:text-mountainMeadow-400" />
            <h2 className="text-3xl ml-2 text-mountainMeadow-600 dark:text-mountainMeadow-200">
              Create Account
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-mountainMeadow-700 dark:text-mountainMeadow-300"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-mountainMeadow-700 dark:text-mountainMeadow-300 dark:bg-gray-900 dark:border-gray-700 focus:ring-mountainMeadow-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-mountainMeadow-700 dark:text-mountainMeadow-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-mountainMeadow-700 dark:text-mountainMeadow-300 dark:bg-gray-900 dark:border-gray-700 focus:ring-mountainMeadow-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-mountainMeadow-700 dark:text-mountainMeadow-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-mountainMeadow-700 dark:text-mountainMeadow-300 dark:bg-gray-900 dark:border-gray-700 focus:ring-mountainMeadow-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-mountainMeadow-700 dark:text-mountainMeadow-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-mountainMeadow-700 dark:text-mountainMeadow-300 dark:bg-gray-900 dark:border-gray-700 focus:ring-mountainMeadow-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-mountainMeadow-500 text-white font-semibold rounded-md hover:bg-mountainMeadow-600 focus:outline-none focus:ring-2 focus:ring-mountainMeadow-500"
          >
            Sign Up
          </button>

          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-mountainMeadow-300 dark:border-mountainMeadow-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-mountainMeadow-600 dark:text-mountainMeadow-300">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-2 px-4 border border-mountainMeadow-300 dark:border-mountainMeadow-700 text-mountainMeadow-700 dark:text-mountainMeadow-300 hover:bg-mountainMeadow-200 dark:hover:bg-mountainMeadow-700 rounded-md flex items-center justify-center space-x-2"
          >
            <Github className="h-4 w-4" />
            <span>Github</span>
          </button>
        </form>
        <div className="text-sm text-center text-mountainMeadow-700 dark:text-mountainMeadow-300 p-2">
          Already have an account?{" "}
          <Link
            href="/"
            className="text-mountainMeadow-100 dark:text-mountainMeadow-100 hover:underline"
          >
            Sign in
          </Link>
        </div>
        <div className="mb-2 text-center">
          <button
            onClick={goBack}
            className="mb-1 py-1 px-4 bg-mountainMeadow-400 text-white font-semibold rounded-md hover:bg-mountainMeadow-500 focus:outline-none focus:ring-2 focus:ring-mountainMeadow-500"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
