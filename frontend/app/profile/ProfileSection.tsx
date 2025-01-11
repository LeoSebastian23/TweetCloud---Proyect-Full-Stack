interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    imageProfile?: string; // Opcional si el perfil puede no tener imagen
  };
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={user.imageProfile || "/default-profile.png"}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{user.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
}


