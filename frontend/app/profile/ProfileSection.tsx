import { FC } from "react";
import { Bell, Home, LogOut, Settings, User } from "lucide-react";
import NavItem from "../dashboard/NavItem";

interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    imageProfile?: string;
  };
}

const ProfileSection: FC<ProfileSectionProps> = ({ user }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-3/12">
      <div className="flex items-center space-x-4 mb-6">
        {/* Imagen de perfil */}
        <div className="w-16 h-16 rounded-full bg-gray-400">
          <img
            src={user.imageProfile || "/default-profile.png"} // Usa la imagen proporcionada o la imagen por defecto
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <nav className="space-y-2">
        <NavItem icon={<Home className="h-4 w-4" />} label="Home" active />
        <NavItem icon={<User className="h-4 w-4" />} label="Profile" />
        <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
        <div className="my-4 border-t border-gray-200 dark:border-gray-600"></div>
        <NavItem icon={<LogOut className="h-4 w-4" />} label="Logout" />
      </nav>
    </div>
  );
};

export default ProfileSection;

