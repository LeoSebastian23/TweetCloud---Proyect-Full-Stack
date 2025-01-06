function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
      <button
        className={`w-full flex items-center py-2 px-4 text-left rounded-lg ${active ? 'bg-emerald-100 dark:bg-emerald-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </button>
    );
  }
  
  export default NavItem;
  