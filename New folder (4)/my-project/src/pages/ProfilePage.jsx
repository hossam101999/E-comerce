import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext"; // تأكد من أن المسار صحيح

const ProfilePage = () => {
  const { currentUser, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mr-4">
              <img
                src={formData.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Avatar URL"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mr-4">
              <img
                src={currentUser?.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {currentUser?.name || "Unknown User"}
              </h3>
              <p className="text-gray-600">
                {currentUser?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Posts</h3>
            <ul>
              {currentUser?.posts?.length ? (
                currentUser.posts.map((post) => (
                  <li key={post.id} className="mb-2">
                    <a
                      href={`/posts/${post.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {post.title}
                    </a>
                  </li>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline"
            >
              Edit Profile
            </button>
            <br />
            <a
              href="/change-password"
              className="text-blue-500 hover:underline"
            >
              Change Password
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
