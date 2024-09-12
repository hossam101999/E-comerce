import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        // تخزين الـ token وتحديث حالة تسجيل الدخول
        localStorage.setItem('accessToken', result.token);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home'); 
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input 
              type="email" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Password</span>
            <input 
              type="password" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </label>
          <button 
            type="submit" 
            className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
