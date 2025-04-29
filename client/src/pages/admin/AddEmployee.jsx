import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    department: '',
    position: '',
    joinDate: '',
    phone: '',
    address: '',
    role: 'employee',
    status: 'active'
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('/api/departments');
        setDepartments(res.data.data);
      } catch (err) {
        setError('Failed to fetch departments');
        console.error(err);
      }
    };

    fetchDepartments();
  }, []);

  const { 
    employeeId, 
    firstName, 
    lastName, 
    email, 
    password, 
    department, 
    position, 
    joinDate, 
    phone, 
    address, 
    role,
    status
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/employees', formData);
      setSuccess('Employee added successfully');
      setFormData({
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: '',
        position: '',
        joinDate: '',
        phone: '',
        address: '',
        role: 'employee',
        status: 'active'
      });
      setTimeout(() => {
        navigate('/admin/employees');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Employee</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p>{success}</p>
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employee ID */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={employeeId}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter employee ID"
                required
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter password"
                required
                minLength="6"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={department}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Position */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={position}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter position"
                required
              />
            </div>

            {/* Join Date */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="joinDate">
                Join Date
              </label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={joinDate}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on leave">On Leave</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter address"
              required
              rows="3"
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/employees')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee; 