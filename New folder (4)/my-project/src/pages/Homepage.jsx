import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { FaHeart, FaRegComment, FaShare, FaBookmark } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";

const HomePage = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [newComment, setNewComment] = useState({});
  const [showMenu, setShowMenu] = useState({});
  const [commentVisible, setCommentVisible] = useState({});
  const profilePic =
    currentUser?.profilePicture || "raf,360x360,075,t,fafafa_ca443f4786.jpg";

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    const fetchPosts = () => {
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      setPosts(posts);
      setLoading(false);
    };

    fetchPosts();
  }, [isAuthenticated]);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      description,
      image: imagePreview,
      comments: [],
      user: currentUser?.username || "Unknown User",
    };

    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (editPostId) {
      const updatedPosts = posts.map((post) =>
        post.id === editPostId
          ? { ...post, title, description, image: imagePreview }
          : post
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    } else {
      posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
    }

    setPosts((prevPosts) => {
      const updatedPosts = editPostId
        ? prevPosts.map((post) =>
            post.id === editPostId
              ? { ...post, title, description, image: imagePreview }
              : post
          )
        : [...prevPosts, newPost];
      return updatedPosts;
    });

    resetForm();
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setDescription(post.description);
    setImagePreview(post.image || "");
    setEditPostId(post.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleDeleteComment = (postId, commentIdx) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.filter((_, idx) => idx !== commentIdx),
          }
        : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleAddComment = (postId) => {
    if (!newComment[postId] || newComment[postId].trim() === "") return;

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment[postId]] }
        : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setNewComment((prev) => ({ ...prev, [postId]: "" }));
  };

  const toggleCommentVisibility = (postId) => {
    setCommentVisible((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setImagePreview("");
    setNewComment({});
  };

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className=" w-full max-w-7xl p-2 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 fixed text-white py-2 px-4 rounded mb-6 hover:bg-blue-700"
        >
          {editPostId ? "Edit Post" : "Add Post"}
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                {editPostId ? "Edit Post" : "Add Post"}
              </h2>
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded mb-4"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto mt-2 rounded"
                  />
                )}
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  {editPostId ? "Save Changes" : "Add Post"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="bg-gray-500 text-white py-2 px-4 rounded ml-4 hover:bg-gray-600"
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
            posts.map((post) => (
              <div
                key={post.id}
                className="mb-4 p-4 bg-white shadow-lg rounded-lg max-w-sm mx-auto"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={profilePic}
                    alt="profile"
                    className="rounded-full w-10 h-10 mr-3"
                  />
                  <h2 className="text-xl font-bold text-gray-800">
                    {post.user}
                  </h2>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {post.title}
                </h2>
                <p className="mb-2 text-gray-600">{post.description}</p>
                {post.image && (
                  <div className="">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex space-x-4">
                    <button className="text-gray-400 hover:text-red-500">
                      <FaHeart size={24} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-600 flex items-center"
                      onClick={() => toggleCommentVisibility(post.id)}
                    >
                      <FaRegComment size={24} />
                      <span className="ml-1 text-gray-600">
                        {post.comments.length}
                      </span>{" "}
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaShare size={24} />
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaBookmark size={24} />
                  </button>
                </div>
                <button
                  onClick={() =>
                    setShowMenu((prev) => ({
                      ...prev,
                      [post.id]: !prev[post.id],
                    }))
                  }
                  className="text-gray-400 hover:text-gray-600 m-2 "
                >
                  <FaListUl size={24} />
                </button>

                {showMenu[post.id] && (
                  <div className="m-2">
                    <button
                      onClick={() => {
                        handleEdit(post);
                        setShowMenu((prev) => ({ ...prev, [post.id]: false }));
                      }}
                      className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-100 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(post.id);
                        setShowMenu((prev) => ({ ...prev, [post.id]: false })); // إغلاق القائمة بعد الحذف
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {commentVisible[post.id] && (
                  <div className="mt-4 bg-gray-100 p-2 rounded-lg">
                    {post.comments.length > 0 ? (
                      post.comments.map((comment, idx) => (
                        <div
                          key={idx}
                          className="text-gray-700 border-t border-gray-300 pt-2 flex justify-between items-center"
                        >
                          <span>{comment}</span>
                          <button
                            onClick={() => handleDeleteComment(post.id, idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No comments yet.</p>
                    )}

                    <div className="flex mt-2">
                      <input
                        type="text"
                        value={newComment[post.id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        placeholder="Add a comment..."
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded ml-2 hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
