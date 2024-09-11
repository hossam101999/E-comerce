import axios from 'axios';

const API_URL = 'http://localhost:5000';

// قراءة رمز المصادقة من localStorage
const getAuthToken = () => localStorage.getItem('authToken');

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// تحديث رأس المصادقة في كل طلب
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getPosts = () => axiosInstance.get('/posts');
export const getPostById = (id) => axiosInstance.get(`/posts/${id}`);
export const createPost = (postData, image) => {
  const formData = new FormData();
  formData.append('title', postData.title);
  formData.append('description', postData.description);
  formData.append('userId', postData.userId);
  if (image) formData.append('image', image);

  return axiosInstance.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const updatePost = (id, postData) => axiosInstance.put(`/posts/${id}`, postData);
export const deletePost = (id) => axiosInstance.delete(`/posts/${id}`);
export const loginUser = (email, password) => axiosInstance.post('/users/login', { email, password });
export const registerUser = (name, email, password) => axiosInstance.post('/users/register', { name, email, password });
