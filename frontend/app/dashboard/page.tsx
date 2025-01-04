'use client';

import { useState } from 'react';
import { Bell, Home, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [newTweet, setNewTweet] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí manejamos la lógica de tweet
    setNewTweet('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-xl text-mountainMeadow-500 dark:text-mountainMeadow-300">CLOUDY</span>
          </div>
          <div>
            <Link href="/profile" className="text-mountainMeadow-500 dark:text-mountainMeadow-300 hover:underline">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Section (top section on mobile) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-3/12">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-400">
                JD
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">John Doe</h3>
                <p className="text-sm text-gray-500">@johndoe</p>
              </div>
            </div>
            <nav className="space-y-2">
              <NavItem icon={<Home className="h-4 w-4" />} label="Home" active />
              <NavItem icon={<User className="h-4 w-4" />} label="Profile" />
              <NavItem icon={<Bell className="h-4 w-4" />} label="Notifications" />
              <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
              <div className="my-4 border-t border-gray-200 dark:border-gray-600"></div>
              <NavItem icon={<LogOut className="h-4 w-4" />} label="Logout" />
            </nav>
          </div>

          {/* Main Content Section (tweets and tweet form) */}
          <main className="w-full md:w-9/12">
            {/* New Tweet Form */}
            <div className="bg-white dark:bg-gray-800 p-4 mb-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <textarea
                  placeholder="What's on your mind?"
                  value={newTweet}
                  onChange={(e) => setNewTweet(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    Tweet
                  </button>
                </div>
              </form>
            </div>

            {/* Tweet Feed */}
            <div className="space-y-4">
              <TweetCard
                author="Jane Smith"
                handle="@janesmith"
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                content="Just launched my new project! 🚀 #coding #webdev"
                timestamp="2h ago"
              />
              <TweetCard
                author="Alex Johnson"
                handle="@alexj"
                avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                content="Beautiful day for coding outside ☀️ #programming"
                timestamp="4h ago"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

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

function TweetCard({ author, handle, avatar, content, timestamp }: { author: string; handle: string; avatar: string; content: string; timestamp: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-400">
          <img src={avatar} alt={author} className="w-full h-full rounded-full object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{author}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{handle}</p>
        </div>
      </div>
      <p className="text-gray-800 dark:text-gray-200 mb-4">{content}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</p>
    </div>
  );
}



