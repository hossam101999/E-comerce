import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext'; // تحديث المسار بناءً على موقع authContext.jsx

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة لفتح وإغلاق نافذة الإضافة

  // حالة النموذج
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // تعريف دالة fetchPosts هنا حتى تكون متاحة في handlePostSubmit
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError('Error fetching posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    fetchPosts();
  }, [isAuthenticated]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        await fetchPosts(); // استدعاء دالة fetchPosts هنا بعد إضافة المنشور
        setTitle('');
        setDescription('');
        setIsModalOpen(false); // إغلاق النافذة بعد إضافة المنشور
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Home</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
        >
          Add Post
        </button>

        {/* نافذة الإضافة */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add Post</h2>
              <form onSubmit={handlePostSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  className="block w-full px-3 py-2 border border-gray-300 rounded mb-4"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Description"
                  className="block w-full px-3 py-2 border border-gray-300 rounded mb-4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add Post
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded ml-4"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            posts.map(post => (
              <div key={post.id} className="mb-4 p-4 bg-white shadow rounded">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p>{post.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
