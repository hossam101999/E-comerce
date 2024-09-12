import React, { useState } from 'react';

const AddPost = ({ isOpen, onClose, onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // حالة الصورة المحملة

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // تعيين الصورة التي تم تحميلها
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image); // إضافة الصورة إلى البيانات المرسلة
    }

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        body: formData, // إرسال البيانات كـ FormData
      });
      if (response.ok) {
        await onPostAdded(); // استدعاء دالة على نجاح الإضافة
        setTitle('');
        setDescription('');
        setImage(null); // إعادة تعيين الصورة
        onClose(); // إغلاق النافذة بعد إضافة المنشور
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  if (!isOpen) return null;

  return (
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
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Post
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded ml-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
