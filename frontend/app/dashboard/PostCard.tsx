import React from 'react';

interface PostCardProps {
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

const PostCard: React.FC<PostCardProps> = ({ author, avatar, content, timestamp }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <img src={avatar} alt={author} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{author}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</p>
        </div>
      </div>
      <p className="text-gray-800 dark:text-gray-200">{content}</p>
    </div>
  );
};

export default PostCard;

  