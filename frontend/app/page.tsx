import Link from 'next/link';
import { Cloud, MessageSquare, Users, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--mountain-meadow-50)] to-[var(--mountain-meadow-100)] dark:from-gray-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="h-16 w-16 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]" />
            <h1 className="text-5xl font-bold ml-2 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]">CLOUDY</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Share your thoughts with the world, instantly.
          </p>
        </header>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mb-20">
          <Link href="/login">
            <div className="bg-[var(--mountain-meadow-500)] text-white px-8 py-2 rounded-lg text-lg font-medium hover:bg-[var(--mountain-meadow-600)] transition">
              Login
            </div>
          </Link>
          <Link href="/register">
            <div className="bg-transparent border border-[var(--mountain-meadow-500)] text-[var(--mountain-meadow-500)] px-8 py-2 rounded-lg text-lg font-medium hover:bg-[var(--mountain-meadow-500)] hover:text-white transition">
              Register
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]" />}
            title="Express Yourself"
            description="Share your thoughts, ideas, and moments with a global community."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]" />}
            title="Connect"
            description="Build meaningful connections with like-minded individuals."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]" />}
            title="Real-time"
            description="Experience instant updates and live interactions."
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-[var(--mountain-meadow-500)] dark:text-[var(--mountain-meadow-400)] mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}






