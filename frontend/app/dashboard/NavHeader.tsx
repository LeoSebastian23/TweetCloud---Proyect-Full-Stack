import { FC } from "react";
import { Bell, Home, LogOut, Settings, User } from "lucide-react";
import NavItem from "../dashboard/NavItem";

interface NavHeaderProps {
  user: {
    name: string;
    email: string;
    imageProfile?: string;
  };
}

const NavHeader: FC<NavHeaderProps> = ({ user }: NavHeaderProps) => {
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
          <NavItem icon={<Home className="h-5 w-5" />} label="Home" active />
          <NavItem icon={<User className="h-5 w-5" />} label="Profile" />
          <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" />
          <NavItem icon={<Bell className="h-5 w-5" />} label="Notifications" />
          <NavItem icon={<LogOut className="h-5 w-5" />} label="Logout" />
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;

