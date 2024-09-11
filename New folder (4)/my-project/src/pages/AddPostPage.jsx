import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddPostPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/posts', { title, description }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            history.push('/'); 
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
            <form onSubmit={handleAddPost}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AddPostPage;
