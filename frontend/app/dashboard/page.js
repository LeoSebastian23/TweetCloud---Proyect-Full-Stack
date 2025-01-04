'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('http://localhost:5000/post');
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Publicaciones</h2>
      {posts.length === 0 ? (
        <p>No hay publicaciones aún.</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <div key={index}>
                <li key={post.id} className="p-4 rounded shadow mb-4 bg-slate-400">
                  <h3 className="text-xl font-bold text-zinc-50">{post.title}</h3>
                  <p className='text-zinc-50'>{post.body}</p>
                </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
