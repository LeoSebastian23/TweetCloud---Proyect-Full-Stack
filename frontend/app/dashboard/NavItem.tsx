import Link from "next/link";

function NavItem({
  icon,
  label,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center py-2 px-4 text-left rounded-lg transition ${
        active
          ? "bg-emerald-700 dark:bg-emerald-700"
          : "hover:bg-gray-700 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );
}

export default NavItem;



  