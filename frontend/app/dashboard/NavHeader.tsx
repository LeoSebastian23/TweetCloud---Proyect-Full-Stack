"use client";

import { FC } from "react";
import { Bell, Home, LogOut, Settings, User } from "lucide-react";
import NavItem from "../dashboard/NavItem";
import { usePathname } from "next/navigation";

interface NavHeaderProps {
  user: {
    name: string;
    email: string;
    imageProfile?: string;
  };
}

const NavHeader: FC<NavHeaderProps> = ({ user }: NavHeaderProps) => {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Información del usuario */}
        <div className="flex items-center space-x-4">
          {/* Imagen de perfil */}
          <div className="w-10 h-10 rounded-full bg-gray-400">
            <img
              src={user.imageProfile || "/default-profile.png"} // Usa la imagen proporcionada o una por defecto
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Links de navegación */}
        <div className="flex space-x-6">
          <NavItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            href="/"
            active={pathname === "/"}
          />
          <NavItem
            icon={<User className="h-5 w-5" />}
            label="Profile"
            href="/profile"
            active={pathname === "/profile"}
          />
          <NavItem
            icon={<Bell className="h-5 w-5" />}
            label="Notifications"
            href="/notifications"
            active={pathname === "/profile"}
          />
          <NavItem
            icon={<LogOut className="h-5 w-5" />}
            label="Logout"
            href="/"
            active={pathname === "/logout"}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;


