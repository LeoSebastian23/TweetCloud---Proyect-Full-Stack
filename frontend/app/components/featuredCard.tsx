interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
      <div
        className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg 
                   transition-all duration-300 ease-in-out transform 
                   hover:-translate-y-2 hover:shadow-2xl 
                   hover:bg-[var(--mountain-meadow-100)] dark:hover:bg-gray-700"
      >
        <div className="text-[var(--mountain-meadow-500)] dark:text-[var(--mountain-meadow-400)] mb-2 md:mb-4">
          {icon}
        </div>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    );
  };
  
  export default FeatureCard;
  

  