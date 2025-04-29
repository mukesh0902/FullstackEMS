import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated, user, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    }

    if (error) {
      setAlert(error);
      clearError();
    }
  }, [isAuthenticated, user, error, navigate, clearError]);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (!email || !password) {
      setAlert('Please enter all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setAlert(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-136px)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">
          Employee Management System
        </h1>
        <h2 className="text-xl font-semibold text-center mb-6">
          Login to Your Account
        </h2>
        
        {alert && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {alert}
          </div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="flex items-center border rounded w-full py-2 px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded w-full py-2 px-3">
              <FaLock className="text-gray-400 mr-2" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <button
              className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 