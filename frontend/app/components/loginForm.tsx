"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", { email, password });
      if (response.status === 200) {
        // Guarda el token en localStorage
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard"); // Redirige al dashboard
      } else {
        console.error("Login failed: ", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  
    const goBack = () => {
      router.back(); // Llama al método back() para ir a la página anterior
    };
  
    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="text-center p-4">
            <div className="flex items-center justify-center">
              <h2 className="text-4xl ml-2 text-mountainMeadow-600 dark:text-mountainMeadow-500">
                Welcome
              </h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 px-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md text-mountainMeadow-700 dark:text-mountainMeadow-300 dark:bg-gray-900 dark:border-gray-700 focus:ring-mountainMeadow-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-mountainMeadow-500 text-white font-semibold rounded-md hover:bg-mountainMeadow-600 focus:outline-none focus:ring-2 focus:ring-mountainMeadow-500"
            >
              Sign In
            </button>
          </form>
          <div className="text-sm text-center text-mountainMeadow-700 dark:text-mountainMeadow-300 p-2">
            Forgot your password?{" "}
            <Link
              href="/forgot-password"
              className="text-mountainMeadow-600 dark:text-mountainMeadow-400 hover:underline"
            >
              Reset Password
            </Link>
          </div>
          <div className="mt-4 text-center">
            <div className="text-sm p-4 text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-mountainMeadow-600 dark:text-mountainMeadow-400 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
    );
  }