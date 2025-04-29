import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCog } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    pendingLeaves: 0,
    pendingSalaries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // In a real application, you would fetch actual stats from the API
        // For demo purposes, we'll set dummy data
        // const res = await axios.get('/api/admin/stats');
        // setStats(res.data);
        
        // Dummy data
        setStats({
          employees: 24,
          departments: 5,
          pendingLeaves: 7,
          pendingSalaries: 12
        });
        
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Employee Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FaUsers className="text-primary text-2xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.employees}</p>
          </div>
        </div>
        
        {/* Department Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FaBuilding className="text-green-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Departments</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.departments}</p>
          </div>
        </div>
        
        {/* Leave Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <FaCalendarAlt className="text-yellow-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pending Leaves</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.pendingLeaves}</p>
          </div>
        </div>
        
        {/* Salary Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <FaMoneyBillWave className="text-purple-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pending Salaries</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.pendingSalaries}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <Link
              to="/admin/employees/add"
              className="bg-primary text-white py-2 px-4 rounded flex items-center justify-center hover:bg-blue-800"
            >
              <FaUsers className="mr-2" /> Add New Employee
            </Link>
            <Link
              to="/admin/departments/add"
              className="bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-green-700"
            >
              <FaBuilding className="mr-2" /> Add New Department
            </Link>
            <Link
              to="/admin/salaries/add"
              className="bg-purple-600 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-purple-700"
            >
              <FaMoneyBillWave className="mr-2" /> Process Salary
            </Link>
          </div>
        </div>
        
        {/* Management Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Management</h2>
          <div className="space-y-3">
            <Link
              to="/admin/employees"
              className="block py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 flex items-center"
            >
              <FaUsers className="mr-2 text-primary" /> Employee Management
            </Link>
            <Link
              to="/admin/departments"
              className="block py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 flex items-center"
            >
              <FaBuilding className="mr-2 text-green-600" /> Department Management
            </Link>
            <Link
              to="/admin/leaves"
              className="block py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 flex items-center"
            >
              <FaCalendarAlt className="mr-2 text-yellow-600" /> Leave Management
            </Link>
            <Link
              to="/admin/salaries"
              className="block py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 flex items-center"
            >
              <FaMoneyBillWave className="mr-2 text-purple-600" /> Salary Management
            </Link>
            <Link
              to="/admin/settings"
              className="block py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 flex items-center"
            >
              <FaCog className="mr-2 text-gray-600" /> Settings
            </Link>
          </div>
        </div>
        
        {/* Admin Profile */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Admin Profile</h2>
          <div className="text-center mb-4">
            <div className="inline-block rounded-full bg-primary text-white p-4 mb-2">
              <FaUsers className="text-3xl" />
            </div>
            <h3 className="text-lg font-medium">{user?.name}</h3>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-gray-600">Last Login: {new Date().toLocaleDateString()}</p>
            <p className="text-gray-600">Role: Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 