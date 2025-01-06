import Link from "next/link";
import { Cloud, MessageSquare, Users, Zap } from "lucide-react";
import LoginForm from "./components/loginForm";
import AnimatedSVG from "./components/AnimatedSVG";
import FeatureCard from "./components/featuredCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--mountain-meadow-50)] to-[var(--mountain-meadow-100)] dark:from-gray-900 dark:to-indigo-950 flex flex-col justify-between">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col justify-center items-center">
        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center justify-center w-full">

          {/* Header (Title & Description) */}
          <header className="text-center md:text-center flex flex-col items-center md:items-center space-y-4 w-full">

            {/* Title and Description */}
            <div className="flex flex-col items-center md:items-center mb-4">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Cloud className="h-16 w-16 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]" />
                <h1 className="text-4xl md:text-5xl font-bold ml-2 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]">
                  CLOUDY
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-yellow-50">
                Share your thoughts with the world, instantly.
              </p>
            </div>

            {/* Animated GIF */}
            <div className="flex justify-end">
              <AnimatedSVG />
            </div>
          </header>

          {/* Login Form */}
          <div className="flex justify-center md:justify-around w-full max-w-md">
            <LoginForm />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mt-8">
          <FeatureCard
            icon={
              <MessageSquare className="h-8 w-8 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]" />
            }
            title="Express Yourself"
            description="Share your thoughts, ideas, and moments with a global community."
          />
          <FeatureCard
            icon={
              <Users className="h-8 w-8 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]" />
            }
            title="Connect"
            description="Build meaningful connections with like-minded individuals."
          />
          <FeatureCard
            icon={
              <Zap className="h-8 w-8 text-[var(--mountain-meadow-600)] dark:text-[var(--mountain-meadow-400)]" />
            }
            title="Real-time"
            description="Experience instant updates and live interactions."
          />
        </div>
      </div>
    </div>
  );
}

